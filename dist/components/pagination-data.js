import { assert } from '@ember/debug';
import { hash } from '@ember/helper';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

const DISABLED = null;
const FIRST_PAGE = 1;
class PaginationData extends Component {
  /**
  * Argument getters
  */
  get currentPage() {
    assert(`@currentPage is required and must be a number. You provided \`${this.args.currentPage}\`.`, typeof this.args.currentPage === 'number');
    assert(`@currentPage must be a value between \`${FIRST_PAGE}\` and \`${this.lastPage}\`. You provided \`${this.args.currentPage}\`.`, this.args.currentPage >= FIRST_PAGE && this.args.currentPage <= this.lastPage);
    return this.args.currentPage;
  }
  get itemsPerPage() {
    assert(`@itemsPerPage is required and must be a number. You provided \`${this.args.itemsPerPage}\`.`, typeof this.args.itemsPerPage === 'number');
    return this.args.itemsPerPage;
  }
  get pageMargins() {
    if (typeof this.args.pageMargins !== 'number') {
      return 1;
    }
    assert(`@pageMargins must be a number higher than \`0\`. You provided \`${this.args.pageMargins}\`.`, this.args.pageMargins > 0);
    return this.args.pageMargins;
  }
  get pageRange() {
    if (typeof this.args.pageRange !== 'number') {
      return null;
    }
    assert(`@pageRange must be an uneven number to make sure that the active page is always center aligned. You provided \`${this.args.pageRange}\`.`, this.args.pageRange % 2 !== 0);
    return this.args.pageRange;
  }
  get totalItems() {
    assert(`@totalItems is required and must be a number. You provided \`${this.args.totalItems}\`.`, typeof this.args.totalItems === 'number');
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
  get firstActiveItem() {
    if (this.totalItems > 0) {
      return this._currentPage * this.itemsPerPage - this.itemsPerPage + 1;
    }
    return 0;
  }
  get isFirstPage() {
    return this._currentPage === FIRST_PAGE;
  }
  get isLastPage() {
    return this._currentPage === this.lastPage;
  }
  get lastActiveItem() {
    if (this.totalItems > 0) {
      return this.firstActiveItem + this.activeItems - 1;
    }
    return 0;
  }
  get lastPage() {
    return this.totalPages;
  }
  get nextPage() {
    return this.isLastPage ? DISABLED : this._currentPage + 1;
  }
  get pageMarginsThreshold() {
    return (this.pageRange || 0) + this.pageMargins * 2;
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
    const pageRangeOffset1 = Math.floor(this.pageRange / 2);
    let pageRangeStart1 = this._currentPage - pageRangeOffset1;
    let pageRangeEnd1 = this._currentPage + pageRangeOffset1;
    if (pageRangeStart1 < this.pageRangeLowerLimit) {
      pageRangeStart1 = this.pageRangeLowerLimit;
      pageRangeEnd1 = pageRangeStart1 + this.pageRange - 1;
    }
    if (pageRangeEnd1 > this.pageRangeUpperLimit) {
      pageRangeStart1 = this.pageRangeUpperLimit - this.pageRange + 1;
      pageRangeEnd1 = this.pageRangeUpperLimit;
    }
    return range(pageRangeStart1, pageRangeEnd1);
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
    return Array.isArray(this.pageRangePages) && this.pageRangePages.length > 0 && this.pageRangePages[0] !== this.pageRangeLowerLimit;
  }
  get shouldShowUpperBreak() {
    if (this.pageRange === null) {
      return false;
    }
    if (this.totalPages < this.pageMarginsThreshold) {
      return false;
    }
    return Array.isArray(this.pageRangePages) && this.pageRangePages.length > 0 && this.pageRangePages[this.pageRangePages.length - 1] !== this.pageRangeUpperLimit;
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
    const totalPages1 = Math.ceil(this.totalItems / this.itemsPerPage);
    return isNaN(totalPages1) || totalPages1 === 0 ? 1 : totalPages1;
  }
  static {
    setComponentTemplate(precompileTemplate("\n    {{yield (hash activeItems=this.activeItems allPages=this.allPages currentPage=this._currentPage endMarginPages=this.endMarginPages firstActiveItem=this.firstActiveItem isFirstPage=this.isFirstPage isLastPage=this.isLastPage itemsPerPage=this.itemsPerPage lastActiveItem=this.lastActiveItem lastPage=this.lastPage nextPage=this.nextPage pageMargins=this.pageMargins pageRange=this.pageRange pageRangePages=this.pageRangePages previousPage=this.previousPage shouldShowLowerBreak=this.shouldShowLowerBreak shouldShowUpperBreak=this.shouldShowUpperBreak startMarginPages=this.startMarginPages totalItems=this.totalItems totalPages=this.totalPages)}}\n  ", {
      scope: () => ({
        hash
      }),
      strictMode: true
    }), this);
  }
}
function clamp(number1, min1, max1) {
  return Math.min(Math.max(number1, min1), max1);
}
function range(start1, end1) {
  return new Array(end1 - start1 + 1).fill(undefined).map((_1, i1) => i1 + start1);
}

export { PaginationData as default };
//# sourceMappingURL=pagination-data.js.map
