import BaseHelper from './BaseHelper.js';

let map = new WeakMap();

export default class ContactMethod extends BaseHelper {
  constructor(object) {
    super();
    this.destinationType = this.property(object, 'destinationType').orNull();
    this.destination = this.property(object, 'destination').orNull();
    map.set(this, {
      id: this.property(object, 'id').orNull(),
      verified: this.property(object, 'verified').orNull(),
      createdAt: this.property(object, 'createdAt').orNull(),
      updatedAt: this.property(object, 'updatedAt').orNull()
    });
    Object.seal(this);
  }

  get id() {
    return map.get(this).id;
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
      destinationType: this.destinationType,
      destination: this.destination
    };
  }

  toObject() {
    return {
      destinationType: this.destinationType,
      destination: this.destination,
      id: this.id,
      verified: this.verified,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
