import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/pagination-page-item';

export default Component.extend({
  /**
   * Arguments
   */

  page: null,
  currentPage: null,

  /**
   * State
   */

  layout,
  tagName: '',

  /**
   * Computed
   */

  isActivePage: computed('currentPage', 'page', function () {
    return this.currentPage === this.page;
  }),
});
