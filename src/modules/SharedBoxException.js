export class SharedBoxException extends Error {
  constructor(code, message, responseContent) {
    super();
    this.code = code;
    this.message = message;
    this.responseContent = responseContent;
  }
}
