var fetch = null;
var fs = null;
var path = null;
var lookup = null;
var isNode = false;
var formData = null;

if ((typeof process !== 'undefined') && (process.release.name === 'node')){

  fetch =  require('node-fetch');
  fs = require ('fs');
  path = require('path');
  lookup = require('mime-types').lookup;
  formData = require('form-data');
  isNode = true;

} else {
  fetch = window.fetch;
  formData = window.FormData;
}

export { fetch } ;
export { fs } ;
export { lookup } ;
export { isNode } ;
export { path } ;
export { formData } ;
