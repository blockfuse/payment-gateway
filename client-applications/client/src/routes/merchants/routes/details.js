import {DataStore} from 'services/data-store';
import {MerchantsService} from 'services/merchants';

export class Details {
  merchant;

  static inject = [DataStore, MerchantsService];
  constructor(dataStore, merchantsService) {
    this.dataStore = dataStore;
    this.merchantsService = merchantsService
  }

  activate(params) {
    const id = params.merchant_id;
    this.merchant = this.dataStore.getMerchantById(id);
  }
  edit() {
    this.isEditing = true;
  }
  save() {
    return this.merchantsService.updateMerchant(this.merchant).then(result => {
      this.isEditing = false;
    });
  }
  newPeerCreated(peer) {
    this.merchant.pubkey = peer.public_key;
    this.merchant.peer = peer;

    return this.merchantsService.updateMerchant(this.merchant).then(result => {
      this.isEditing = false;
    });
  }
}
