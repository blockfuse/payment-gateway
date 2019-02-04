const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  client_order_id: { type: String, required: true },
  symbol: { type: String, required: true },
  amount: { type: String, required: true },
  price: { type: String },
  side: { type: String, required: true },
  type: { type: String, required: true },
  options: [{ type: String }],

  createdDate: { type: Date, default: Date.now },
  createdById: { type: Schema.Types.ObjectId, required: true },
  invoiceId: { type: String, required: true },
  merchantId: { type: Schema.Types.ObjectId, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Order', schema);
