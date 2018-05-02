import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from 'bgr-ember-pagination/templates/components/bgr-pagination';

export default Component.extend({
  /**
   * props
   */

  config: null,
  pageRangeDisplayed: 5,

  breakLabel: '...',
  nextPageLabel: '>',
  previousPageLabel: '<',

  baseClass: 'pagination',
  breakClass: 'pagination__break',
  disabledClass: 'pagination__disabled',
  itemClass: 'pagination__item',
  linkClass: 'pagination__link',

  /**
   * state
   */

  layout,
  pageRangeLowerLimit: 2,
  tagName: '',

  /**
   * computed
   */

  activePage: computed.readOnly('config.activePage'),
  firstPage: computed.readOnly('config.firstPage'),
  lastPage: computed.readOnly('config.lastPage'),
  nextPage: computed.readOnly('config.nextPage'),
  perPage: computed.readOnly('config.perPage'),
  previousPage: computed.readOnly('config.previousPage'),
  totalRecords: computed.readOnly('config.totalRecords'),

  isFirstPage: computed('activePage', 'firstPage', function () {
    return this.get('activePage') === this.get('firstPage');
  }),

  isLastPage: computed('activePage', 'lastPage', function () {
    return this.get('activePage') === this.get('lastPage');
  }),

  pageRange: computed('activePage', '_pageRangeDisplayed', 'pageRangeLowerLimit', 'pageRangeUpperLimit', 'totalPages', function () {
    const pageRangeDisplayed = this.get('_pageRangeDisplayed');
    const pageRangeLowerLimit = this.get('pageRangeLowerLimit');
    const pageRangeUpperLimit = this.get('pageRangeUpperLimit');
    const totalPages = this.get('totalPages');
    const pageRange = [];

    let pageRangeStart = pageRangeLowerLimit;
    let pageRangeEnd = pageRangeUpperLimit;

    // - 2 = first and last page not included
    if (pageRangeDisplayed && pageRangeDisplayed < totalPages - 2) {
      const activePage = this.get('activePage');
      const pageRangeOffset = Math.floor(pageRangeDisplayed / 2);

      pageRangeStart = activePage - pageRangeOffset;
      pageRangeEnd = activePage + pageRangeOffset;

      if (pageRangeStart < pageRangeLowerLimit) {
        pageRangeStart = pageRangeLowerLimit;
        pageRangeEnd = pageRangeDisplayed + 1; // + 1 = first page not included
      }

      if (pageRangeEnd > pageRangeUpperLimit) {
        pageRangeStart = totalPages - pageRangeDisplayed;
        pageRangeEnd = pageRangeUpperLimit;
      }
    }

    for (let page = pageRangeStart; page <= pageRangeEnd; page++) {
      pageRange.push(page);
    }

    return pageRange;
  }),

  _pageRangeDisplayed: computed('pageRangeDisplayed', function () {
    let pageRangeDisplayed = this.get('pageRangeDisplayed');

    // make pageRangeDisplayed uneven (6 -> 5, 4 -> 3, ...)
    if (pageRangeDisplayed && pageRangeDisplayed % 2 === 0) {
      pageRangeDisplayed--;
    }

    return pageRangeDisplayed;
  }),

  pageRangeUpperLimit: computed('totalPages', function () {
    return this.get('totalPages') - 1;
  }),

  showLowerBreak: computed('pageRange', 'pageRangeLowerLimit', function () {
    const pageRange = this.get('pageRange');

    return pageRange.length && pageRange[0] !== this.get('pageRangeLowerLimit');
  }),

  showUpperBreak: computed('pageRange', 'pageRangeUpperLimit', function () {
    const pageRange = this.get('pageRange');

    return pageRange.length && pageRange[pageRange.length - 1] !== this.get('pageRangeUpperLimit');
  }),

  showPagination: computed('totalPages', function () {
    return this.get('totalPages') > 1;
  }),

  totalPages: computed('perPage', 'totalRecords', function () {
    const perPage = this.get('perPage');
    const totalRecords = this.get('totalRecords');

    const totalPages = Math.ceil(totalRecords / perPage);

    return isNaN(totalPages) ? 0 : totalPages;
  }),
});
