import _reduce from 'lodash/reduce';
import _extend from 'lodash/extend';
import _map from 'lodash/map';
import _partial from 'lodash/partial';
import BaseHelper from './BaseHelper.js';
import SecurityOptions from './SecurityOptions.js';
import Recipient from './Recipient.js';
import Attachment from './Attachment.js';

let map = new WeakMap();

export default class Sharedbox extends BaseHelper {
  constructor(object) {
    super();
    _map(
      [
        'guid',
        'userEmail',
        'subject',
        'message',
        'uploadUrl',
        'notificationLanguage',
        'expiration'
      ],
      v => (this[v] = this.property(object, v).orNull())
    );
    this.securityOptions = this.property(object, 'securityOptions')
      .using(v => new SecurityOptions(object.securityOptions))
      .orDefault(new SecurityOptions());
    map.set(this, {
      recipients: this.property(object, 'recipients')
        .using(_partial(_map, _partial.placeholder, v => new Recipient(v)))
        .orDefault([]),
      attachments: this.property(object, 'attachments')
        .using(_partial(_map, _partial.placeholder, v => new Attachment(v)))
        .orDefault([]),
      userId: this.property(object, 'userId').orNull(),
      status: this.property(object, 'status').orNull(), //[in_progress, closed]
      previewUrl: this.property(object, 'previewUrl').orNull(),
      createdAt: this.property(object, 'createdAt').orNull(),
      updatedAt: this.property(object, 'updatedAt').orNull(),
      closedAt: this.property(object, 'closedAt').orNull()
    });

    Object.preventExtensions(this);
  }

  set recipients(recipients) {
    map.get(this).recipients = recipients;
  }

  get recipients() {
    return map.get(this).recipients;
  }

  set attachments(attachments) {
    map.get(this).attachments = attachments;
  }

  get attachments() {
    return map.get(this).attachments;
  }

  get userId() {
    return map.get(this).userId;
  }

  get status() {
    return map.get(this).status;
  }

  get previewUrl() {
    return map.get(this).previewUrl;
  }

  get createdAt() {
    return map.get(this).createdAt;
  }

  get updatedAt() {
    return map.get(this).updatedAt;
  }

  get closedAt() {
    return map.get(this).closedAt;
  }

  toObject() {
    return {
      guid: this.guid,
      userEmail: this.userEmail,
      subject: this.subject,
      message: this.message,
      uploadUrl: this.uploadUrl,
      notificationLanguage: this.notificationLanguage,
      expiration: this.expiration,
      securityOptions: this.securityOptions.toObject(),
      recipients: this.recipients.map(recipient => recipient.toObject()),
      attachments: this.attachments,
      userId: this.userId,
      status: this.status,
      previewUrl: this.previewUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      closedAt: this.closedAt
    };
  }

  toJson() {
    let sharedbox = {
      guid: this.guid,
      userEmail: this.userEmail,
      uploadUrl: this.uploadUrl,
      subject: this.subject,
      message: this.message
    };

    _extend(sharedbox, {
      recipients: _map(this.recipients, recipient => {
        let obj = {
          email: recipient.email,
          firstName: recipient.firstName,
          lastName: recipient.lastName
        };
        return _extend(obj, recipient.options.updateForSerialization());
      })
    });

    let options = this.securityOptions;
    let attachments = this.attachments;

    sharedbox.documentIds = _reduce(
      attachments,
      (sharedbox, att) => {
        sharedbox.push(att.guid);
        return sharedbox;
      },
      []
    );
    sharedbox.expirationValue = options.expirationValue;
    sharedbox.expirationUnit = options.expirationUnit;
    sharedbox.retentionPeriodType = options.retentionPeriodType;
    sharedbox.retentionPeriodValue = options.retentionPeriodValue;
    sharedbox.retentionPeriodUnit = options.retentionPeriodUnit;
    sharedbox.notificationLanguage = this.notificationLanguage || 'en';

    return JSON.stringify({ sharedbox: sharedbox });
  }
}

export const SECURITY_OPTIONS_KEYS = [
  'allowSms',
  'allowVoice',
  'allowEmail',
  'allowRememberMe',
  'retentionPeriodType',
  'retentionPeriodValue',
  'retentionPeriodUnit',
  'allowManualClose'
];
