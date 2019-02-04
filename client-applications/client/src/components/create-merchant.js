import {containerless} from 'aurelia-templating';
import {MerchantsService} from 'services/merchants';
import {DataStore} from 'services/data-store';

@containerless
export class CreateMerchant {
  name = '';
  description = '';
  pubkey = '';

  static inject = [MerchantsService, DataStore];
  constructor(merchantsService, dataStore) {
    this.merchantsService = merchantsService;
    this.dataStore = dataStore;
  }

  createMerchant() {
    return this.merchantsService.createMerchant(this.name, this.description, this.pubkey).then(result => {
      this.dataStore.merchants.push(result);
    });
  }
}
