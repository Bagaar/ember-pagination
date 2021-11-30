import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Component | pagination-data', function (hooks) {
  setupTest(hooks);

  test('it throws exceptions when not all required arguments are provided', function (assert) {
    assert.throws(() => {
      this.owner.factoryFor('component:pagination-data').create();
    });
  });

  test("it determines the correct 'previousPage' value", function (assert) {
    const currentPage = 4;

    const component = this.owner
      .factoryFor('component:pagination-data')
      .create({
        itemsPerPage: 10,
        totalItems: 50,
        currentPage: 4,
      });

    assert.strictEqual(component.previousPage, currentPage - 1);
  });

  test('previousPage is null when the current page is the first page', function (assert) {
    const component = this.owner
      .factoryFor('component:pagination-data')
      .create({
        itemsPerPage: 10,
        totalItems: 10,
        currentPage: 1,
      });

    assert.strictEqual(component.previousPage, null);
  });

  test("it determines the correct 'nextPage' value", function (assert) {
    const currentPage = 4;

    const component = this.owner
      .factoryFor('component:pagination-data')
      .create({
        itemsPerPage: 10,
        totalItems: 50,
        currentPage: 4,
      });

    assert.strictEqual(component.nextPage, currentPage + 1);
  });

  test('nextPage is null when the current page is the last page', function (assert) {
    const component = this.owner
      .factoryFor('component:pagination-data')
      .create({
        itemsPerPage: 10,
        totalItems: 10,
        currentPage: 1,
      });

    assert.strictEqual(component.nextPage, null);

    component.setProperties({
      itemsPerPage: 10,
      totalItems: 50,
      currentPage: 5,
    });

    assert.strictEqual(component.nextPage, null);
  });

  test("it yields an 'isFirstPage' value", function (assert) {
    const component = this.owner
      .factoryFor('component:pagination-data')
      .create({
        itemsPerPage: 10,
        totalItems: 20,
        currentPage: 1,
      });

    assert.ok(component.isFirstPage);

    component.set('currentPage', 2);

    assert.notOk(component.isFirstPage);
  });

  test("it yields an 'isLastPage' value", function (assert) {
    const component = this.owner
      .factoryFor('component:pagination-data')
      .create({
        itemsPerPage: 10,
        totalItems: 20,
        currentPage: 2,
      });

    assert.ok(component.isLastPage);

    component.set('currentPage', 1);

    assert.notOk(component.isLastPage);
  });

  test('it yields the total amount of pages', function (assert) {
    const component = this.owner
      .factoryFor('component:pagination-data')
      .create({
        itemsPerPage: 10,
        totalItems: 60,
        currentPage: 1,
      });

    assert.strictEqual(component.totalPages, 6);

    component.set('totalItems', 10);

    assert.strictEqual(component.totalPages, 1);

    component.set('itemsPerPage', 2);

    assert.strictEqual(component.totalPages, 5);
  });

  test('it yields the amount of items on the current page', function (assert) {
    const component = this.owner
      .factoryFor('component:pagination-data')
      .create({
        itemsPerPage: 10,
        totalItems: 5,
        currentPage: 1,
      });

    assert.strictEqual(component.activeItems, 5);

    component.setProperties({
      totalItems: 40,
      currentPage: 2,
    });

    assert.strictEqual(component.activeItems, 10);

    component.setProperties({
      totalItems: 53,
      currentPage: 6,
    });

    assert.strictEqual(component.activeItems, 3);

    component.setProperties({
      totalItems: 0,
      currentPage: 1,
    });

    assert.strictEqual(component.activeItems, 0);
  });

  test('it yields an array of all pages as allPages', function (assert) {
    const component = this.owner
      .factoryFor('component:pagination-data')
      .create({
        itemsPerPage: 10,
        totalItems: 30,
        currentPage: 1,
      });

    assert.strictEqual(component.allPages.length, 3);
    assert.deepEqual(component.allPages, [1, 2, 3]);
  });

  test('it yields an array of pages before the break as startMarginPages if pageRange is set', function (assert) {
    const component = this.owner
      .factoryFor('component:pagination-data')
      .create({
        itemsPerPage: 10,
        totalItems: 100,
        currentPage: 1,
      });

    assert.notOk(component.startMarginPages);

    component.set('pageRange', 3);
    assert.ok(component.startMarginPages);

    // pageMargins should default to 1
    assert.deepEqual(component.startMarginPages, [1]);

    component.set('pageMargins', 2);
    assert.deepEqual(component.startMarginPages, [1, 2]);
  });

  test('it yields an array of pages after the break as endMarginPages if pageRange is set', function (assert) {
    const component = this.owner
      .factoryFor('component:pagination-data')
      .create({
        itemsPerPage: 10,
        totalItems: 100,
        currentPage: 1,
      });

    assert.notOk(component.endMarginPages);

    component.set('pageRange', 3);
    assert.ok(component.endMarginPages);

    // pageMargins should default to 1
    assert.deepEqual(component.endMarginPages, [10]);

    component.set('pageMargins', 2);
    assert.deepEqual(component.endMarginPages, [9, 10]);
  });

  test('pageRangePages contains an array of the pages between the breaks if @pageRange is set', function (assert) {
    const component = this.owner
      .factoryFor('component:pagination-data')
      .create({
        itemsPerPage: 10,
        totalItems: 100,
        currentPage: 1,
      });

    assert.notOk(component.pageRangePages);

    component.set('pageRange', 3);
    assert.deepEqual(component.pageRangePages, [2, 3, 4]);

    component.set('currentPage', 3);
    assert.deepEqual(component.pageRangePages, [2, 3, 4]);

    component.set('currentPage', 4);
    assert.deepEqual(component.pageRangePages, [3, 4, 5]);

    component.set('currentPage', 7);
    assert.deepEqual(component.pageRangePages, [6, 7, 8]);

    component.set('currentPage', 8);
    assert.deepEqual(component.pageRangePages, [7, 8, 9]);

    component.set('currentPage', 10);
    assert.deepEqual(component.pageRangePages, [7, 8, 9]);

    component.setProperties({
      currentPage: 5,
      pageRange: 5,
    });
    assert.deepEqual(component.pageRangePages, [3, 4, 5, 6, 7]);

    component.setProperties({
      currentPage: 5,
      pageRange: 10,
    });
    assert.deepEqual(component.pageRangePages, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    component.set('totalItems', 0);
    assert.deepEqual(component.pageRangePages, [1]);
  });

  test('pageRangePages contains all pages if the sum of margin pages and the pageRange is larger than the total amount of pages', function (assert) {
    const component = this.owner
      .factoryFor('component:pagination-data')
      .create({
        itemsPerPage: 10,
        totalItems: 50,
        currentPage: 3,
        pageRange: 3,
      });

    assert.deepEqual(component.pageRangePages, [2, 3, 4]);

    component.set('pageMargins', 2);
    assert.deepEqual(component.pageRangePages, [1, 2, 3, 4, 5]);
    assert.strictEqual(component.startMarginPages.length, 0);
    assert.strictEqual(component.endMarginPages.length, 0);

    component.setProperties({
      totalItems: 80,
      currentPage: 5,
    });
    assert.deepEqual(component.pageRangePages, [4, 5, 6]);
    assert.strictEqual(component.startMarginPages.length, 2);
    assert.strictEqual(component.endMarginPages.length, 2);

    component.set('pageMargins', 3);
    assert.deepEqual(component.pageRangePages, [1, 2, 3, 4, 5, 6, 7, 8]);
    assert.strictEqual(component.startMarginPages.length, 0);
    assert.strictEqual(component.endMarginPages.length, 0);
  });

  test('shouldShowLowerBreak can only be true if pageRange is set', function (assert) {
    const component = this.owner
      .factoryFor('component:pagination-data')
      .create({
        itemsPerPage: 10,
        totalItems: 100,
        currentPage: 1,
        pageRange: 3,
      });

    assert.notOk(component.shouldShowLowerBreak);

    component.set('currentPage', 3);
    assert.notOk(component.shouldShowLowerBreak);

    component.set('currentPage', 4);
    assert.ok(component.shouldShowLowerBreak);

    component.set('pageRange', 5);
    assert.notOk(component.shouldShowLowerBreak);

    component.set('currentPage', 5);
    assert.ok(component.shouldShowLowerBreak);
  });

  test('shouldShowLowerBreak always returns false if there are not enough pages', function (assert) {
    const component = this.owner
      .factoryFor('component:pagination-data')
      .create({
        itemsPerPage: 10,
        totalItems: 20,
        currentPage: 1,
        pageRange: 3,
      });

    assert.notOk(component.shouldShowLowerBreak);
  });

  test('shouldShowLowerBreak always returns false if pageRange is not set', function (assert) {
    const component = this.owner
      .factoryFor('component:pagination-data')
      .create({
        itemsPerPage: 10,
        totalItems: 100,
        currentPage: 1,
      });

    assert.notOk(component.shouldShowLowerBreak);

    component.set('currentPage', 10);
    assert.notOk(component.shouldShowLowerBreak);

    component.set('pageRange', 3);
    assert.ok(component.shouldShowLowerBreak);
  });

  test('shouldShowUpperBreak can only be true if pageRange is set', function (assert) {
    const component = this.owner
      .factoryFor('component:pagination-data')
      .create({
        itemsPerPage: 10,
        totalItems: 100,
        currentPage: 10,
        pageRange: 3,
      });

    assert.notOk(component.shouldShowUpperBreak);

    component.set('currentPage', 8);
    assert.notOk(component.shouldShowUpperBreak);

    component.set('currentPage', 7);
    assert.ok(component.shouldShowUpperBreak);

    component.set('pageRange', 5);
    assert.notOk(component.shouldShowUpperBreak);

    component.set('currentPage', 5);
    assert.ok(component.shouldShowUpperBreak);
  });

  test('shouldShowUpperBreak always returns false if there are not enough pages', function (assert) {
    const component = this.owner
      .factoryFor('component:pagination-data')
      .create({
        itemsPerPage: 10,
        totalItems: 20,
        currentPage: 1,
        pageRange: 3,
      });

    assert.notOk(component.shouldShowUpperBreak);
  });

  test('shouldShowUpperBreak always returns false if pageRange is not set', function (assert) {
    const component = this.owner
      .factoryFor('component:pagination-data')
      .create({
        itemsPerPage: 10,
        totalItems: 100,
        currentPage: 10,
      });

    assert.notOk(component.shouldShowUpperBreak);

    component.set('currentPage', 1);
    assert.notOk(component.shouldShowUpperBreak);

    component.set('pageRange', 3);
    assert.ok(component.shouldShowUpperBreak);
  });
});
