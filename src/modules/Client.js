import JsonClient from './JsonClient.js';
import Helpers from './Helpers/Helpers.js';
import * as Utils from '../Utils/platform.js';
import _map from 'lodash/map';
import _pick from 'lodash/pick';
import { SharedBoxException } from './SharedBoxException.js';
import { SECURITY_OPTIONS_KEYS } from './Helpers/Sharedbox.js';

export default class Client {
  constructor(apiToken, userId, endpoint, noCaching = false) {
    this.apiToken = apiToken;
    this.userId = userId;
    this.endpoint = endpoint;
    this.jsonClient = new JsonClient(apiToken, userId, endpoint, noCaching);
  }

  /**
   * Pre-creates a Sharedbox and initializes the Sharedbox object accordingly.
   *
   * @param sharedbox
   *            A Sharedbox object
   * @return The updated SharedBox object with the GUID and the upload URL
   * filled out.
   */
  initializeSharedBox(sharedbox) {
    return this.jsonClient.initializeSharedBox(sharedbox.userEmail)
      .then(result => {
        sharedbox.guid = result.guid;
        sharedbox.uploadUrl = result.uploadUrl;
        return sharedbox;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * This actually 'Sends' the Sharedbox with all its content.
   *
   * @param sharedbox
   *            A Sharedbox object.
   * @return Updated Sharedbox
   */
  submitSharedBox(sharedbox) {
    if (!sharedbox.guid) {
      throw new SharedBoxException(1, 'SharedBox GUID cannot be null or undefined');
    }
    let sb = sharedbox.toObject();
    return this.jsonClient.submitSharedBox(sharedbox.toJson())
      .then(result => {
        result.securityOptions = _pick(result, SECURITY_OPTIONS_KEYS);
        return new Helpers.Sharedbox(Object.assign(sb, result));
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Uploads the specified file as an Attachment of the specified Sharedbox.
   *
   * @param sharedbox
   *            An initialized Sharedbox object
   * @param attachment
   *            An Attachment object - the file to be uploaded
   * @return The updated Attachment object with the GUID parameter filled out.
   */
  uploadAttachment(sharedbox, attachment) {
    var param = {
      fileStream: attachment.stream,
      contentType: attachment.contentType,
      filename: attachment.filename
    };
    return this.jsonClient.uploadFile(sharedbox.uploadUrl, param)
      .then(result => {
        attachment.guid = result.temporaryDocument.documentGuid;
        return attachment;
      });
  }

  /**
   * Create a new recipient for a specific sharedbox,
   *     and add the new recipient to the SharedBox object.
   *
   * @param sharedbox: A Sharedbox object
   * @param recipient: A Recipient object
   * @return The updated Recipient
   */
  addRecipient(sharedbox, recipient) {
    if (!sharedbox.guid) {
      throw new SharedBoxException(1, 'SharedBox GUID cannot be null or undefined');
    }
    if (!recipient.email) {
      throw new SharedBoxException(1, 'Recipient email cannot be null or undefined');
    }
    return this.jsonClient.addRecipient(sharedbox.guid, recipient.toJson())
      .then(res => {
        recipient = new Helpers.Recipient(Object.assign(recipient.toObject(), res));
        sharedbox.recipients.push(recipient);
        return recipient;
      });
  }

  /**
   * Close a specific sharedbox associated to the current user's account.
   *
   * @param sharedbox: A Sharedbox object
   *
   * @return The request result
   */
  closeSharedbox(sharedbox) {
    if (!sharedbox.guid) {
      throw new SharedBoxException(1, 'SharedBox GUID cannot be null or undefined');
    }
    return this.jsonClient.closeSharedbox(sharedbox.guid);
  }

}
