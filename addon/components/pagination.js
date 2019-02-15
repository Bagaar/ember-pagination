import Component from '@ember/component';
import layout from '../templates/components/pagination';

export default Component.extend({
  /**
   * Arguments
   */

  currentPage: null,
  itemsPerPage: null,
  pageMargins: 1,
  pageRange: 3,
  totalItems: null,

  /**
   * State
   */

  layout,
  tagName: '',
});
