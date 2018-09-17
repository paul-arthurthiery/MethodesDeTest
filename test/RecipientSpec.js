import SharedBox from '../src/sharedbox.js';
//import _map from 'lodash/map';
//import _partial from 'lodash/partial';
let expect = require('chai').expect;

export default describe('Recipient', () => {


  describe('.constructor', () => {
    it('creates a recipient from the input', () => {
      let recipient = SharedBox.Helpers.Recipient;
      expect(new recipient({ foo: 'bar' })).to.deep.equal({ email: null, firstName: null, lastName: null});
      expect(new recipient({ email: 'a@a.com', firstName: 'John', lastName: 'Appleseed'})).to.deep.equal({ email: 'a@a.com', firstName: 'John', lastName: 'Appleseed'});
    });

  });


  describe('.options', () => {
    it('sets and gets options in the recipient\'s map', () => {
      let recipient = new SharedBox.Helpers.Recipient({foo : 'bar'});
      expect(recipient.options).to.deep.equal({locked: null});
      expect(recipient.options = {locked: true}).to.deep.equal({locked: true});
    });
  });

  describe('.id', () => {
    it('sets and gets id in the recipient\'s map', () => {
      let recipient = new SharedBox.Helpers.Recipient({foo : 'bar'});
      expect(recipient.id).to.be.null;
      recipient = new SharedBox.Helpers.Recipient({id : 5});
      expect(recipient.id).to.equal(5);
    });
  });

  describe('.toJson', () => {
    it('returns stringified recipient', () => {
      let recipient = new SharedBox.Helpers.Recipient({foo : 'bar'});
      expect(recipient.toJson()).to.equal('{"recipient":{"email":null,"firstName":null,"lastName":null,"contactMethods":[]}}');
    });
  });
});
