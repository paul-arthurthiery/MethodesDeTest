import BaseHelper from './BaseHelper.js';

let map = new WeakMap();

export default class SecurityOptions extends BaseHelper {
  constructor(object) {
    super();
    this.retentionPeriodType = this.property(object, 'retentionPeriodType').orNull(); //[discard_at_expiration, retain_at_expiration, do_not_discard]
    this.retentionPeriodValue = this.property(object, 'retentionPeriodValue').orNull();
    this.retentionPeriodUnit = this.property(object, 'retentionPeriodUnit').orNull();
    this.expirationValue = this.property(object, 'expirationValue').orNull();
    this.expirationUnit = this.property(object, 'expirationUnit').orNull();
    map.set(this, {
      allowRememberMe: this.property(object, 'allowRememberMe').orNull(),
      allowSms: this.property(object, 'allowSms').orNull(),
      allowVoice: this.property(object, 'allowVoice').orNull(),
      allowEmail: this.property(object, 'allowEmail').orNull(),
      allowManualClose: this.property(object, 'allowManualClose').orNull(),
    });
    Object.seal(this);
  }

  get allowRememberMe() {
    return map.get(this).allowRememberMe;
  }

  get allowSms() {
    return map.get(this).allowSms;
  }

  get allowVoice() {
    return map.get(this).allowVoice;
  }

  get allowEmail() {
    return map.get(this).allowEmail;
  }

  get allowManualClose() {
    return map.get(this).allowManualClose;
  }

  toObject() {
    return {
      retentionPeriodType: this.retentionPeriodType,
      retentionPeriodValue: this.retentionPeriodValue,
      retentionPeriodUnit: this.retentionPeriodUnit,
      expirationValue: this.expirationValue,
      expirationUnit: this.expirationUnit,
      allowRememberMe: this.allowRememberMe,
      allowSms: this.allowSms,
      allowVoice: this.allowVoice,
      allowEmail: this.allowEmail,
      allowManualClose: this.allowManualClose
    };
  }

}
