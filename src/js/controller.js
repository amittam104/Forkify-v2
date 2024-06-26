import * as model from './model.js';
import { CLOSE_MODAL_SEC } from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from '../js/views/recipeView.js';
import searchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import BookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import signUpView from './views/signUpView.js';
import loginView from './views/loginView.js';
import logoutView from './views/logoutView.js';
import mobileMenuVeiw from './views/mobileMenuVeiw.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const showRecepie = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;

    ResultsView.update(model.getSearchResultsPage());
    BookmarksView.update(model.state.bookmarks);

    // 1. Render Spinner
    recipeView.renderSpinner();

    // 2. Load recipe
    await model.loadRecipe(id);

    // Render recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
    // console.error(error);
  }
};

const controlShowResults = async function () {
  try {
    // 1. Get Query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load Results
    await model.loadSearchResults(query);

    // 3. Render results
    // console.log(model.state.search);
    ResultsView.render(model.getSearchResultsPage());

    // 4. Render Pagination
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(`${error} 💥💥💥💥`);
  }
};

const controllerPagination = function (pageTo) {
  // 3. Render results
  // console.log(model.state.search);
  ResultsView.render(model.getSearchResultsPage(pageTo));

  // 4. Render Pagination
  paginationView.render(model.state.search);
};

const controlServings = function (changeServings) {
  // Update servings and ingredients quantity in state
  model.updateServings(changeServings);

  // Update the Recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1. Add or delete bookmark
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2. Update recipe view
  recipeView.update(model.state.recipe);

  // 3. Render bookmarks view
  BookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  BookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Add loading spinner
    addRecipeView.renderSpinner();

    // Upload recipe to the API
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success Message
    addRecipeView.renderMessage();

    // Render Bookmarks view
    BookmarksView.render(model.state.bookmarks);

    //Change ID in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Hide modal
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, CLOSE_MODAL_SEC * 1000);
  } catch (error) {
    console.error('💥', error);
    addRecipeView.renderError(error.message);
  }
};

const controlSignUp = async function (emailId, password, name) {
  try {
    // Create account - send request to appwrite
    const response = await model.createAccount(emailId, password, name);

    // Render Success Message
    signUpView.renderMessage();
  } catch (error) {
    console.error(error);
    signUpView.renderError();
  }
};

const controlLogin = async function (emailid, password) {
  try {
    // Log in user - send request to appwrite
    await model.loginAccount(emailid, password);

    // Render success message
    loginView.renderMessage();

    // Render welcome message
    loginView.renderWelcomeMessage();

    // Store login state in localStorage
    localStorage.setItem('loggedIn', true);

    // Enable app
    // if (model.state.logedin)
    loginView.addHandlerEnableApp();
  } catch (error) {
    console.error(error);
    loginView.renderError();
  }
};

const controlLogOut = async function () {
  try {
    await model.logoutAccount();

    // Remove login state from localStorage
    localStorage.removeItem('loggedIn');

    // Sucess Message
    // logoutView.renderMessage();
    logoutView.addHandlerDisableApp();
    // Disable app
  } catch (error) {
    console.log(error);
    logoutView.renderError();
  }
};

const controlMobileMenu = function () {
  mobileMenuVeiw.addHandlerMobileMenu();
};

// const controlCurrentAccount = async function () {
//   try {
//     const response = await model.getCurrentAccount();

//     loginView.addHandlerKeepLogin();
//   } catch (error) {
//     logoutView.addHandlerKeepLogOut();
//     console.log(error);
//   }
// };

const init = function () {
  BookmarksView.addHandlerBookmarks(controlBookmarks);
  recipeView.addHandlerRender(showRecepie);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlShowResults);
  paginationView.addHandlerPagination(controllerPagination);
  addRecipeView.addHandlerRecipeUpload(controlAddRecipe);
  signUpView.addHandlerSignUp(controlSignUp);
  loginView.addHandlerLogin(controlLogin);
  logoutView.addHandlerLogout(controlLogOut);
  controlMobileMenu();
  // loginView.addHandlerRender(controlCurrentAccount);

  // Check login state from localStorage
  const isLoggedIn = localStorage.getItem('loggedIn');

  // Enable app if user is logged in
  if (isLoggedIn) {
    loginView.addHandlerEnableApp();
  }

  if (!isLoggedIn) {
    // logoutView.addHandlerDisableApp();
    signUpView.addHandlerSignUp(controlSignUp);
  }
};

init();
