import generateConfig from 'bgr-ember-pagination/utils/generate-config';
import { module, test } from 'qunit';

module('Unit | Utility | generateConfig', function () {
  test('it generates a default config', function (assert) {
    let config = generateConfig();

    assert.propEqual(config, {
      activePage: 1,
      firstPage: 1,
      lastPage: 7,
      nextPage: 2,
      perPage: 10,
      previousPage: null,
      totalRecords: 70,
    });
  });

  test('it takes custom parameters into account', function (assert) {
    let config = generateConfig({
      activePage: 2,
      perPage: 5,
      totalRecords: 50,
    });

    assert.propEqual(config, {
      activePage: 2,
      firstPage: 1,
      lastPage: 10,
      nextPage: 3,
      perPage: 5,
      previousPage: 1,
      totalRecords: 50,
    });
  });

  test('it parses string parameters as integers', function (assert) {
    let config = generateConfig({
      activePage: '1',
      perPage: '10',
      totalRecords: '70',
    });

    assert.propEqual(config, {
      activePage: 1,
      firstPage: 1,
      lastPage: 7,
      nextPage: 2,
      perPage: 10,
      previousPage: null,
      totalRecords: 70,
    });
  });
});
