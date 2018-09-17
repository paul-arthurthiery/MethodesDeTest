import * as Utils from '../Utils/platform.js';
import _any from 'lodash/some.js';
import _all from 'lodash/every.js';
import { SharedBoxException } from './SharedBoxException.js';

export default class JsonClient {
  constructor(apiToken, userId, endpoint, noCaching = false) {
    this.apiToken = apiToken;
    this.userId = userId;
    this.endpoint = endpoint;
    this.noCaching = noCaching;
  }

  _getSharedBoxEndpoint(endpoint) {
    const url = `${endpoint}/services/sharedbox/server/url`;
    return Utils.fetch(url, { method: 'get' }).then(response => {
      if (response.ok) {
        let text = response.text();
        if (text === '') {
          throw 'Unexpected server response format';
        }
        return text;
      } else {
        throw new SharedBoxException(response.status, response.statusText);
      }
    });
  }

  _makeRequest(suffixUrl,
    request = { headers: { 'Authorization-Token': this.apiToken}, method: 'get' }) {
    return this._getSharedBoxEndpoint(this.endpoint)
      .then(endpoint => {
        var url = `${endpoint}${suffixUrl}`;
        if (this.noCaching) {
          url += (suffixUrl.indexOf('?') >= 0 ? '&rand=' : '?rand=') +
          new Date().getTime();
        }
        return Utils.fetch(url, request);
      })
      .then(response => {
        //Handle responses with no content
        if (response.status === 204) {
          return {};
        }
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then(result => {
            throw new SharedBoxException(
              response.status,
              response.statusText,
              result
            );
          });
        }
      });
  }

  _uploadFile(uploadUrl, fileStream, contentType, filename) {
    var data = new Utils.formData();
    data.append('file', fileStream, filename);

    return Utils.fetch(uploadUrl, { method: 'post', body: data }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new SharedBoxException(response.status, response.statusText);
      }
    });
  }

  /**
   * Pre-creates a SharedBox.
   *
   * @param userEmail
   *            The email address of a SharedBox user
   * @return The json containing the guid and the upload url of the initialized SharedBox
   */
  initializeSharedBox(userEmail) {
    const suffix = `api/sharedboxes/new?email=${userEmail}`;
    return this._makeRequest(suffix);
  }

  /**
   * Finalizes the creation of the SharedBox.
   *
   * @param sharedBoxJson
   *            The full json expected by the server
   * @return The json containing the informations of the created SharedBox
   */
  submitSharedBox(sharedBoxJson) {
    const suffix = `api/sharedboxes`;
    return this._makeRequest(suffix, {
      headers: {
        'Authorization-Token': this.apiToken,
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: sharedBoxJson
    });
  }

  /**
   * Uploads the specified file as an Attachment of the specified Sharedbox.
   *
   * @param uploadUrl
   *            The url returned by the initializeSharedBox.
   * @param object
   *            The MIME content type of the uploaded file
   * @return The json containing the guid of the uploaded file
   */
  uploadFile(uploadUrl, object) {
    if (!_any(['file', 'filePath', 'fileStream'], elt => elt in object)) {
      throw new SharedBoxException('0', 'Wrong file arguments');
    } else {
      if ('filePath' in object) {
        if (Utils.fs.existsSync(object.filePath)) {
          var data = Utils.fs.readFileSync(object.filePath);
          var contentType = object.contentType || Utils.lookup(object.filePath);
          var filename = object.filename || Utils.path.basename(object.filePath);
          return this._uploadFileNode(uploadUrl, data, contentType, filename);
        } else {
          throw new SharedBoxException('0', `${object.filePath} does not exist`);
        }
      } else {
        if (
          _all(['fileStream', 'contentType', 'filename'], elt => elt in object)
        ) {
          return this._uploadFileNode(
            uploadUrl,
            object.fileStream,
            object.contentType,
            object.filename
          );
        }
      }
    }
  }

  /**
   * Add a new recipient for an existing Sharedbox.
   *
   * @param sharedboxGuid
   *            The guid of the SharedBox to be updated
   * @param recipientJson
   *            The full json expected by the server
   * @return The json containing all information on new Recipient
   */
  addRecipient(sharedboxGuid, recipientJson) {
    const suffix = `api/sharedboxes/${sharedboxGuid}/recipients`;
    return this._makeRequest(suffix, {
      headers: {
        'Authorization-Token': this.apiToken,
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: recipientJson
    });
  }

  /**
   * Closes an existing Sharedbox.
   *
   * @param sharedboxGuid
   *            The guid of the Sharedbox to be closed
   * @return The json containing the request result
   */
  closeSharedbox(sharedboxGuid) {
    const suffix = `api/sharedboxes/${sharedboxGuid}/close`;
    return this._makeRequest(suffix, {
      headers: {
        'Authorization-Token': this.apiToken,
        'Content-Type': 'application/json'
      },
      method: 'patch'
    });
  }
}
