import Ember from 'ember';

export default Ember.Controller.extend({
  paginationConfig: {
    activePage: 4,
    firstPage: 1,
    lastPage: 7,
    nextPage: 5,
    perPage: 10,
    previousPage: 3,
    totalRecords: 70
  }
});
