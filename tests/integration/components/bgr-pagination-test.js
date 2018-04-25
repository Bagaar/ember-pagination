import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function generateConfig({
  activePage = 1,
  perPage = 10,
  totalRecords = 70,
} = {}) {
  const firstPage = 1;
  const lastPage = Math.ceil(totalRecords / perPage);

  return {
    activePage,
    firstPage,
    lastPage,
    nextPage: activePage < lastPage ? Math.max(activePage + 1, firstPage) : null,
    perPage,
    previousPage: activePage > firstPage ? Math.min(activePage - 1, lastPage) : null,
    totalRecords,
  };
}

const DISABLED_CLASS = '.pagination__disabled';
const ITEM_CLASS = '.pagination__item';
const LINK_CLASS = '.pagination__link';

module('Integration | Component | bgr-pagination', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a basic pagination config', async function (assert) {
    this.set('config', generateConfig());

    await render(hbs `{{bgr-pagination config=config}}`);

    const items = this.element.querySelectorAll(ITEM_CLASS);

    assert.equal(items[0].querySelector(DISABLED_CLASS).textContent.trim(), '<<');
    assert.equal(items[1].querySelector(DISABLED_CLASS).textContent.trim(), '<');
    assert.equal(items[2].querySelector(LINK_CLASS).textContent.trim(), 1);
    assert.equal(items[3].querySelector(LINK_CLASS).textContent.trim(), 2);
    assert.equal(items[4].querySelector(LINK_CLASS).textContent.trim(), 3);
    assert.equal(items[5].querySelector(LINK_CLASS).textContent.trim(), 4);
    assert.equal(items[6].querySelector(LINK_CLASS).textContent.trim(), 5);
    assert.equal(items[7].querySelector(LINK_CLASS).textContent.trim(), 6);
    assert.equal(items[8].querySelector(LINK_CLASS).textContent.trim(), 7);
    assert.equal(items[9].querySelector(LINK_CLASS).textContent.trim(), '>');
    assert.equal(items[10].querySelector(LINK_CLASS).textContent.trim(), '>>');
  });

  test('it renders the correct content for each link', async function (assert) {
    this.set('config', generateConfig({ activePage: 4 }));

    await render(hbs `{{bgr-pagination
      config=config
      firstPageContent="first"
      lastPageContent="last"
      nextPageContent="next"
      previousPageContent="previous"
      visiblePages=3
    }}`);

    const items = this.element.querySelectorAll(ITEM_CLASS);

    assert.equal(items[0].querySelector(LINK_CLASS).textContent.trim(), 'first');
    assert.equal(items[1].querySelector(LINK_CLASS).textContent.trim(), 'previous');
    assert.equal(items[2].querySelector(LINK_CLASS).textContent.trim(), 3);
    assert.equal(items[3].querySelector(LINK_CLASS).textContent.trim(), 4);
    assert.equal(items[4].querySelector(LINK_CLASS).textContent.trim(), 5);
    assert.equal(items[5].querySelector(LINK_CLASS).textContent.trim(), 'next');
    assert.equal(items[6].querySelector(LINK_CLASS).textContent.trim(), 'last');
  });

  test('it renders the correct disabled links', async function (assert) {
    this.set('config', generateConfig({ activePage: 7 }));

    await render(hbs `{{bgr-pagination config=config visiblePages=3}}`);

    const items = this.element.querySelectorAll(ITEM_CLASS);

    assert.equal(items[0].querySelector(LINK_CLASS).textContent.trim(), '<<');
    assert.equal(items[1].querySelector(LINK_CLASS).textContent.trim(), '<');
    assert.equal(items[2].querySelector(LINK_CLASS).textContent.trim(), 5);
    assert.equal(items[3].querySelector(LINK_CLASS).textContent.trim(), 6);
    assert.equal(items[4].querySelector(LINK_CLASS).textContent.trim(), 7);
    assert.equal(items[5].querySelector(DISABLED_CLASS).textContent.trim(), '>');
    assert.equal(items[6].querySelector(DISABLED_CLASS).textContent.trim(), '>>');
  });
});
