import {HttpWrapper} from './http-wrapper';
import {Invoice} from 'models/invoice';

export class InvoicesService {
  static inject = [HttpWrapper];
  constructor(http) {
    this.http = http;
  }

  getInvoices() {
    return this.http.get('/invoices').then(result => {
      return result.map(item => {
        return new Invoice(item);
      });
    });
  }
  createInvoice(description, tokens) {
    const payload = {
      description,
      tokens
    };

    return this.http.post('/invoices', payload).then(result => {
      return new Invoice(result);
    });
  }
  markPaid(invoice) {
    return this.http.put(`/invoices/${invoice.id}/mark-paid`, invoice).then(result => {
      return new Invoice(result);
    });
  }
  pay(invoiceRequest) {
    return this.http.post(`/pay`, {request: invoiceRequest}).then(result => {
      return result;
    });
  }
}
