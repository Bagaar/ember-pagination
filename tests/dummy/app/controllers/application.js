/* eslint-disable ember/alias-model-in-controller */

import Controller from '@ember/controller'
import { computed } from '@ember/object'
import generateConfig from 'bgr-ember-pagination/utils/generate-config'

export default Controller.extend({
  /**
   * state
   */

  queryParams: [
    {
      page: {
        type: 'number'
      }
    }
  ],
  page: 1,

  /**
   * computed
   */

  config: computed('page', function () {
    return generateConfig({
      activePage: this.get('page'),
      totalRecords: 107
    })
  })
})
