import SharedBox from '../src/sharedbox.js';
let expect = require('chai').expect;
let wholeRecipientJSON = require('../JSON/Recipient.json');

export default describe('Recipient', () => {


  describe('.constructor', () => {
    it('create recipient without input', () => {
      let recipientTest = new SharedBox.Helpers.Recipient();
      expect(recipientTest).to.be.an.instanceof(SharedBox.Helpers.Recipient);
      expect(recipientTest.firstName).to.eql(null);
      expect(recipientTest.lastName).to.eql(null);
      expect(recipientTest.email).to.eql(null);
      expect(recipientTest.options).to.be.an.instanceof(SharedBox.Helpers.Options);
      expect(recipientTest.options.locked).to.eql(null);
      expect(recipientTest.options.bouncedEmail).to.eql(null);
      expect(recipientTest.options.verified).to.eql(null);
      expect(recipientTest.options.contactMethods).to.eql([]);
    });

    it('creates a recipient from the input', () => {
      let emptyRecipient = new SharedBox.Helpers.Recipient();
      expect(emptyRecipient).to.deep.equal({ email: null, firstName: null, lastName: null});
      let wholeRecipient = new SharedBox.Helpers.Recipient(wholeRecipientJSON);
      expect(wholeRecipient).to.be.an.instanceof(SharedBox.Helpers.Recipient);
      expect(wholeRecipient.email).to.equal('john.doe@email.com');
      expect(wholeRecipient.firstName).to.equal('John');
      expect(wholeRecipient.lastName).to.equal('Doe');
      expect(wholeRecipient.id).to.equal('59adbccb-87cc-4224-bfd7-314dae796e48');
      expect(wholeRecipient.options).to.be.an.instanceof(SharedBox.Helpers.Options);
      expect(wholeRecipient.options.locked).to.equal(false);
      expect(wholeRecipient.options.bouncedEmail).to.equal(false);
      expect(wholeRecipient.options.verified).to.equal(false);
      expect(wholeRecipient.options.contactMethods[0]).to.be.an.instanceof(SharedBox.Helpers.ContactMethod);
      expect(wholeRecipient.options.contactMethods[0].id).to.equal(1);
      expect(wholeRecipient.options.contactMethods[0].destination).to.equal('+55555555555');
      expect(wholeRecipient.options.contactMethods[0].verified).to.equal(false);
      expect(wholeRecipient.options.contactMethods[0].createdAt).to.equal('2018-09-01T16:26:07-04:00');
      expect(wholeRecipient.options.contactMethods[0].updatedAt).to.equal('2018-09-01T16:26:07-04:00');
      expect(wholeRecipient.options.contactMethods[1]).to.be.an.instanceof(SharedBox.Helpers.ContactMethod);
      expect(wholeRecipient.options.contactMethods[1].id).to.equal(2);
      expect(wholeRecipient.options.contactMethods[1].destination).to.equal('+1111111111');
      expect(wholeRecipient.options.contactMethods[1].verified).to.equal(true);
      expect(wholeRecipient.options.contactMethods[1].createdAt).to.equal('2018-09-01T16:26:07-04:00');
      expect(wholeRecipient.options.contactMethods[1].updatedAt).to.equal('2018-09-01T16:26:07-04:00');
    });

  });

  describe('.toJson', () => {
    it('returns stringified recipient', () => {
      let recipient = new SharedBox.Helpers.Recipient({foo : 'bar'});
      expect(recipient.toJson()).to.equal('{"recipient":{"email":null,"firstName":null,"lastName":null,"contactMethods":[]}}');
      let wholeRecipient = new SharedBox.Helpers.Recipient({
        'id': '59adbccb-87cc-4224-bfd7-314dae796e48',
        'firstName': 'John',
        'lastName': 'Doe',
        'email': 'john.doe@email.com',
        'options': {
          'locked': false,
          'bouncedEmail': false,
          'verified': false,
          'contactMethods': [
            {
              'id': 1,
              'destination': '+55555555555',
              'destinationType': 'office_phone',
              'verified': false,
              'createdAt': '2018-09-01T16:26:07-04:00',
              'updatedAt': '2018-09-01T16:26:07-04:00'
            },
            {
              'id': 2,
              'destination': '+1111111111',
              'destinationType': 'cell_phone',
              'verified': true,
              'createdAt': '2018-09-01T16:26:07-04:00',
              'updatedAt': '2018-09-01T16:26:07-04:00'
            }
          ]
        }}
      );
      expect(wholeRecipient.toJson()).to.equal('{"recipient":{"email":"john.doe@email.com","firstName":"John","lastName":"Doe","contactMethods":[{"destinationType":"office_phone","destination":"+55555555555"},{"destinationType":"cell_phone","destination":"+1111111111"}]}}');
    });
  });
});
