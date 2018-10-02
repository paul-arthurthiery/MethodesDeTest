import SharedBox from '../src/sharedbox.js';
import * as Utils from '../src/Utils/platform.js';
let sinonChai = require('sinon-chai');
let chai = require('chai');
let expect = require('chai').expect;
let sinon = require('sinon');
let fetch = Utils.fetch;
chai.use(sinonChai);
import * as recipientToAdd from '../JSON/Recipient.json';

const jsonClient = new SharedBox.JsonClient('apiToken', '1', 'endpoint', false);
const client = new SharedBox.Client('apiToken', '1', 'endpoint', false, jsonClient);

export default describe('Client', () => {
  let fetchStub;
  let initializeSharedBoxStub;
  let submitSharedBoxStub;
  let addRecipientStub;
  let closeSharedBoxStub;
  let Response = fetch.Response;
  let fakePromise = (promiseHelper) => {
    return new Promise((resolve, reject) => {
      promiseHelper(resolve, reject);
    });
  };
  recipientToAdd = new SharedBox.Helpers.Recipient(recipientToAdd);
  let sharedBoxToInit ={
    'userEmail': 'user@acme.com',
    'recipients': [/* list of Recipient objects*/],
    'attachments': [/*list of Attachment objects*/],
    'message': 'lorem ipsum...',
    'subject': 'Donec rutrum congue leo eget malesuada.',
    'notificationLanguage': 'en',
    'securityOptions': {
      'allowRememberMe': true,
      'allowSms': true,
      'allowVoice': true,
      'allowEmail': true,
      'expirationValue': 5,
      'expirationUnit': 'days',
      'retentionPeriodType': 'do_not_discard',
      'retentionPeriodValue': null,
      'retentionPeriodUnit': 'hours',
      'allowManualClose': true
    },
    'userId': 1,
    'status': 'in_progress',
    'previewUrl': 'http://sharedbox.com/sharedboxes/dhjewg67ewtfg476/preview',
    'createdAt': '2018-05-24T14:45:35.062Z',
    'updatedAt': '2018-05-24T14:45:35.589Z',
    'expiration': '2018-05-31T14:45:35.038Z',
    'closedAt': null
  };
  let sharedBoxToSubmit = new SharedBox.Helpers.Sharedbox({
    'userEmail': 'user@acme.com',
    'recipients': [],
    'attachments': [],
    'message': 'lorem ipsum...',
    'subject': 'Donec rutrum congue leo eget malesuada.',
    'notificationLanguage': 'en',
    'securityOptions':
     { 'allowRememberMe': true,
       'allowSms': true,
       'allowVoice': true,
       'allowEmail': true,
       'expirationValue': 5,
       'expirationUnit': 'days',
       'retentionPeriodType': 'do_not_discard',
       'retentionPeriodValue': null,
       'retentionPeriodUnit': 'hours',
       'allowManualClose': true },
    'userId': 1,
    'guid': '1c820789a50747df8746aa5d71922a3f',
    'uploadUrl': 'upload_url',
    'status': 'in_progress',
    'previewUrl': 'http://sharedbox.com/sharedboxes/dhjewg67ewtfg476/preview',
    'createdAt': '2018-05-24T14:45:35.062Z',
    'updatedAt': '2018-05-24T14:45:35.589Z',
    'expiration': '2018-05-31T14:45:35.038Z',
    'closedAt': null
  });
  // let submitSharedBoxResponse = {
  //   'guid': '1c820789a50747df8746aa5d71922a3f',
  //   'userId': 3,
  //   'subject': 'Donec rutrum congue leo eget malesuada.',
  //   'expiration': '2018-12-06T05:38:09.951Z',
  //   'notificationLanguage': 'en',
  //   'status': 'in_progress',
  //   'allowRememberMe': false,
  //   'allowSms': false,
  //   'allowVoice': false,
  //   'allowEmail': true,
  //   'retentionPeriodType': 'discard_at_expiration',
  //   'retentionPeriodValue': null,
  //   'retentionPeriodUnit': null,
  //   'previewUrl': 'http://sharedbox.com/sharedboxes/dhjewg67ewtfg476/preview',
  //   'createdAt': '2018-12-05T22:38:09.965Z',
  //   'updatedAt': '2018-12-05T22:38:09.965Z'
  // };

  beforeEach(() => {
    fetchStub = sinon.stub(Utils, 'fetch');

  });

  afterEach(() => {
    Utils.fetch.restore();
  });

  describe('initializeSharedbox', () => {

    before(() => {
      initializeSharedBoxStub = sinon.stub(jsonClient, 'initializeSharedBox');
    });

    after(() => {
      jsonClient.initializeSharedBox.restore();
    });


    sharedBoxToInit = new SharedBox.Helpers.Sharedbox(sharedBoxToInit);
    sharedBoxToSubmit = new SharedBox.Helpers.Sharedbox(sharedBoxToSubmit);
    it('returns a proper initialized Sharedbox with guid and upload_url', () => {
      fetchStub.onFirstCall().returns(fakePromise(r => r(new Response('someEndpoint/'))));
      fetchStub.onSecondCall().returns(fakePromise(r => r(new Response('{"guid": "1c820789a50747df8746aa5d71922a3f","uploadUrl": "upload_url"}'))));
      initializeSharedBoxStub.returns(fakePromise(r => r(new Response(sharedBoxToSubmit))));
      client.initializeSharedBox(sharedBoxToInit).then(res => {
        expect(res).to.deep.equal(sharedBoxToSubmit);
      });
    });
  });

  describe('submitSharedBox', () => {

    before(() => {
      submitSharedBoxStub = sinon.stub(jsonClient, 'submitSharedBox');
    });

    after(() => {
      jsonClient.submitSharedBox.restore();
    });

    it('submits the SharedBox and returns the proper success message', () => {
      fetchStub.onFirstCall().returns(fakePromise(r => r(new Response('someEndpoint/'))));
      fetchStub.onSecondCall().returns(fakePromise(r => r(new Response(JSON.stringify(sharedBoxToSubmit)))));
      submitSharedBoxStub.returns(fakePromise(r => r(new Response(sharedBoxToSubmit))));
      client.submitSharedBox(sharedBoxToSubmit).then(res => {
        expect(res.userEmail).to.eql(sharedBoxToSubmit.userEmail);
        expect(res.message).to.eql(sharedBoxToSubmit.message);
        expect(res.subject).to.eql(sharedBoxToSubmit.subject);
        expect(res.notificationLanguage).to.eql(sharedBoxToSubmit.notificationLanguage);
        expect(res.userId).to.eql(sharedBoxToSubmit.userId);
        expect(res.guid).to.eql(sharedBoxToSubmit.guid);
        expect(res.uploadUrl).to.eql(sharedBoxToSubmit.uploadUrl);
        expect(res.status).to.eql(sharedBoxToSubmit.status);
        expect(res.previewUrl).to.eql(sharedBoxToSubmit.previewUrl);
        expect(res.createdAt).to.eql(sharedBoxToSubmit.createdAt);
        expect(res.updatedAt).to.eql(sharedBoxToSubmit.updatedAt);
        expect(res.expiration).to.eql(sharedBoxToSubmit.expiration);
        expect(res.closedAt).to.eql(sharedBoxToSubmit.closedAt);
      });
    });
  });

  describe('addRecipient', () => {

    before(() => {
      addRecipientStub = sinon.stub(jsonClient, 'addRecipient');
    });

    after(() => {
      jsonClient.addRecipient.restore();
    });

    it('adds a recipient to a sharedbox and returns the proper success message', () => {
      fetchStub.onFirstCall().returns(fakePromise(r => r(new Response('someEndpoint/'))));
      fetchStub.onSecondCall().returns(fakePromise(r => r(new Response(JSON.stringify(recipientToAdd)))));
      addRecipientStub.returns(fakePromise(r => r(new Response(recipientToAdd))));
      client.addRecipient(sharedBoxToSubmit, recipientToAdd).then(res => {
        expect(res).to.deep.equal(recipientToAdd);
      });
    });
  });

  describe('closeSharedBox', () => {

    beforeEach(() => {
      closeSharedBoxStub = sinon.stub(jsonClient, 'closeSharedbox');
    });

    afterEach(() => {
      jsonClient.closeSharedbox.restore();
    });

    it('closes a sharedbox and returns the proper success message', () => {
      fetchStub.onFirstCall().returns(fakePromise(r => r(new Response('someEndpoint/'))));
      fetchStub.onSecondCall().returns(fakePromise(r => r(new Response(JSON.stringify({'result': true,'message': 'Sharedbox successfully closed.' })))));
      closeSharedBoxStub.returns(fakePromise(r => r(new Response(JSON.stringify({'result': true,'message': 'Sharedbox successfully closed.' })))));
      client.closeSharedbox(sharedBoxToSubmit).then(res => {
        expect(res).to.deep.equal({'result': true,'message': 'Sharedbox successfully closed.' });
      });
    });

    it('fails to close a sharedbox and returns the proper failure message', () => {
      fetchStub.onFirstCall().returns(fakePromise(r => r(new Response('someEndpoint/'))));
      fetchStub.onSecondCall().returns(fakePromise(r => r(new Response(JSON.stringify({'result': false, 'message': 'Unable to close the Sharedbox.' })))));
      closeSharedBoxStub.returns(fakePromise(r => r(new Response(JSON.stringify({'result': false, 'message': 'Unable to close the Sharedbox.' })))));
      client.closeSharedbox(sharedBoxToSubmit).then(res => {
        expect(res).to.deep.equal({'result': false, 'message': 'Unable to close the Sharedbox.'});
      });
    });
  });

});
