import SharedBox from '../src/sharedbox.js';
// import _map from 'lodash/map';
// import _partial from 'lodash/partial';
let expect = require('chai').expect;
let sharedboxJSON = require('../JSON/Sharedbox.json');


export default describe('SharedboxSpec', () => {
  
  beforeEach(() => {
  });

  describe('.constructor', () => {
    it('create sharedbox with null attributs', () => {
      let sharedboxTest = new SharedBox.Helpers.Sharedbox();
      expect(sharedboxTest).to.be.an.instanceof(SharedBox.Helpers.Sharedbox);
      expect(sharedboxTest).to.eql({
        'userEmail': null,
        'guid': null,
        'uploadUrl': null,
        'message': null,
        'subject': null,
        'notificationLanguage': null,
        'securityOptions': {
          'expirationValue': null,
          'expirationUnit': null,
          'retentionPeriodType': null,
          'retentionPeriodValue': null,
          'retentionPeriodUnit': null,
        },
        'expiration': null
      });
      
    });
    it('create sharedbox with attributs', () => {
      let sharedboxTest = new SharedBox.Helpers.Sharedbox(sharedboxJSON);
      expect(sharedboxTest).to.be.an.instanceof(SharedBox.Helpers.Sharedbox);
      expect(sharedboxTest.userEmail).to.eql('user@acme.com');
      expect(sharedboxTest.guid).to.eql('1c820789a50747df8746aa5d71922a3f');
      expect(sharedboxTest.uploadUrl).to.eql('upload_url');
      expect(sharedboxTest.recipients).to.eql([]);
      expect(sharedboxTest.attachments).to.eql([]);
      expect(sharedboxTest.message).to.eql('lorem ipsum...');
      expect(sharedboxTest.subject).to.eql('Donec rutrum congue leo eget malesuada.');
      expect(sharedboxTest.notificationLanguage).to.eql('en');
      expect(sharedboxTest.securityOptions).to.be.an.instanceof(SharedBox.Helpers.SecurityOptions);
      expect(sharedboxTest.securityOptions.allowRememberMe).to.eql(true);
      expect(sharedboxTest.securityOptions.allowSms).to.eql(true);
      expect(sharedboxTest.securityOptions.allowVoice).to.eql(true);
      expect(sharedboxTest.securityOptions.allowEmail).to.eql(true);
      expect(sharedboxTest.securityOptions.expirationValue).to.eql(5);
      expect(sharedboxTest.securityOptions.expirationUnit).to.eql('days');
      expect(sharedboxTest.securityOptions.retentionPeriodType).to.eql('do_not_discard');
      expect(sharedboxTest.securityOptions.retentionPeriodValue).to.eql(null);
      expect(sharedboxTest.securityOptions.retentionPeriodUnit).to.eql('hours');
      expect(sharedboxTest.userId).to.eql(1);
      expect(sharedboxTest.status).to.eql('in_progress');
      expect(sharedboxTest.previewUrl).to.eql('http://sharedbox.com/sharedboxes/dhjewg67ewtfg476/preview');
      expect(sharedboxTest.createdAt).to.eql('2018-05-24T14:45:35.062Z');
      expect(sharedboxTest.updatedAt).to.eql('2018-05-24T14:45:35.589Z');
      expect(sharedboxTest.expiration).to.eql('2018-05-31T14:45:35.038Z');
      expect(sharedboxTest.closedAt).to.eql(null);
    });
  });

  describe('.toJson', () => {  
    it('convert sharedbox to Json format', () => {
      let sharedboxTest = new SharedBox.Helpers.Sharedbox(sharedboxJSON);
      let sharedboxToJson = sharedboxTest.toJson();
      expect(sharedboxToJson).to.be.a('string');
      expect(sharedboxToJson).to.eql('{"sharedbox":{"guid":"1c820789a50747df8746aa5d71922a3f","userEmail":"user@acme.com","uploadUrl":"upload_url","subject":"Donec rutrum congue leo eget malesuada.","message":"lorem ipsum...","recipients":[],"documentIds":[],"expirationValue":5,"expirationUnit":"days","retentionPeriodType":"do_not_discard","retentionPeriodValue":null,"retentionPeriodUnit":"hours","notificationLanguage":"en"}}');      
    });
  });

  // describe('.set', () => {
  //   it('add recipient to sharedbox', () => {
  //     let sharedboxTest = new SharedBox.Helpers.Sharedbox(sharedboxJSON);
  //     sharedboxTest.recipients = new Recipient();
  //     expect(sharedboxTest).to.have.property('recipients').with.lengthOf(1);
  //   });
  // });
});