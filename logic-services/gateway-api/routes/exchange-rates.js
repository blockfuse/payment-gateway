const express = require('express');
const router = express.Router();
const accountingHubService = new (require('../services/accounting-hub'));

router.get('/:pair', (req, res, next) => {
  const pair = req.params.pair;
  accountingHubService.getExchangeRate(pair).then(result => {
    return res.json(result);
  }).catch(error => {
    res.status(error.status || 500).send(error.message);
  });
});

module.exports = router;
