// testOAuthToken.js
require('dotenv').config();
const { getAccessToken } = require('../services/zoomToken');

getAccessToken()
  .then(token => console.log('Access Token:', token))
  .catch(err => console.error('Error:', err));


  module.exports = {getAccessToken};