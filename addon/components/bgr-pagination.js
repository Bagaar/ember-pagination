import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from 'bgr-ember-pagination/templates/components/bgr-pagination';

export default Component.extend({
  /**
   * Props
   */

  config: null,
  firstPageContent: '&lt;&lt;',
  lastPageContent: '&gt;&gt;',
  nextPageContent: '&gt;',
  previousPageContent: '&lt;',
  visiblePages: 7,

  /**
   * State
   */

  classNames: ['pagination'],
  layout,
  tagName: 'ul',

  /**
   * Computed
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

  pages: computed('activePage', 'perPage', 'totalRecords', 'visiblePages', function () {
    const activePage = this.get('activePage');
    const perPage = this.get('perPage');
    const totalRecords = this.get('totalRecords');
    const visiblePages = this.get('visiblePages');

    const pages = [];
    const total = Math.ceil(totalRecords / perPage);
    const visible = Math.min(total, visiblePages);
    const half = Math.floor(visible / 2);

    let start = ((activePage - half) + 1) - (visible % 2);
    let end = activePage + half;

    if (start <= 0) {
      start = 1;
      end = visible;
    }

    if (end > total) {
      start = (total - visible) + 1;
      end = total;
    }

    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }

    return pages;
  }),
});
