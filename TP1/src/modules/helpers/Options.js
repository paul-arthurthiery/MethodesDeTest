import _map from 'lodash/map';
import _partial from 'lodash/partial';
import BaseHelper from './BaseHelper.js';
import ContactMethod from './ContactMethod.js';

let map = new WeakMap();

export default class Options extends BaseHelper {
  constructor(object) {
    super();
    this.locked = this.property(object, 'locked').orNull();
    map.set(this, {
      bouncedEmail: this.property(object, 'bouncedEmail').orNull(),
      verified: this.property(object, 'verified').orNull(),
      createdAt: this.property(object, 'createdAt').orNull(),
      updatedAt: this.property(object, 'updatedAt').orNull(),
      contactMethods: this.property(object, 'contactMethods')
        .using(_partial(_map, _partial.placeholder, v => new ContactMethod(v)))
        .orDefault([])
    });
    Object.seal(this);
  }

  get contactMethods() {
    return map.get(this).contactMethods;
  }

  addContactMethod(contactMethod) {
    map.get(this).contactMethods.push(
      contactMethod instanceof ContactMethod
        ? contactMethod
        : new ContactMethod(contactMethod)
    );
    return this;
  }

  get bouncedEmail() {
    return map.get(this).bouncedEmail;
  }

  get verified() {
    return map.get(this).verified;
  }

  get createdAt() {
    return map.get(this).createdAt;
  }

  get updatedAt() {
    return map.get(this).updatedAt;
  }

  updateForSerialization() {
    return {
      contactMethods: this.contactMethods.map(contactMethod =>
        contactMethod.updateForSerialization()
      )
    };
  }

  toObject() {
    return {
      locked: this.locked,
      bouncedEmail: this.bouncedEmail,
      verified: this.verified,
      contactMethods: this.contactMethods.map(contactMethod => contactMethod.toObject()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

}
