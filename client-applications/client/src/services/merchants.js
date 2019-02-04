import {HttpWrapper} from './http-wrapper';
import {DataStore} from './data-store';
import {Merchant} from 'models/merchant';

export class MerchantsService {
  static inject = [HttpWrapper, DataStore];
  constructor(http, dataStore) {
    this.http = http;
    this.dataStore = dataStore;
  }

  getMerchants() {
    return this.http.get('/merchants').then(result => {
      return result.map(item => {
        const merchant = new Merchant(item);
        const peer = this.dataStore.getPeerFromPublicKey(merchant.pubkey)
        merchant.peer = peer;
        return merchant;
      });
    });
  }
  createMerchant(name, description, pubkey) {
    const payload = {
      name,
      description,
      pubkey
    };
    return this.http.post('/merchants', payload).then(result => {
      return new Merchant(result);
    });
  }
  updateMerchant(merchant) {
    return this.http.put(`/merchants/${merchant.id}`, merchant).then(result => {
      return new Merchant(result);
    });
  }
}
