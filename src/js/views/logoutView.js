import View from './View.js';
import icons from 'url:../../img/icons.svg';

class LogoutView extends View {
  _parentElement = document.querySelector('.recipe');
  _searchResults = document.querySelector('.results');
  _errorMessage = `Something went wrong. Log out failed. Please try again!`;
  _message = 'Log in to get started. Start searching for recipes.';

  _btnOpen = document.querySelector('.navbar-login');
  _btnClose = document.querySelector('.btn--close-modal-login');
  _btnLogOut = document.querySelector('.navbar-logout');

  // Disable app variables
  _searchField = document.querySelector('.search__field');
  _SearchBtn = document.querySelector('.search__btn');
  _addRecipe = document.querySelector('.nav__btn--add-recipe');
  _addBookmarks = document.querySelector('.nav__btn--bookmarks');
  _addRecipeBox = document.querySelector('.add-recipe-box');
  _addBookmarksBox = document.querySelector('.bookmarks-box');

  addHandlerLogout(handler) {
    this._btnLogOut.addEventListener('click', function (e) {
      e.preventDefault();

      // // Hide Login button and show logout button
      document.querySelector('.navbar-login').classList.remove('hidden');
      document.querySelector('.navbar-logout').classList.add('hidden');

      // Remove login state from localStorage
      localStorage.removeItem('loggedIn');

      handler();
    });
  }

  addHandlerDisableApp(message = this._message) {
    this._searchField.disabled = true;
    this._SearchBtn.disabled = true;
    this._addRecipe.disabled = true;
    this._addBookmarks.disabled = true;

    // // clear the recipe area
    this._parentElement.innerHTML = '';

    // const markup = `
    //   <div class="message">
    //     <div>
    //       <svg>
    //         <use href="${icons}#icon-smile"></use>
    //       </svg>
    //     </div>
    //     <p>${message}</p>
    //   </div>
    // `;

    // this._parentElement.insertAdjacentHTML('afterbegin', markup);

    this._searchResults.innerHTML = '';
    history.replaceState(null, null, ' ');

    this._addRecipeBox.classList.add('hidden');
    this._addBookmarksBox.classList.add('hidden');

    document.querySelector('.navbar-login').classList.remove('hidden');
    document.querySelector('.navbar-logout').classList.add('hidden');

    location.reload();
  }
}

export default new LogoutView();
