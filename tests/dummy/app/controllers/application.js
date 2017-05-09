import Ember from 'ember';

const {
  computed,
  Controller,
} = Ember;

export default Controller.extend({
  /**
   * State
   */

  queryParams: ['page'],

  /**
   * Computed
   */

  paginationConfig: computed('page', function () {
    const lastPage = 7;
    const firstPage = 1;
    const activePage = parseInt(this.get('page'), 10);

    return {
      activePage,
      firstPage,
      lastPage,
      nextPage: activePage < lastPage ? activePage + 1 : null,
      perPage: 10,
      previousPage: activePage > firstPage ? activePage - 1 : null,
      totalRecords: 70,
    };
  }),
});
