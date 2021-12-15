import { assert } from '@ember/debug';
import Component from '@glimmer/component';

const DISABLED = null;
const FIRST_PAGE = 1;

export default class PaginationDataComponent extends Component {
  /**
   * Argument getters
   */

  get currentPage() {
    assert(
      `@currentPage is required and must be a number. You provided \`${this.args.currentPage}\`.`,
      isNumber(this.args.currentPage)
    );

    assert(
      `@currentPage must be a value between \`${FIRST_PAGE}\` and \`${this.lastPage}\`. You provided \`${this.args.currentPage}\`.`,
      this.args.currentPage >= FIRST_PAGE &&
        this.args.currentPage <= this.lastPage
    );

    return this.args.currentPage;
  }

  get itemsPerPage() {
    assert(
      `@itemsPerPage is required and must be a number. You provided \`${this.args.itemsPerPage}\`.`,
      isNumber(this.args.itemsPerPage)
    );

    return this.args.itemsPerPage;
  }

  get pageMargins() {
    if (isNumber(this.args.pageMargins) === false) {
      return 1;
    }

    assert(
      `@pageMargins must be a number higher than \`0\`. You provided \`${this.args.pageMargins}\`.`,
      this.args.pageMargins > 0
    );

    return this.args.pageMargins;
  }

  get pageRange() {
    if (isNumber(this.args.pageRange) === false) {
      return null;
    }

    assert(
      `@pageRange must be an uneven number to make sure that the active page is always center aligned. You provided \`${this.args.pageRange}\`.`,
      this.args.pageRange % 2 !== 0
    );

    return this.args.pageRange;
  }

  get totalItems() {
    assert(
      `@totalItems is required and must be a number. You provided \`${this.args.totalItems}\`.`,
      isNumber(this.args.totalItems)
    );

    return this.args.totalItems;
  }

  /**
   * State getters
   */

  get _currentPage() {
    return clamp(this.currentPage, FIRST_PAGE, this.lastPage);
  }

  get activeItems() {
    if (this.itemsPerPage * this._currentPage > this.totalItems) {
      return this.totalItems % this.itemsPerPage;
    }

    return this.itemsPerPage;
  }

  get allPages() {
    return range(FIRST_PAGE, this.lastPage);
  }

  get endMarginPages() {
    if (this.pageRange === null) {
      return null;
    }

    if (this.totalPages < this.pageMarginsThreshold) {
      return [];
    }

    return range(this.pageRangeUpperLimit + 1, this.totalPages);
  }

  get isFirstPage() {
    return this._currentPage === FIRST_PAGE;
  }

  get isLastPage() {
    return this._currentPage === this.lastPage;
  }

  get lastPage() {
    return this.totalPages;
  }

  get nextPage() {
    return this.isLastPage ? DISABLED : this._currentPage + 1;
  }

  get pageMarginsThreshold() {
    return this.pageRange + this.pageMargins * 2;
  }

  get pageRangeLowerLimit() {
    return this.pageMargins + 1;
  }

  get pageRangePages() {
    if (this.pageRange === null) {
      return null;
    }

    if (this.totalPages < this.pageMarginsThreshold) {
      return this.allPages;
    }

    const pageRangeOffset = Math.floor(this.pageRange / 2);

    let pageRangeStart = this._currentPage - pageRangeOffset;
    let pageRangeEnd = this._currentPage + pageRangeOffset;

    if (pageRangeStart < this.pageRangeLowerLimit) {
      pageRangeStart = this.pageRangeLowerLimit;
      pageRangeEnd = pageRangeStart + this.pageRange - 1;
    }

    if (pageRangeEnd > this.pageRangeUpperLimit) {
      pageRangeStart = this.pageRangeUpperLimit - this.pageRange + 1;
      pageRangeEnd = this.pageRangeUpperLimit;
    }

    return range(pageRangeStart, pageRangeEnd);
  }

  get pageRangeUpperLimit() {
    return this.totalPages - this.pageMargins;
  }

  get previousPage() {
    return this.isFirstPage ? DISABLED : this._currentPage - 1;
  }

  get shouldShowLowerBreak() {
    if (this.pageRange === null) {
      return false;
    }

    if (this.totalPages < this.pageMarginsThreshold) {
      return false;
    }

    return (
      this.pageRangePages.length &&
      this.pageRangePages[0] !== this.pageRangeLowerLimit
    );
  }

  get shouldShowUpperBreak() {
    if (this.pageRange === null) {
      return false;
    }

    if (this.totalPages < this.pageMarginsThreshold) {
      return false;
    }

    return (
      this.pageRangePages.length &&
      this.pageRangePages[this.pageRangePages.length - 1] !==
        this.pageRangeUpperLimit
    );
  }

  get startMarginPages() {
    if (this.pageRange === null) {
      return null;
    }

    if (this.totalPages < this.pageMarginsThreshold) {
      return [];
    }

    return range(FIRST_PAGE, this.pageMargins);
  }

  get totalPages() {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    return isNaN(totalPages) || totalPages === 0 ? 1 : totalPages;
  }
}

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
}

function isNumber(value) {
  return typeof value === 'number' && isNaN(value) === false;
}

function range(start, end) {
  return new Array(end - start + 1).fill(undefined).map((_, i) => i + start);
}
