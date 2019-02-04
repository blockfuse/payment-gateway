import {containerless} from 'aurelia-templating';
import {InvoicesService} from 'services/invoices';
import {DataStore} from 'services/data-store';

@containerless
export class CreateInvoice {
  description = '';
  tokens = 0;

  static inject = [InvoicesService, DataStore];
  constructor(invoicesService, dataStore) {
    this.invoicesService = invoicesService;
    this.dataStore = dataStore;
  }

  createInvoice() {
    return this.invoicesService.createInvoice(this.description, this.tokens).then(result => {
      this.dataStore.invoices.push(result);
    });
  }
}
