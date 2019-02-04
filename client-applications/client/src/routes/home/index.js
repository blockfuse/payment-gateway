import {DataStore} from 'services/data-store';
import {NodeInfoService} from 'services/node-info';
import {Order} from 'models/order';

export class Index {
  dataStore;
  nodeInfoService;
  activeTab = '';

  static inject = [DataStore, NodeInfoService];
  constructor(dataStore, nodeInfoService) {
    this.dataStore = dataStore;
    this.nodeInfoService = nodeInfoService;
  }

  setActiveTab(tabName) {
    if (this.activeTab === tabName) {
      this.activeTab = '';
    } else {
      this.activeTab = tabName;
    }
  }
  attached() {
    return this.nodeInfoService.getNodeInfo().then(result => {
      this.nodeInfo = result;
    });
  }
}
