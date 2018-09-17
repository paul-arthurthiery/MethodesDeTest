import SharedBox from '../src/sharedbox.js';
import _map from 'lodash/map';
import _partial from 'lodash/partial';
let expect = require('chai').expect;

export default describe('BaseHelper', () => {
  let baseHelper;

  beforeEach(() => {
    baseHelper = new SharedBox.Helpers.BaseHelper();
  });

  describe('.property', () => {
    it('returns value if property exists, null otherwise', () => {
      expect(baseHelper.property({ foo: 'bar' }, 'foo').orNull()).to.equal('bar');
      expect(baseHelper.property({ foo: 'bar' }, 'baz').orNull()).to.be.null;
      expect(
        baseHelper.property({ foo: ['bar', 'baz'] }, 'foo')
          .using(_partial(_map, _partial.placeholder, v => v.toUpperCase()))
          .orDefault([])
      ).to.deep.equal(['BAR', 'BAZ']);
      expect(
        baseHelper.property({ foo: ['bar', 'baz'] }, 'bar')
          .using(_partial(_map, _partial.placeholder, v => v.toUpperCase()))
          .orDefault([])
      ).to.deep.equal([]);
    });
  });
});
