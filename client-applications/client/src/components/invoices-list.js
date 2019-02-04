import {bindable, containerless} from 'aurelia-templating';
import {OrdersService} from 'services/orders';
import {InvoicesService} from 'services/invoices';

@containerless
export class InvoicesList {
  @bindable invoices = [];
  @bindable refreshCallback = () => { console.log('Should be overridden.');};

  isRefreshingInvoices = false;
  ordersService;
  invoicesService;

  static inject = [OrdersService, InvoicesService];
  constructor(ordersService, invoicesService) {
    this.ordersService = ordersService;
    this.invoicesService = invoicesService;
  }

  markPaid(invoice) {
    return this.invoicesService.markPaid(invoice).then(result => {
      if (result.status !== invoice.status) {
        invoice.status = result.status;
      }
    });
  }
  settleInvoice(invoice) {
    return this.ordersService.requestSettlement(invoice).then(result => {
      if (result.status !== invoice.status) {
        invoice.status = result.status;
      }
    });
  }
  refresh() {
    this.isRefreshingInvoices = true;
    return this.refreshCallback().then(() => {
      setTimeout(() => {
        this.isRefreshingInvoices = false;
      }, 500);
    });
  }
}
