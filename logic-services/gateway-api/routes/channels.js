const express = require('express');
const router = express.Router();
const channelsService = require('@coinmesh/lnd-adapter').channelsService;

router.post('/', (req, res, next) => {
  const amount = req.body.amount;
  const publicKey = req.body.publicKey;

  channelsService.openChannel(publicKey, amount).then(result => {
    return res.json(result);
  });
});

router.get('/', (req, res, next) => {
  channelsService.getChannels().then(result => {
    return res.json(result);
  });
});

module.exports = router;
