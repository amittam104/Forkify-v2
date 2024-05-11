import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerPagination(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return;

      const btnGoto = +btn.dataset.goto;
      handler(btnGoto);
    });
  }

  _generateMarkup() {
    const data = this._data;
    const numPages = Math.ceil(data.results.length / data.resultPage);
    let currPage = this._data.page;
    // console.log(numPages, currPage);

    // 1. Current Page 1 and there are other pages
    if (currPage === 1 && numPages > 1) return this._forwardBtnMarkup(numPages);

    // 2. On other pages
    if (currPage > 1 && currPage < numPages)
      return this._bothBtnMarkup(numPages);

    // 3. On last page and earlier pages are there
    if (currPage === numPages && numPages > 1)
      return this._backwardBtnMarkup(numPages);

    // 4. Only 1 Page
    return "";
  }

  _backwardBtnMarkup(numPages) {
    return `
        <button data-goto="${
          this._data.page - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${this._data.page - 1}</span>
        </button> 
        <button disabled class="page-numbers">
          <span>${numPages} pages</span>
        </button>
        <button disabled class="btn--inline--hidden opac">
          <span>Page ${this._data.page + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
  }

  _forwardBtnMarkup(numPages) {
    return `
      <button disabled class="btn--inline--hidden opac">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button> 
      <button disabled class="page-numbers">
        <span>${numPages} pages</span>
      </button>
      <button data-goto="${
        this._data.page + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  _bothBtnMarkup(numPages) {
    return `
      <button data-goto="${
        this._data.page - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>
      <button class="page-numbers">
        <span>${numPages} pages</span>
      </button>
      <button data-goto="${
        this._data.page + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

export default new PaginationView();
