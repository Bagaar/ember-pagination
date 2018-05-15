import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import generateConfig from 'bgr-ember-pagination/utils/generate-config';

const BASE_CLASS = '.pagination';
const BREAK_CLASS = `${BASE_CLASS}__break`;
const DISABLED_CLASS = `${BASE_CLASS}__disabled`;
const ITEM_CLASS = `${BASE_CLASS}__item`;
const LINK_CLASS = `${BASE_CLASS}__link`;

const BREAK_LABEL = '...';
const NEXT_PAGE_LABEL = '>';
const PREVIOUS_PAGE_LABEL = '<';

module('Integration | Component | bgr-pagination', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders all page numbers when the total amount of pages is not high enough', async function (assert) {
    this.set('config', generateConfig());

    await render(hbs `{{bgr-pagination config=config}}`);

    const items = this.element.querySelectorAll(ITEM_CLASS);

    assert.equal(items[0].querySelector(DISABLED_CLASS).textContent.trim(), PREVIOUS_PAGE_LABEL);
    assert.equal(items[1].querySelector(LINK_CLASS).textContent.trim(), 1);
    assert.equal(items[2].querySelector(LINK_CLASS).textContent.trim(), 2);
    assert.equal(items[3].querySelector(LINK_CLASS).textContent.trim(), 3);
    assert.equal(items[4].querySelector(LINK_CLASS).textContent.trim(), 4);
    assert.equal(items[5].querySelector(LINK_CLASS).textContent.trim(), 5);
    assert.equal(items[6].querySelector(LINK_CLASS).textContent.trim(), 6);
    assert.equal(items[7].querySelector(LINK_CLASS).textContent.trim(), 7);
    assert.equal(items[8].querySelector(LINK_CLASS).textContent.trim(), NEXT_PAGE_LABEL);
  });

  test('it renders an upper break when the total amount of pages is too high', async function (assert) {
    this.set('config', generateConfig({ totalRecords: 80 }));

    await render(hbs `{{bgr-pagination config=config}}`);

    const items = this.element.querySelectorAll(ITEM_CLASS);

    assert.equal(items[0].querySelector(DISABLED_CLASS).textContent.trim(), PREVIOUS_PAGE_LABEL);
    assert.equal(items[1].querySelector(LINK_CLASS).textContent.trim(), 1);
    assert.equal(items[2].querySelector(LINK_CLASS).textContent.trim(), 2);
    assert.equal(items[3].querySelector(LINK_CLASS).textContent.trim(), 3);
    assert.equal(items[4].querySelector(LINK_CLASS).textContent.trim(), 4);
    assert.equal(items[5].querySelector(LINK_CLASS).textContent.trim(), 5);
    assert.equal(items[6].querySelector(LINK_CLASS).textContent.trim(), 6);
    assert.equal(items[7].querySelector(BREAK_CLASS).textContent.trim(), BREAK_LABEL);
    assert.equal(items[8].querySelector(LINK_CLASS).textContent.trim(), 8);
    assert.equal(items[9].querySelector(LINK_CLASS).textContent.trim(), NEXT_PAGE_LABEL);
  });

  test('it renders a lower break when the total amount of pages is too high', async function (assert) {
    this.set('config', generateConfig({ activePage: 8, totalRecords: 80 }));

    await render(hbs `{{bgr-pagination config=config}}`);

    const items = this.element.querySelectorAll(ITEM_CLASS);

    assert.equal(items[0].querySelector(LINK_CLASS).textContent.trim(), PREVIOUS_PAGE_LABEL);
    assert.equal(items[1].querySelector(LINK_CLASS).textContent.trim(), 1);
    assert.equal(items[2].querySelector(BREAK_CLASS).textContent.trim(), BREAK_LABEL);
    assert.equal(items[3].querySelector(LINK_CLASS).textContent.trim(), 3);
    assert.equal(items[4].querySelector(LINK_CLASS).textContent.trim(), 4);
    assert.equal(items[5].querySelector(LINK_CLASS).textContent.trim(), 5);
    assert.equal(items[6].querySelector(LINK_CLASS).textContent.trim(), 6);
    assert.equal(items[7].querySelector(LINK_CLASS).textContent.trim(), 7);
    assert.equal(items[8].querySelector(LINK_CLASS).textContent.trim(), 8);
    assert.equal(items[9].querySelector(DISABLED_CLASS).textContent.trim(), NEXT_PAGE_LABEL);
  });

  test('it renders both a lower and an upper break when the total amount of pages is too high', async function (assert) {
    this.set('config', generateConfig({ activePage: 5, totalRecords: 90 }));

    await render(hbs `{{bgr-pagination config=config}}`);

    const items = this.element.querySelectorAll(ITEM_CLASS);

    assert.equal(items[0].querySelector(LINK_CLASS).textContent.trim(), PREVIOUS_PAGE_LABEL);
    assert.equal(items[1].querySelector(LINK_CLASS).textContent.trim(), 1);
    assert.equal(items[2].querySelector(BREAK_CLASS).textContent.trim(), BREAK_LABEL);
    assert.equal(items[3].querySelector(LINK_CLASS).textContent.trim(), 3);
    assert.equal(items[4].querySelector(LINK_CLASS).textContent.trim(), 4);
    assert.equal(items[5].querySelector(LINK_CLASS).textContent.trim(), 5);
    assert.equal(items[6].querySelector(LINK_CLASS).textContent.trim(), 6);
    assert.equal(items[7].querySelector(LINK_CLASS).textContent.trim(), 7);
    assert.equal(items[8].querySelector(BREAK_CLASS).textContent.trim(), BREAK_LABEL);
    assert.equal(items[9].querySelector(LINK_CLASS).textContent.trim(), 9);
    assert.equal(items[10].querySelector(LINK_CLASS).textContent.trim(), NEXT_PAGE_LABEL);
  });

  test(`it renders the correct amount of page numbers based on 'pageRangeDisplayed'`, async function (assert) {
    this.set('config', generateConfig({ activePage: 4, totalRecords: 70 }));

    await render(hbs `{{bgr-pagination config=config pageRangeDisplayed=3}}`);

    const items = this.element.querySelectorAll(ITEM_CLASS);

    assert.equal(items[0].querySelector(LINK_CLASS).textContent.trim(), PREVIOUS_PAGE_LABEL);
    assert.equal(items[1].querySelector(LINK_CLASS).textContent.trim(), 1);
    assert.equal(items[2].querySelector(BREAK_CLASS).textContent.trim(), BREAK_LABEL);
    assert.equal(items[3].querySelector(LINK_CLASS).textContent.trim(), 3);
    assert.equal(items[4].querySelector(LINK_CLASS).textContent.trim(), 4);
    assert.equal(items[5].querySelector(LINK_CLASS).textContent.trim(), 5);
    assert.equal(items[6].querySelector(BREAK_CLASS).textContent.trim(), BREAK_LABEL);
    assert.equal(items[7].querySelector(LINK_CLASS).textContent.trim(), 7);
    assert.equal(items[8].querySelector(LINK_CLASS).textContent.trim(), NEXT_PAGE_LABEL);
  });

  test(`it renders all page numbers when 'pageRangeDisplayed' is falsy`, async function (assert) {
    this.set('config', generateConfig({ totalRecords: 40 }));

    await render(hbs `{{bgr-pagination config=config pageRangeDisplayed=null}}`);

    const items = this.element.querySelectorAll(ITEM_CLASS);

    assert.equal(items[0].querySelector(DISABLED_CLASS).textContent.trim(), PREVIOUS_PAGE_LABEL);
    assert.equal(items[1].querySelector(LINK_CLASS).textContent.trim(), 1);
    assert.equal(items[2].querySelector(LINK_CLASS).textContent.trim(), 2);
    assert.equal(items[3].querySelector(LINK_CLASS).textContent.trim(), 3);
    assert.equal(items[4].querySelector(LINK_CLASS).textContent.trim(), 4);
    assert.equal(items[5].querySelector(LINK_CLASS).textContent.trim(), NEXT_PAGE_LABEL);
  });

  test('it renders the correct labels', async function (assert) {
    const config = generateConfig({ activePage: 5, totalRecords: 90 });

    const breakLabel = 'break';
    const nextPageLabel = 'next';
    const previousPageLabel = 'previous';

    this.setProperties({
      config,
      breakLabel,
      nextPageLabel,
      previousPageLabel,
    });

    await render(hbs `{{bgr-pagination
      config=config
      breakLabel=breakLabel
      nextPageLabel=nextPageLabel
      previousPageLabel=previousPageLabel
    }}`);

    const items = this.element.querySelectorAll(ITEM_CLASS);

    assert.equal(items[0].querySelector(LINK_CLASS).textContent.trim(), previousPageLabel);
    assert.equal(items[1].querySelector(LINK_CLASS).textContent.trim(), 1);
    assert.equal(items[2].querySelector(BREAK_CLASS).textContent.trim(), breakLabel);
    assert.equal(items[3].querySelector(LINK_CLASS).textContent.trim(), 3);
    assert.equal(items[4].querySelector(LINK_CLASS).textContent.trim(), 4);
    assert.equal(items[5].querySelector(LINK_CLASS).textContent.trim(), 5);
    assert.equal(items[6].querySelector(LINK_CLASS).textContent.trim(), 6);
    assert.equal(items[7].querySelector(LINK_CLASS).textContent.trim(), 7);
    assert.equal(items[8].querySelector(BREAK_CLASS).textContent.trim(), breakLabel);
    assert.equal(items[9].querySelector(LINK_CLASS).textContent.trim(), 9);
    assert.equal(items[10].querySelector(LINK_CLASS).textContent.trim(), nextPageLabel);
  });

  test('it renders no pagination when the total amount of pages is 1 or 0', async function (assert) {
    this.set('config', generateConfig({ totalRecords: 10 }));

    await render(hbs `{{bgr-pagination config=config}}`);

    assert.equal(this.element.querySelector(BASE_CLASS), null);
  });

  test('it renders the correct classes', async function (assert) {
    const config = generateConfig({ totalRecords: 80 });

    const baseClass = 'baseClass';
    const breakClass = 'breakClass';
    const disabledClass = 'disabledClass';
    const itemClass = 'itemClass';
    const linkClass = 'linkClass';

    this.setProperties({
      config,
      baseClass,
      breakClass,
      disabledClass,
      itemClass,
      linkClass,
    });

    await render(hbs `{{bgr-pagination
      config=config
      baseClass=baseClass
      breakClass=breakClass
      disabledClass=disabledClass
      itemClass=itemClass
      linkClass=linkClass
    }}`);

    const items = this.element.querySelectorAll(`.${itemClass}`);

    assert.ok(this.element.querySelector(`.${baseClass}`));
    assert.equal(items[0].querySelector(`.${disabledClass}`).textContent.trim(), PREVIOUS_PAGE_LABEL);
    assert.equal(items[1].querySelector(`.${linkClass}`).textContent.trim(), 1);
    assert.equal(items[2].querySelector(`.${linkClass}`).textContent.trim(), 2);
    assert.equal(items[3].querySelector(`.${linkClass}`).textContent.trim(), 3);
    assert.equal(items[4].querySelector(`.${linkClass}`).textContent.trim(), 4);
    assert.equal(items[5].querySelector(`.${linkClass}`).textContent.trim(), 5);
    assert.equal(items[6].querySelector(`.${linkClass}`).textContent.trim(), 6);
    assert.equal(items[7].querySelector(`.${breakClass}`).textContent.trim(), BREAK_LABEL);
    assert.equal(items[8].querySelector(`.${linkClass}`).textContent.trim(), 8);
    assert.equal(items[9].querySelector(`.${linkClass}`).textContent.trim(), NEXT_PAGE_LABEL);
  });
});
