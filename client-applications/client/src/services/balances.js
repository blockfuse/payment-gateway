import {HttpWrapper} from './http-wrapper';
import {Balance} from 'models/balance';

export class BalancesService {
  static inject = [HttpWrapper];
  constructor(http) {
    this.http = http;
  }

  getBalance() {
    throw new Error('TODO: Need to fix this');

    return this.http.get('/balances').then(result => {
      return result.map(balance => {
        return new Balance(balance);
      });
    });
  }
}
