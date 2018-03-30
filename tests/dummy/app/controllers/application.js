import Ember from 'ember';

const { computed, Controller } = Ember;

export default Controller.extend({
  /**
   * State
   */

  queryParams: ['page'],

  /**
   * Computed
   */

  paginationConfig: computed('page', function() {
    const lastPage = 7;
    const firstPage = 1;
    const activePage = parseInt(this.get('page'), 10);

    return {
      activePage,
      firstPage,
      lastPage,
      nextPage: activePage < lastPage ? Math.max(activePage + 1, firstPage) : null,
      perPage: 10,
      previousPage: activePage > firstPage ? Math.min(activePage - 1, lastPage) : null,
      totalRecords: 70,
    };
  }),
});
