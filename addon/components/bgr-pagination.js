import Component from '@ember/component';
import EmberObject, { computed } from '@ember/object';
import layout from 'bgr-ember-pagination/templates/components/bgr-pagination';

function computedQueryParams(key) {
  return computed(key, function () {
    return this.createQueryParams(this.get(key));
  });
}

export default Component.extend({
  /**
   * props
   */

  config: null,
  pageRangeDisplayed: 5,
  queryParam: 'page',

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

  firstPageQueryParams: computedQueryParams('firstPage'),
  lastPageQueryParams: computedQueryParams('lastPage'),
  nextPageQueryParams: computedQueryParams('nextPage'),
  previousPageQueryParams: computedQueryParams('previousPage'),

  isFirstPage: computed('activePage', 'firstPage', function () {
    return this.get('activePage') === this.get('firstPage');
  }),

  isLastPage: computed('activePage', 'lastPage', function () {
    return this.get('activePage') === this.get('lastPage');
  }),

  pageRange: computed('activePage', '_pageRangeDisplayed', 'pageRangeLowerLimit', 'pageRangeUpperLimit', 'totalPages', function () {
    let pageRangeDisplayed = this.get('_pageRangeDisplayed');
    let pageRangeLowerLimit = this.get('pageRangeLowerLimit');
    let pageRangeUpperLimit = this.get('pageRangeUpperLimit');
    let totalPages = this.get('totalPages');

    let pageRange = [];
    let pageRangeStart = pageRangeLowerLimit;
    let pageRangeEnd = pageRangeUpperLimit;

    // - 2 = first and last page not included
    if (pageRangeDisplayed && pageRangeDisplayed < totalPages - 2) {
      let activePage = this.get('activePage');
      let pageRangeOffset = Math.floor(pageRangeDisplayed / 2);

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

    for (let number = pageRangeStart; number <= pageRangeEnd; number++) {
      pageRange.push({
        number,
        queryParams: this.createQueryParams(number),
      });
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
    let pageRange = this.get('pageRange');

    return pageRange.length && pageRange[0].number !== this.get('pageRangeLowerLimit');
  }),

  showUpperBreak: computed('pageRange', 'pageRangeUpperLimit', function () {
    let pageRange = this.get('pageRange');

    return pageRange.length && pageRange[pageRange.length - 1].number !== this.get('pageRangeUpperLimit');
  }),

  showPagination: computed('totalPages', function () {
    return this.get('totalPages') > 1;
  }),

  totalPages: computed('perPage', 'totalRecords', function () {
    let perPage = this.get('perPage');
    let totalRecords = this.get('totalRecords');

    let totalPages = Math.ceil(totalRecords / perPage);

    return isNaN(totalPages) ? 0 : totalPages;
  }),

  /**
   * methods
   */

  createQueryParams(value) {
    let key = this.get('queryParam');
    let values = {
      [key]: value,
    };

    return EmberObject.create({
      isQueryParams: true,
      values,
    });
  },
});
