import View from './View.js';

class LogoutView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = `Something went wrong. Log out failed. Please try again!`;
  _message = 'You are successfuly Loged out! Log in to get started.';

  _btnOpen = document.querySelector('.navbar-login');
  _btnClose = document.querySelector('.btn--close-modal-login');
  _btnLogOut = document.querySelector('.navbar-logout');

  addHandlerLogout(handler) {
    this._btnLogOut.addEventListener('click', function (e) {
      e.preventDefault();

      // // Hide Login button and show logout button
      document.querySelector('.navbar-login').classList.remove('hidden');
      document.querySelector('.navbar-logout').classList.add('hidden');

      handler();
    });
  }
}

export default new LogoutView();
