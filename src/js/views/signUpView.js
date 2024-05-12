import View from './View.js';

class SignUpView extends View {
  _parentElement = document.querySelector('.signup-form');
  // _sigUpBtn = document.querySelector('.btn--signup');

  _clearInput() {
    this._parentElement.querySelector('.signup-form--input').value = '';
  }

  addHandlerSignUp(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const SignUpName = document.querySelector('.name');
      const email = document.querySelector('.email');
      const password = document.querySelector('.password');

      // console.log(SignUpName.value, email.value, password.value);
      handler(SignUpName.value, email.value, password.value);
    });
  }
}

export default new SignUpView();
