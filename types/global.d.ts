import type EmberPaginationRegistry from '@bagaar/ember-pagination/template-registry';
import type EmberTruthHelpersRegistry from 'ember-truth-helpers/template-registry';

import '@glint/environment-ember-loose';
import 'ember-source/types';
import 'ember-source/types/preview';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberPaginationRegistry,
      EmberTruthHelpersRegistry {}
}
