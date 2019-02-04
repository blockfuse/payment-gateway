import {Router} from 'aurelia-router';
import {DataStore} from 'services/data-store';
import {OrdersService} from 'services/orders';

export class Index {
  router;

  static inject = [OrdersService, DataStore];
  constructor(ordersService, dataStore) {
    this.ordersService = ordersService;
    this.dataStore = dataStore;
  }

  configureRouter(config, router) {
    config.map([
      { route: ['', 'list'], name: 'list', moduleId: './routes/list', title: 'Orders List' },
      { route: '/:order_id', name: 'details', moduleId: './routes/details', title: 'Order Details' },
    ]);

    this.router = router;

    return this.ordersService.getOrders().then(orders => {
      this.dataStore.orders = orders;
    });
  }
}
