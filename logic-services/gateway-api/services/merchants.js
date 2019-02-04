const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const Merchant = db.Merchant;

module.exports = {
  getAll,
  getById,
  create,
  update
};

async function getAll() {
  return await Merchant.find();
}

async function getById(id) {
  return await Merchant.findById(id);
}

async function create(merchantParam) {
  if (await Merchant.findOne({ name: merchantParam.name })) {
    throw 'Merchantname "' + merchantParam.name + '" is already taken';
  }

  const merchant = new Merchant(merchantParam);

  await merchant.save();
  return merchant;
}

async function update(id, merchantParam) {
  const merchant = await Merchant.findById(id);

  if (!merchant) throw 'Merchant not found';

  Object.assign(merchant, merchantParam);

  await merchant.save();
}
