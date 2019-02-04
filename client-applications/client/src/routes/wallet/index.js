import {Router} from 'aurelia-router';
import {DataStore} from 'services/data-store';

export class Index {
  router;

  static inject = [DataStore];
  constructor(dataStore) {
    this.dataStore = dataStore;
  }

  configureRouter(config, router) {
    config.map([
      { route: ['', '/pay'], name: 'pay', moduleId: './routes/pay', title: 'Pay' },
      { route: '/receive', name: 'receive', moduleId: './routes/receive', title: 'Receive' }
    ]);

    this.router = router;
  }
}
