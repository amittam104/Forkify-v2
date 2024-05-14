import View from './View.js';
import icons from 'url:../../img/icons.svg';

class LoginView extends View {
  _parentElement = document.querySelector('.login-form');
  _mainAppArea = document.querySelector('.recipe');
  _errorMessage = `Something went wrong. Log in failed. Please try again!`;
  _message = 'You are successfuly Loged in! Start searching for recipes.';

  _window = document.querySelector('.login-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.navbar-login');
  _btnMainOpen = document.querySelector('.welcome-login');
  _btnClose = document.querySelector('.btn--close-modal-login');
  // _btnLogOut = document.querySelector('.navbar-logout');

  // Enable app variables
  _searchField = document.querySelector('.search__field');
  _SearchBtn = document.querySelector('.search__btn');
  _addRecipe = document.querySelector('.nav__btn--add-recipe');
  _addBookmarks = document.querySelector('.nav__btn--bookmarks');
  _addRecipeBox = document.querySelector('.add-recipe-box');
  _addBookmarksBox = document.querySelector('.bookmarks-box');

  constructor() {
    super();
    this._addHandlerViewLoginWindow();
    this._addHandlerHideLoginWindow();
  }

  toggleLoginWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerViewLoginWindow() {
    this._btnOpen.addEventListener('click', this.toggleLoginWindow.bind(this));
    this._btnMainOpen.addEventListener(
      'click',
      this.toggleLoginWindow.bind(this)
    );
  }

  _addHandlerHideLoginWindow() {
    this._btnClose.addEventListener('click', this.toggleLoginWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleLoginWindow.bind(this));
  }

  addHandlerLogin(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.querySelector('#login-email');
      const password = document.querySelector('#login-password');

      console.log(email.value, password.value);
      handler(email.value, password.value);

      // // Hide Login button and show logout button
      document.querySelector('.navbar-login').classList.add('hidden');
      document.querySelector('.navbar-logout').classList.remove('hidden');

      // Clear the recipe area
      this._parentElement = document.querySelector('.recipe');
    });
  }

  // addHandlerRender(handler) {
  //   ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  // }

  renderWelcomeMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._mainAppArea.innerHTML = '';
    this._mainAppArea.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerEnableApp() {
    this._searchField.disabled = false;
    this._SearchBtn.disabled = false;
    this._addRecipe.disabled = false;
    this._addBookmarks.disabled = false;

    this._addRecipeBox.classList.remove('hidden');
    this._addBookmarksBox.classList.remove('hidden');

    document.querySelector('.navbar-login').classList.add('hidden');
    document.querySelector('.navbar-logout').classList.remove('hidden');
  }
}

export default new LoginView();
