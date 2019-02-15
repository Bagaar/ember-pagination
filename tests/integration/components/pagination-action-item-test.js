import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | pagination-action-item', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <PaginationActionItem>
        template block text
      </PaginationActionItem>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('it passes through html attributes', async function (assert) {
    await render(hbs`
      <PaginationActionItem class="test" data-test-item>
        template block text
      </PaginationActionItem>
    `);

    assert.dom('[data-test-item]').hasClass('test');
  });

  test('it passes through the @isDisabled argument as a yield', async function (assert) {
    this.set('isDisabled', true);

    await render(hbs`
      <PaginationActionItem @isDisabled={{this.isDisabled}} as |isDisabled|>
        {{isDisabled}}
      </PaginationActionItem>
    `);

    assert.equal(this.element.textContent.trim(), 'true');

    this.set('isDisabled', false);

    assert.equal(this.element.textContent.trim(), 'false');
  });
});
