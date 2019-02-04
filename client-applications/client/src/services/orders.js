import {HttpWrapper} from './http-wrapper';
import {Order} from 'models/order';

export class OrdersService {
  static inject = [HttpWrapper];
  constructor(http) {
    this.http = http;
  }

  requestSettlement(invoice) {
    return this.http.post(`/orders/request/${invoice.id}`, invoice);
  }
  getOrders() {
    return this.http.get(`/orders`);
  }
}
