/* eslint-disable ember/no-classic-components, ember/no-classic-classes */

import Component from '@ember/component';
import { assert } from '@ember/debug';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

const DISABLED = null;
const FIRST_PAGE = 1;

export default Component.extend({
  /**
   * Arguments
   */

  currentPage: null,
  totalItems: null,
  itemsPerPage: null,
  pageRange: null,
  pageMargins: 1,

  /**
   * State
   */

  tagName: '',

  /**
   * Computed
   */

  lastPage: alias('totalPages'),

  _currentPage: computed('currentPage', 'lastPage', function () {
    assert(
      `@currentPage should be a value between ${FIRST_PAGE} and ${this.lastPage}`,
      this.currentPage >= FIRST_PAGE && this.currentPage <= this.lastPage
    );

    return clamp(this.currentPage, FIRST_PAGE, this.lastPage);
  }),

  previousPage: computed('isFirstPage', '_currentPage', function () {
    return this.isFirstPage ? DISABLED : this._currentPage - 1;
  }),

  nextPage: computed('isLastPage', '_currentPage', function () {
    return this.isLastPage ? DISABLED : this._currentPage + 1;
  }),

  isFirstPage: computed('_currentPage', function () {
    return this._currentPage === FIRST_PAGE;
  }),

  isLastPage: computed('_currentPage', 'lastPage', function () {
    return this._currentPage === this.lastPage;
  }),

  totalPages: computed('totalItems', 'itemsPerPage', function () {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    // There should always be a page
    return isNaN(totalPages) || totalPages === 0 ? 1 : totalPages;
  }),

  activeItems: computed(
    '_currentPage',
    'totalItems',
    'itemsPerPage',
    function () {
      if (this.itemsPerPage * this._currentPage > this.totalItems) {
        return this.totalItems % this.itemsPerPage;
      }

      return this.itemsPerPage;
    }
  ),

  allPages: computed('lastPage', function () {
    return range(FIRST_PAGE, this.lastPage);
  }),

  pageRangePages: computed(
    'allPages',
    '_currentPage',
    'pageMarginsThreshold',
    'pageRange',
    'pageRangeLowerLimit',
    'pageRangeUpperLimit',
    'totalPages',
    function () {
      const pageRange = this.pageRange;

      if (!pageRange) {
        return null;
      }

      if (this.totalPages < this.pageMarginsThreshold) {
        return this.allPages;
      }

      const pageRangeOffset = Math.floor(pageRange / 2);

      let pageRangeStart = this._currentPage - pageRangeOffset;
      let pageRangeEnd = this._currentPage + pageRangeOffset;

      if (pageRangeStart < this.pageRangeLowerLimit) {
        pageRangeStart = this.pageRangeLowerLimit;
        pageRangeEnd = pageRangeStart + pageRange - 1;
      }

      if (pageRangeEnd > this.pageRangeUpperLimit) {
        pageRangeStart = this.pageRangeUpperLimit - pageRange + 1;
        pageRangeEnd = this.pageRangeUpperLimit;
      }

      return range(pageRangeStart, pageRangeEnd);
    }
  ),

  startMarginPages: computed(
    'pageMargins',
    'pageMarginsThreshold',
    'pageRange',
    'totalPages',
    function () {
      if (!this.pageRange) {
        return null;
      }

      if (this.totalPages < this.pageMarginsThreshold) {
        return [];
      }

      return range(FIRST_PAGE, this.pageMargins);
    }
  ),

  endMarginPages: computed(
    'pageMargins',
    'pageMarginsThreshold',
    'pageRange',
    'pageRangeUpperLimit',
    'totalPages',
    function () {
      if (!this.pageRange) {
        return null;
      }

      if (this.totalPages < this.pageMarginsThreshold) {
        return [];
      }

      return range(this.pageRangeUpperLimit + 1, this.totalPages);
    }
  ),

  shouldShowLowerBreak: computed(
    'pageMarginsThreshold',
    'pageRange',
    'pageRangeLowerLimit',
    'pageRangePages.length',
    'totalPages',
    function () {
      if (!this.pageRange) {
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
  ),

  shouldShowUpperBreak: computed(
    'pageRange',
    'pageRangePages',
    'pageRangeUpperLimit',
    'pageMarginsThreshold',
    'totalPages',
    function () {
      if (!this.pageRange) {
        return false;
      }

      if (this.totalPages < this.pageMarginsThreshold) {
        return false;
      }

      const pageRangePages = this.pageRangePages;

      return (
        pageRangePages.length &&
        pageRangePages[pageRangePages.length - 1] !== this.pageRangeUpperLimit
      );
    }
  ),

  pageRangeLowerLimit: computed('pageMargins', function () {
    return this.pageMargins + 1;
  }),

  pageRangeUpperLimit: computed('pageMargins', 'totalPages', function () {
    return this.totalPages - this.pageMargins;
  }),

  pageMarginsThreshold: computed('pageMargins', 'pageRange', function () {
    return this.pageRange + this.pageMargins * 2;
  }),

  /**
   * Hooks
   */

  init() {
    this._super(...arguments);

    const itemsPerPage = this.itemsPerPage;
    const pageRange = this.pageRange;
    const pageMargins = this.pageMargins;

    assert(
      '@currentPage is required and should be a number',
      isNumber(this.currentPage)
    );
    assert(
      '@totalItems is required and should be a number',
      isNumber(this.totalItems)
    );
    assert(
      '@itemsPerPage is required and should be a number',
      !itemsPerPage || isNumber(itemsPerPage)
    );
    assert(
      '@pageRange should be an uneven number to make sure that the active page is always center aligned',
      !pageRange || (isNumber(pageRange) && pageRange % 2 !== 0)
    );
    assert(
      '@pageMargins should be a number higher than 0',
      !pageRange || (isNumber(pageMargins) && pageMargins > 0)
    );
  },
});

// TODO: add ember-auto-import and use lodash's range util instead
// Src: https://dev.to/ycmjason/how-to-create-range-in-javascript-539i
function range(start, end) {
  return new Array(end - start + 1).fill(undefined).map((_, i) => i + start);
}

function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
}
