import SharedBox from '../src/sharedbox.js';
import * as Utils from '../src/Utils/platform.js';
let sinonChai = require('sinon-chai');
let chai = require('chai');
let expect = require('chai').expect;
let sinon = require('sinon');
let fetch = Utils.fetch;
chai.use(sinonChai);

export default describe('JsonClient', () => {
  let jsonClient;
  let fetchStub;
  let Response = fetch.Response;
  let fakePromise = (promiseHelper) => {
    return new Promise((resolve, reject) => {
      promiseHelper(resolve, reject);
    });
  };
  let submitSharedBoxResponse = {
    'guid': '1c820789a50747df8746aa5d71922a3f',
    'userId': 3,
    'subject': 'Donec rutrum congue leo eget malesuada.',
    'expiration': '2018-12-06T05:38:09.951Z',
    'notificationLanguage': 'en',
    'status': 'in_progress',
    'allowRememberMe': false,
    'allowSms': false,
    'allowVoice': false,
    'allowEmail': true,
    'retentionPeriodType': 'discard_at_expiration',
    'retentionPeriodValue': null,
    'retentionPeriodUnit': null,
    'previewUrl': 'http://sharedbox.com/sharedboxes/dhjewg67ewtfg476/preview',
    'createdAt': '2018-12-05T22:38:09.965Z',
    'updatedAt': '2018-12-05T22:38:09.965Z'
  };

  beforeEach(() => {
    jsonClient = new SharedBox.JsonClient('apiToken', '1', 'endpoint', false);
    fetchStub = sinon.stub(Utils, 'fetch');
  });

  afterEach(() => {
    Utils.fetch.restore();
  });

  describe('initializeSharedbox', () => {
    it('makes the request and returns the proper initialized Sharedbox', () => {
      fetchStub.onFirstCall().returns(fakePromise(r => r(new Response('someEndpoint/'))));
      fetchStub.onSecondCall().returns(fakePromise(r => r(new Response('{"guid": "dc6f21e0f02c41123b795e4","uploadUrl": "upload_url"}'))));
      jsonClient.initializeSharedBox('test@test.com').then(res => {
        expect(res).to.deep.equal({'guid': 'dc6f21e0f02c41123b795e4', 'uploadUrl': 'upload_url'});
        expect(fetchStub).to.have.been.calledWith('endpoint/services/sharedbox/server/url', {'method': 'get'});
        expect(fetchStub).to.have.been.calledWith('someEndpoint/api/sharedboxes/new?email=test@test.com', {
          'headers': {
            'Authorization-Token': 'apiToken'
          },
          'method': 'get'
        });
      });
    });
  });

  describe('submitSharedBox', () => {
    it('submits the SharedBox and returns the proper success message', () => {
      fetchStub.onFirstCall().returns(fakePromise(r => r(new Response('someEndpoint/'))));
      fetchStub.onSecondCall().returns(fakePromise(r => r(new Response(JSON.stringify(submitSharedBoxResponse)))));
      jsonClient.submitSharedBox({
        'temporaryDocument': {
          'documentGuid': '65f53ec1282c454fa98439dbda134093'
        }
      }).then(res => {
        expect(res).to.deep.equal(submitSharedBoxResponse);
        expect(fetchStub).to.have.been.calledWith('endpoint/services/sharedbox/server/url', {'method': 'get'});
        expect(fetchStub).to.have.been.calledWith('someEndpoint/api/sharedboxes', {
          'headers': {
            'Authorization-Token': 'apiToken',
            'Content-Type': 'application/json'
          },
          'method': 'post',
          'body': {
            'temporaryDocument': {
              'documentGuid': '65f53ec1282c454fa98439dbda134093'
            }
          }
        });
      });
    });
  });

});
