import generateConfig from 'dummy/utils/generate-config';
import { module, test } from 'qunit';

module('Unit | Utility | generateConfig', function () {

  test('it works with sensible defaults', function (assert) {
    let config = generateConfig();

    assert.ok(config);
    assert.deepEqual(config, {
      activePage: 1,
      firstPage: 1,
      lastPage: 7,
      nextPage: 2,
      perPage: 10,
      previousPage: null,
      totalRecords: 70,
    });
  });

  test(`it's possible to manipulate the generated config through properties`, function (assert) {
    let config = generateConfig({
      activePage: 2,
      perPage: 5,
      totalRecords: 50,
    });

    assert.ok(config);
    assert.deepEqual(config, {
      activePage: 2,
      firstPage: 1,
      lastPage: 10,
      nextPage: 3,
      perPage: 5,
      previousPage: 1,
      totalRecords: 50,
    });
  });
});
