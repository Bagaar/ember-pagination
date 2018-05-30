import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  /**
   * state
   */

  queryParams: ['page'],
  page: 1,

  /**
   * computed
   */

  config: computed('page', function () {
    let activePage = parseInt(this.get('page'), 10);
    let firstPage = 1;
    let perPage = 10;
    let totalRecords = 90;
    let lastPage = Math.ceil(totalRecords / perPage);

    return {
      activePage,
      firstPage,
      lastPage,
      nextPage: activePage < lastPage ? Math.max(activePage + 1, firstPage) : null,
      perPage,
      previousPage: activePage > firstPage ? Math.min(activePage - 1, lastPage) : null,
      totalRecords,
    };
  }),
});
