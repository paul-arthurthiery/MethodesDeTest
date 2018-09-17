import _identity from 'lodash/identity';

export default class BaseHelper {
  property(object, prop) {
    class propertyHandler {
      constructor(o, p) {
        this.o = o;
        this.p = p;
        this.callback = _identity;
        this.process = def => this.o && this.p in this.o ? this.callback(this.o[this.p]) : def;
      }

      using(cbk) {
        this.callback = cbk;
        return this;
      }

      orDefault(def) {
        return this.process(def);
      }

      orNull() {
        return this.process(null);
      }
    }

    return new propertyHandler(object, prop);
  }
}
