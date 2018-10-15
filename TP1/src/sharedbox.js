import Helpers from './modules/Helpers/Helpers.js';
import JsonClient from './modules/JsonClient.js';
import Client from './modules/Client.js';

var SharedBox = {};

SharedBox.JsonClient = JsonClient;
SharedBox.Client = Client;
SharedBox.Helpers = Helpers;

export default SharedBox;
