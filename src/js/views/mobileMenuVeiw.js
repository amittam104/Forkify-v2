import View from './View.js';
import icons from 'url:../../img/icons.svg';

class MobileMenuView extends View {
  _btnMobileOpen = document.querySelector('.mobile-menu-open');
  _btnMobileClose = document.querySelector('.mobile-menu-close');

  addHandlerMobileMenu() {
    this._btnMobileOpen.addEventListener('click', function () {
      const navList = document.querySelector('.nav__list');
      navList.style.display = 'flex';
    });

    this._btnMobileClose.addEventListener('click', function () {
      const navList = document.querySelector('.nav__list');
      navList.style.display = 'none';
    });
  }
}

export default new MobileMenuView();
