import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bgr-pagination', 'Integration | Component | bgr pagination', {
  integration: true
});

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

test('it renders a basic pagination config', function(assert) {
  this.set('config', generateConfig());

  this.render(hbs `{{bgr-pagination config=config}}`);

  const $item = this.$(ITEM_CLASS);

  assert.equal($item.eq(0).find(DISABLED_CLASS).text(), '<<');
  assert.equal($item.eq(1).find(DISABLED_CLASS).text(), '<');
  assert.equal($item.eq(2).find(LINK_CLASS).text(), 1);
  assert.equal($item.eq(3).find(LINK_CLASS).text(), 2);
  assert.equal($item.eq(4).find(LINK_CLASS).text(), 3);
  assert.equal($item.eq(5).find(LINK_CLASS).text(), 4);
  assert.equal($item.eq(6).find(LINK_CLASS).text(), 5);
  assert.equal($item.eq(7).find(LINK_CLASS).text(), 6);
  assert.equal($item.eq(8).find(LINK_CLASS).text(), 7);
  assert.equal($item.eq(9).find(LINK_CLASS).text(), '>');
  assert.equal($item.eq(10).find(LINK_CLASS).text(), '>>');
});

test('it renders the correct content for each link', function(assert) {
  this.set('config', generateConfig({ activePage: 4 }));

  this.render(hbs `{{bgr-pagination
    config=config
    firstPageContent="first"
    lastPageContent="last"
    nextPageContent="next"
    previousPageContent="previous"
    visiblePages=3
  }}`);

  const $item = this.$(ITEM_CLASS);

  assert.equal($item.eq(0).find(LINK_CLASS).text(), 'first');
  assert.equal($item.eq(1).find(LINK_CLASS).text(), 'previous');
  assert.equal($item.eq(2).find(LINK_CLASS).text(), 3);
  assert.equal($item.eq(3).find(LINK_CLASS).text(), 4);
  assert.equal($item.eq(4).find(LINK_CLASS).text(), 5);
  assert.equal($item.eq(5).find(LINK_CLASS).text(), 'next');
  assert.equal($item.eq(6).find(LINK_CLASS).text(), 'last');
});

test('it renders the correct disabled links', function(assert) {
  this.set('config', generateConfig({ activePage: 7 }));

  this.render(hbs `{{bgr-pagination config=config visiblePages=3}}`);

  const $item = this.$(ITEM_CLASS);

  assert.equal($item.eq(0).find(LINK_CLASS).text(), '<<');
  assert.equal($item.eq(1).find(LINK_CLASS).text(), '<');
  assert.equal($item.eq(2).find(LINK_CLASS).text(), 5);
  assert.equal($item.eq(3).find(LINK_CLASS).text(), 6);
  assert.equal($item.eq(4).find(LINK_CLASS).text(), 7);
  assert.equal($item.eq(5).find(DISABLED_CLASS).text(), '>');
  assert.equal($item.eq(6).find(DISABLED_CLASS).text(), '>>');
});
