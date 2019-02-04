const express = require('express');
const router = express.Router();
const ordersService = require('../services/orders');
const dbInvoicesService = require('../services/invoices');
const invoicesService = require('@coinmesh/lnd-adapter').invoicesService;
const accountingHubService = new (require('../services/accounting-hub'));
const usersService = require('../services/users');

router.get('/', (req, res, next) => {
  ordersService.getAll().then(result => {
    return res.json(result);
  });
});

router.post('/request/:invoice_id', (req, res, next) => {
  let options = {
    currentUser: '',
    invoice: '',
    dbInvoice: '',
    finalInvoice: '',
    newOrder: ''
  };

  const id = req.params.invoice_id;

  dbInvoicesService.getById(id).then(dbInvoice => {
    options.dbInvoice = dbInvoice;

    return invoicesService.getInvoice(dbInvoice.invoiceId);
  }).then(invoice => {
    invoice.invoiceId = invoice.id;
    delete invoice.id;
    options.invoice = invoice;

    return getCurrent(req, res, next);
  }).then(currentUser => {
    const userId = currentUser.id;

    if (!options.dbInvoice) {
      throw new Error('No invoice found in the database.');
    }
    if (!options.invoice) {
      throw new Error('No invoice found in the node database.');
    }

    let finalInvoice = Object.assign(options.dbInvoice, options.invoice);

    options.finalInvoice = finalInvoice;

    finalInvoice.createdById = currentUser.id;
    finalInvoice.merchantId = currentUser.id;

    if (!finalInvoice) {
      throw new Error('No Invoice found.');
    }
    if (finalInvoice.is_confirmed !== true) {
      throw new Error('Invoice is not confirmed.');
    }
    if (finalInvoice.status !== 'paid') {
      throw new Error('Invoice is not in paid status.');
    }

    const orderObject = {
      client_order_id: `${finalInvoice.merchantId} || ${finalInvoice.request}`,
      symbol: 'btcusd',
      amount: (finalInvoice.tokens / 1000000),
      price: 5000,
      side: 'sell',
      type: 'order',
      options: ['immediate-or-cancel'],
      merchantId: userId,
      invoiceId: finalInvoice.id,
      createdById: userId
    };

    return ordersService.create(orderObject);
  }).then(newOrder => {
    options.newOrder = newOrder;
    return accountingHubService.getExchangeRate(newOrder.symbol);
  }).then(result => {
    console.log(result)
    options.newOrder.price = result;
    return accountingHubService.requestOrder(options.newOrder);
  }).then(result => {
    if (!result.status === 'created') {
      throw new Error('Order was not created properly.');
    }
    options.finalInvoice.status = 'settling';

    return dbInvoicesService.update(options.finalInvoice.id, options.finalInvoice);
  }).then(updatedInvoice => {
    res.json(updatedInvoice);
  }).catch(error => {
    console.error('!'.repeat(100))
    console.error(error)
    res.status(500).send(error.message);
  });
});

module.exports = router;

function getCurrent(req, res, next) {
  return usersService.getById(req.user.sub)
    .catch(err => next(err));
}
