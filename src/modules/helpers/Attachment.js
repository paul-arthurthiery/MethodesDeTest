import _all from 'lodash/every';
import BaseHelper from './BaseHelper.js';
import * as Utils from '../../Utils/platform.js';
import { SharedBoxException } from '../SharedBoxException.js';

export default class Attachment extends BaseHelper {
  /**
  * Create a new instance of Attachment
  * @param {String|Object|File} In NodeJS: either the path to a file on disk or an object.
  * @returns {Attachment} Returns a new instance of Attachment,
  *  else `false`.
  * @example
  * var attachment = new Attachments('/tmp/foobar.txt');
  * or  var attachment = new Atatchment({filename: 'foobar.txt', stream: fs.readFileSync('/tmp/foobar.txt'), contentType: 'text/plain'});
  */
  constructor(arg) {
    super();
    if (Utils.isNode) {
      if (typeof arg == 'string') {
        this.filename = Utils.path.basename(arg);
        this.contentType = Utils.lookup(arg);
        this.stream = Utils.fs.readFileSync(arg);
      } else {
        if (_all(['filename', 'stream', 'contentType'], e => e in arg)) {
          this.filename = arg.filename;
          this.contentType = arg.contentType;
          this.stream = arg.stream;
        } else {
          throw new Exception.SendSecureException(0, 'Missing');
        }
      }
    } else {
      this.file = arg;
    }
    this.guid = null;
    Object.seal(this);
  }
}
