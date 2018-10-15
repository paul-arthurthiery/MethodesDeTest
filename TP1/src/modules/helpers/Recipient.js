import _extend from 'lodash/extend';
import BaseHelper from './BaseHelper.js';
import Options from './Options.js';

let map = new WeakMap();

export default class Recipient extends BaseHelper {
  constructor(object) {
    super();
    this.email = this.property(object, 'email').orNull();
    this.firstName = this.property(object, 'firstName').orNull();
    this.lastName = this.property(object, 'lastName').orNull();
    map.set(this, {
      id: this.property(object, 'id').orNull(),
      options: this.property(object, 'options')
        .using(v => new Options(object.options))
        .orDefault(new Options())
    });
    Object.seal(this);
  }

  set options(value) {
    map.set(this).options = new Options(value);
  }

  get options() {
    return map.get(this).options;
  }

  get id() {
    return map.get(this).id;
  }

  toJson() {
    let recipient = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName
    };
    _extend(recipient, this.options.updateForSerialization());
    return JSON.stringify({ recipient: recipient });
  }

  toObject() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      id: this.id,
      options: this.options.toObject()
    };
  }
}
