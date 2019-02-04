import {bindable, containerless} from 'aurelia-templating';

@containerless
export class OrdersList {
  @bindable orders = [];
}
