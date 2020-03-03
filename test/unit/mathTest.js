const assert = require('assert');

describe('Math in JS', () => {
  it('should support +', done => {
    setTimeout(() => {
      assert.equal(1 + 1, 2);
      done();
    }, 100);
  });
});
