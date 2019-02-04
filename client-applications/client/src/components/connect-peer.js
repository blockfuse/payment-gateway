import {bindable, containerless} from 'aurelia-templating';
import {PeersService} from 'services/peers';

@containerless
export class ConnectPeer {
  @bindable publicKey = '036f8f292e27c1aad1f3958d0a8a79d5b0caa4bc94dd95ad0efd065c27d9119fa5';
  @bindable host = '172.19.0.5';
  @bindable port = '9737';
  @bindable callback = () => { throw new Error('Must be overridden'); };

  static inject = [PeersService];
  constructor(peersService) {
    this.peersService = peersService;
  }

  connect() {
    this.peersService.connectPeer(this.publicKey, this.host, this.port).then(newPeer => {
      this.callback({peer: newPeer});
    });
  }
}
