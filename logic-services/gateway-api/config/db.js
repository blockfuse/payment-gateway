const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
  User: require('../models/user'),
  Order: require('../models/order'),
  Merchant: require('../models/merchant'),
  Invoice: require('../models/invoice')
};
