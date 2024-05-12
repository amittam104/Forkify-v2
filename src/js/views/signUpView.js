import View from './View.js';

class SignUpView extends View {
  _parentElement = document.querySelector('.recipe');
  _FormElement = document.querySelector('.signup-form');
  _errorMessage = `Something went wrong. Account cannot be created. Please try again!`;
  _message = `Account created Sucessfully! Log in to get Started.`;

  _clearInput() {
    this._FormElement.querySelector('.signup-form--input').value = '';
  }

  addHandlerSignUp(handler) {
    this._FormElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const SignUpName = document.querySelector('.name');
      const email = document.querySelector('.email');
      const password = document.querySelector('.password');

      // console.log(SignUpName.value, email.value, password.value);
      handler(email.value, password.value, SignUpName.value);
    });
  }
}

export default new SignUpView();
