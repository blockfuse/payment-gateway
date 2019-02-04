const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const Order = db.Order;

module.exports = {
  getAll,
  getById,
  create,
  update
};

async function getAll() {
  return await Order.find().select('-hash');
}

async function getById(id) {
  return await Order.findById(id).select('-hash');
}

async function create(orderParam) {
  if (await Order.findOne({ client_order_id: orderParam.client_order_id })) {
    throw 'Order client_order_id "' + orderParam.client_order_id + '" is already taken';
  }

  const order = new Order(orderParam);

  await order.save();
  return order;
}

async function update(id, orderParam) {
  const order = await Order.findById(id);

  if (!order) throw 'Order not found';

  Object.assign(order, orderParam);

  await order.save();
}
