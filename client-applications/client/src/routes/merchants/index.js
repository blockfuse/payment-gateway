import {Router} from 'aurelia-router';
import {MerchantsService} from 'services/merchants';
import {DataStore} from 'services/data-store';

export class Index {
  router;

  static inject = [MerchantsService, DataStore];
  constructor(merchantsService, dataStore) {
    this.merchantsService = merchantsService;
    this.dataStore = dataStore;
  }

  configureRouter(config, router) {
    config.map([
      { route: ['', 'list'], name: 'list', moduleId: './routes/list', title: 'Merchants List' },
      { route: '/:merchant_id', name: 'details', moduleId: './routes/details', title: 'Merchant Details' },
    ]);

    this.router = router;

    return this.merchantsService.getMerchants().then(merchants => {
      this.dataStore.merchants = merchants;
    });
  }
}
