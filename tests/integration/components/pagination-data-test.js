import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

module('Integration | Component | pagination-data', function (hooks) {
  setupRenderingTest(hooks);

  test('it determines the correct `previousPage` value', async function (assert) {
    await render(hbs`
      <PaginationData
        @currentPage={{4}}
        @itemsPerPage={{10}}
        @totalItems={{50}}
        as |data|
      >
        {{eq data.previousPage 3}}
      </PaginationData>
    `);

    assert.dom(this.element).hasText('true');
  });

  test('`previousPage` is `null` when `@currentPage` is the first page', async function (assert) {
    await render(hbs`
      <PaginationData
        @currentPage={{1}}
        @itemsPerPage={{10}}
        @totalItems={{10}}
        as |data|
      >
        {{eq data.previousPage null}}
      </PaginationData>
    `);

    assert.dom(this.element).hasText('true');
  });

  test('it determines the correct `nextPage` value', async function (assert) {
    await render(hbs`
      <PaginationData
        @currentPage={{4}}
        @itemsPerPage={{10}}
        @totalItems={{50}}
        as |data|
      >
        {{eq data.nextPage 5}}
      </PaginationData>
    `);

    assert.dom(this.element).hasText('true');
  });

  test('`nextPage` is `null` when `@currentPage` is the last page', async function (assert) {
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.totalItems = 10;

    await render(hbs`
      <PaginationData
        @currentPage={{this.currentPage}}
        @itemsPerPage={{this.itemsPerPage}}
        @totalItems={{this.totalItems}}
        as |data|
      >
        {{eq data.nextPage null}}
      </PaginationData>
    `);

    assert.dom(this.element).hasText('true');

    this.setProperties({
      currentPage: 5,
      itemsPerPage: 10,
      totalItems: 50,
    });

    assert.dom(this.element).hasText('true');
  });

  test('it yields an `isFirstPage` value', async function (assert) {
    this.currentPage = 1;

    await render(hbs`
      <PaginationData
        @currentPage={{this.currentPage}}
        @itemsPerPage={{10}}
        @totalItems={{20}}
        as |data|
      >
        {{eq data.isFirstPage true}}
      </PaginationData>
    `);

    assert.dom(this.element).hasText('true');

    this.set('currentPage', 2);

    assert.dom(this.element).hasText('false');
  });

  test('it yields an `isLastPage` value', async function (assert) {
    this.currentPage = 2;

    await render(hbs`
      <PaginationData
        @currentPage={{this.currentPage}}
        @itemsPerPage={{10}}
        @totalItems={{20}}
        as |data|
      >
        {{eq data.isLastPage true}}
      </PaginationData>
    `);

    assert.dom(this.element).hasText('true');

    this.set('currentPage', 1);

    assert.dom(this.element).hasText('false');
  });

  test('it yields the total amount of pages as `totalPages`', async function (assert) {
    this.itemsPerPage = 10;
    this.totalItems = 60;
    this.totalPages = 6;

    await render(hbs`
      <PaginationData
        @currentPage={{1}}
        @itemsPerPage={{this.itemsPerPage}}
        @totalItems={{this.totalItems}}
        as |data|
      >
        {{eq data.totalPages this.totalPages}}
      </PaginationData>
    `);

    assert.dom(this.element).hasText('true');

    this.setProperties({
      totalItems: 10,
      totalPages: 1,
    });

    assert.dom(this.element).hasText('true');

    this.setProperties({
      itemsPerPage: 2,
      totalPages: 5,
    });

    assert.dom(this.element).hasText('true');
  });

  test('it yields the amount of items on the current page as `activeItems`', async function (assert) {
    this.activeItems = 5;
    this.currentPage = 1;
    this.totalItems = 5;

    await render(hbs`
      <PaginationData
        @currentPage={{this.currentPage}}
        @itemsPerPage={{10}}
        @totalItems={{this.totalItems}}
        as |data|
      >
        {{eq data.activeItems this.activeItems}}
      </PaginationData>
    `);

    assert.dom(this.element).hasText('true');

    this.setProperties({
      activeItems: 10,
      currentPage: 2,
      totalItems: 40,
    });

    assert.dom(this.element).hasText('true');

    this.setProperties({
      activeItems: 3,
      currentPage: 6,
      totalItems: 53,
    });

    assert.dom(this.element).hasText('true');

    this.setProperties({
      activeItems: 0,
      currentPage: 1,
      totalItems: 0,
    });

    assert.dom(this.element).hasText('true');
  });

  test('it yields the first item on the current page as `firstActiveItem`', async function (assert) {
    this.currentPage = 1;
    this.firstActiveItem = 1;
    this.totalItems = 5;

    await render(hbs`
      <PaginationData
        @currentPage={{this.currentPage}}
        @itemsPerPage={{10}}
        @totalItems={{this.totalItems}}
        as |data|
      >
        {{eq data.firstActiveItem this.firstActiveItem}}
      </PaginationData>
    `);

    assert.dom(this.element).hasText('true');

    this.setProperties({
      currentPage: 2,
      firstActiveItem: 11,
      totalItems: 40,
    });

    assert.dom(this.element).hasText('true');

    this.setProperties({
      currentPage: 6,
      firstActiveItem: 51,
      totalItems: 53,
    });

    assert.dom(this.element).hasText('true');

    this.setProperties({
      currentPage: 1,
      firstActiveItem: 0,
      totalItems: 0,
    });

    assert.dom(this.element).hasText('true');
  });

  test('it yields the last item on the current page as `lastActiveItem`', async function (assert) {
    this.currentPage = 1;
    this.lastActiveItem = 5;
    this.totalItems = 5;

    await render(hbs`
      <PaginationData
        @currentPage={{this.currentPage}}
        @itemsPerPage={{10}}
        @totalItems={{this.totalItems}}
        as |data|
      >
        {{eq data.lastActiveItem this.lastActiveItem}}
      </PaginationData>
    `);

    assert.dom(this.element).hasText('true');

    this.setProperties({
      currentPage: 2,
      lastActiveItem: 20,
      totalItems: 40,
    });

    assert.dom(this.element).hasText('true');

    this.setProperties({
      currentPage: 6,
      lastActiveItem: 53,
      totalItems: 53,
    });

    assert.dom(this.element).hasText('true');

    this.setProperties({
      currentPage: 1,
      lastActiveItem: 0,
      totalItems: 0,
    });

    assert.dom(this.element).hasText('true');
  });

  test('it yields an array of all pages as `allPages`', async function (assert) {
    await render(hbs`
      <PaginationData
        @currentPage={{1}}
        @itemsPerPage={{10}}
        @totalItems={{30}}
        as |data|
      >
        {{#each data.allPages as |page|}}
          {{page}}
        {{/each}}
      </PaginationData>
    `);

    assert.dom(this.element).hasText('1 2 3');
  });

  test('it yields an array of pages before the break as `startMarginPages` if `@pageRange` is set', async function (assert) {
    this.pageMargins = 1;
    this.pageRange = null;

    await render(hbs`
      <PaginationData
        @currentPage={{1}}
        @itemsPerPage={{10}}
        @pageMargins={{this.pageMargins}}
        @pageRange={{this.pageRange}}
        @totalItems={{100}}
        as |data|
      >
        {{#each data.startMarginPages as |page|}}
          {{page}}
        {{/each}}
      </PaginationData>
    `);

    assert.dom(this.element).hasText('');

    this.set('pageRange', 3);

    assert.dom(this.element).hasText('1');

    this.set('pageMargins', 2);

    assert.dom(this.element).hasText('1 2');
  });

  test('it yields an array of pages after the break as `endMarginPages` if `@pageRange` is set', async function (assert) {
    this.pageMargins = 1;
    this.pageRange = null;

    await render(hbs`
      <PaginationData
        @currentPage={{1}}
        @itemsPerPage={{10}}
        @pageMargins={{this.pageMargins}}
        @pageRange={{this.pageRange}}
        @totalItems={{100}}
        as |data|
      >
        {{#each data.endMarginPages as |page|}}
          {{page}}
        {{/each}}
      </PaginationData>
    `);

    assert.dom(this.element).hasText('');

    this.set('pageRange', 3);

    assert.dom(this.element).hasText('10');

    this.set('pageMargins', 2);

    assert.dom(this.element).hasText('9 10');
  });

  test('`pageRangePages` contains an array of the pages between the breaks if `@pageRange` is set', async function (assert) {
    this.currentPage = 1;
    this.pageRange = null;
    this.totalItems = 100;

    await render(hbs`
      <PaginationData
        @currentPage={{this.currentPage}}
        @itemsPerPage={{10}}
        @pageRange={{this.pageRange}}
        @totalItems={{this.totalItems}}
        as |data|
      >
        {{#each data.pageRangePages as |page|}}
          {{page}}
        {{/each}}
      </PaginationData>
    `);

    assert.dom(this.element).hasText('');

    this.set('pageRange', 3);

    assert.dom(this.element).hasText('2 3 4');

    this.set('currentPage', 3);

    assert.dom(this.element).hasText('2 3 4');

    this.set('currentPage', 4);

    assert.dom(this.element).hasText('3 4 5');

    this.set('currentPage', 7);

    assert.dom(this.element).hasText('6 7 8');

    this.set('currentPage', 8);

    assert.dom(this.element).hasText('7 8 9');

    this.set('currentPage', 10);

    assert.dom(this.element).hasText('7 8 9');

    this.setProperties({
      currentPage: 5,
      pageRange: 5,
    });

    assert.dom(this.element).hasText('3 4 5 6 7');

    this.setProperties({
      currentPage: 5,
      pageRange: 9,
    });

    assert.dom(this.element).hasText('1 2 3 4 5 6 7 8 9 10');

    this.setProperties({
      currentPage: 1,
      totalItems: 0,
    });

    assert.dom(this.element).hasText('1');
  });

  test('`pageRangePages` contains all pages if the sum of the margin pages and the `@pageRange` is larger than the total amount of pages', async function (assert) {
    this.currentPage = 3;
    this.pageMargins = 1;
    this.totalItems = 50;

    await render(hbs`
      <PaginationData
        @currentPage={{this.currentPage}}
        @itemsPerPage={{10}}
        @pageMargins={{this.pageMargins}}
        @pageRange={{3}}
        @totalItems={{this.totalItems}}
        as |data|
      >
        <div data-test-start-margin-pages>
          {{#each data.startMarginPages as |page|}}
            {{page}}
          {{/each}}
        </div>

        <div data-test-page-range-pages>
          {{#each data.pageRangePages as |page|}}
            {{page}}
          {{/each}}
        </div>

        <div data-test-end-margin-pages>
          {{#each data.endMarginPages as |page|}}
            {{page}}
          {{/each}}
        </div>
      </PaginationData>
    `);

    assert.dom('[data-test-page-range-pages]').hasText('2 3 4');

    this.set('pageMargins', 2);

    assert.dom('[data-test-start-margin-pages]').hasText('');
    assert.dom('[data-test-page-range-pages]').hasText('1 2 3 4 5');
    assert.dom('[data-test-end-margin-pages]').hasText('');

    this.setProperties({
      totalItems: 80,
      currentPage: 5,
    });

    assert.dom('[data-test-start-margin-pages]').hasText('1 2');
    assert.dom('[data-test-page-range-pages]').hasText('4 5 6');
    assert.dom('[data-test-end-margin-pages]').hasText('7 8');

    this.set('pageMargins', 3);

    assert.dom('[data-test-start-margin-pages]').hasText('');
    assert.dom('[data-test-page-range-pages]').hasText('1 2 3 4 5 6 7 8');
    assert.dom('[data-test-end-margin-pages]').hasText('');
  });

  test('`shouldShowLowerBreak` can only be `true` if `@pageRange` is set', async function (assert) {
    this.currentPage = 1;
    this.pageRange = 3;

    await render(hbs`
      <PaginationData
        @currentPage={{this.currentPage}}
        @itemsPerPage={{10}}
        @pageRange={{this.pageRange}}
        @totalItems={{100}}
        as |data|
      >
        {{data.shouldShowLowerBreak}}
      </PaginationData>
    `);

    assert.dom(this.element).hasText('false');

    this.set('currentPage', 3);

    assert.dom(this.element).hasText('false');

    this.set('currentPage', 4);

    assert.dom(this.element).hasText('true');

    this.set('pageRange', 5);

    assert.dom(this.element).hasText('false');

    this.set('currentPage', 5);

    assert.dom(this.element).hasText('true');
  });

  test('`shouldShowLowerBreak` always returns `false` if there are not enough pages', async function (assert) {
    await render(hbs`
      <PaginationData
        @currentPage={{1}}
        @itemsPerPage={{10}}
        @pageRange={{3}}
        @totalItems={{20}}
        as |data|
      >
        {{data.shouldShowLowerBreak}}
      </PaginationData>
    `);

    assert.dom(this.element).hasText('false');
  });

  test('`shouldShowLowerBreak` always returns `false` if `@pageRange` is not set', async function (assert) {
    this.currentPage = 1;
    this.pageRange = null;

    await render(hbs`
      <PaginationData
        @currentPage={{this.currentPage}}
        @itemsPerPage={{10}}
        @pageRange={{this.pageRange}}
        @totalItems={{100}}
        as |data|
      >
        {{data.shouldShowLowerBreak}}
      </PaginationData>
    `);

    assert.dom(this.element).hasText('false');

    this.set('currentPage', 10);

    assert.dom(this.element).hasText('false');

    this.set('pageRange', 3);

    assert.dom(this.element).hasText('true');
  });

  test('`shouldShowUpperBreak` can only be `true` if `@pageRange` is set', async function (assert) {
    this.currentPage = 10;
    this.pageRange = 3;

    await render(hbs`
      <PaginationData
        @currentPage={{this.currentPage}}
        @itemsPerPage={{10}}
        @pageRange={{this.pageRange}}
        @totalItems={{100}}
        as |data|
      >
        {{data.shouldShowUpperBreak}}
      </PaginationData>
    `);

    assert.dom(this.element).hasText('false');

    this.set('currentPage', 8);

    assert.dom(this.element).hasText('false');

    this.set('currentPage', 7);

    assert.dom(this.element).hasText('true');

    this.set('pageRange', 5);

    assert.dom(this.element).hasText('false');

    this.set('currentPage', 5);

    assert.dom(this.element).hasText('true');
  });

  test('`shouldShowUpperBreak` always returns `false` if there are not enough pages', async function (assert) {
    await render(hbs`
      <PaginationData
        @currentPage={{1}}
        @itemsPerPage={{10}}
        @pageRange={{3}}
        @totalItems={{20}}
        as |data|
      >
        {{data.shouldShowUpperBreak}}
      </PaginationData>
    `);

    assert.dom(this.element).hasText('false');
  });

  test('`shouldShowUpperBreak` always returns `false` if `@pageRange` is not set', async function (assert) {
    this.currentPage = 10;
    this.pageRange = null;

    await render(hbs`
      <PaginationData
        @currentPage={{this.currentPage}}
        @itemsPerPage={{10}}
        @pageRange={{this.pageRange}}
        @totalItems={{100}}
        as |data|
      >
        {{data.shouldShowUpperBreak}}
      </PaginationData>
    `);

    assert.dom(this.element).hasText('false');

    this.set('currentPage', 1);

    assert.dom(this.element).hasText('false');

    this.set('pageRange', 3);

    assert.dom(this.element).hasText('true');
  });
});
