import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | pagination-page-item', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <PaginationPageItem>
        template block text
      </PaginationPageItem>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('it passes through html attributes', async function (assert) {
    await render(hbs`
      <PaginationPageItem class="test" data-test-item>
        template block text
      </PaginationPageItem>
    `);

    assert.dom('[data-test-item]').hasClass('test');
  });

  test('it yields the passed @page argument', async function (assert) {
    await render(hbs`
      <PaginationPageItem @page={{1}} as |page|>
        {{page}}
      </PaginationPageItem>
    `);

    assert.equal(this.element.textContent.trim(), '1');
  });

  test('it yields the active state of the page', async function (assert) {
    this.set('currentPage', 1);

    await render(hbs`
      <PaginationPageItem @page={{1}} @currentPage={{this.currentPage}} as |page isActive|>
        {{isActive}}
      </PaginationPageItem>
    `);

    assert.equal(this.element.textContent.trim(), 'true');

    this.set('currentPage', 2);

    assert.equal(this.element.textContent.trim(), 'false');
  });
});
