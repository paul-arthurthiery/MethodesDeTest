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
      promiseHelper(resolve,reject);
    });
  };

  beforeEach(() => {
    jsonClient = new SharedBox.JsonClient('apiToken', '1', 'endpoint', false);
  });

  describe('initializeSharedbox', () => {

    it('makes the request with the proper suffix', () => {
      fetchStub = sinon.stub(Utils, 'fetch');
      fetchStub.onFirstCall().returns(fakePromise(r => r(new Response('someEndpoint/'))));
      fetchStub.onSecondCall().returns(fakePromise(r => r(new Response('{"guid": "dc6f21e0f02c41123b795e4","uploadUrl": "upload_url"}'))));
      jsonClient.initializeSharedBox('test@test.com').then(res => {
        expect(res).to.deep.equal({
          'guid': 'dc6f21e0f02c41123b795e4',
          'uploadUrl': 'upload_url'
        });
        expect(fetchStub).to.have.been.calledWith('endpoint/services/sharedbox/server/url', { 'method': 'get' });
        expect(fetchStub).to.have.been.calledWith('someEndpoint/api/sharedboxes/new?email=test@test.com', { 'headers': { 'Authorization-Token': 'apiToken' }, 'method': 'get' });
      });


    });
  });
});
