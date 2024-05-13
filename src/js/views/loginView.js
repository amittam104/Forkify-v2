import View from './View.js';

class LoginView extends View {
  _parentElement = document.querySelector('.login-window-box');
  _FormElement = document.querySelector('.login-form');
  _errorMessage = `Something went wrong. Log in failed. Please try again!`;
  _message = 'You are successfuly Loged in! Start searching for recipes.';

  _window = document.querySelector('.login-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.navbar-login');
  _btnMainOpen = document.querySelector('.welcome-login');
  _btnClose = document.querySelector('.btn--close-modal-login');
  _btnLogOut = document.querySelector('.navbar-logout');

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
    this._FormElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.querySelector('#login-email');
      const password = document.querySelector('#login-password');

      // console.log(email.value, password.value);
      handler(email.value, password.value);

      // Hide Login button and show logout button
    });
  }

  // renderLogOut() {
  //   _btnOpen.classList.add('hidden');
  //   _btnLogOut.classList.remove('hidden');
  // }
}

export default new LoginView();
