import {DataStore} from 'services/data-store';

export class Details {
  order;

  static inject = [DataStore];
  constructor(dataStore) {
    this.dataStore = dataStore;
  }

  activate(params) {
    const id = params.order_id;
    this.order = this.dataStore.getOrderById(id);
  }
}
