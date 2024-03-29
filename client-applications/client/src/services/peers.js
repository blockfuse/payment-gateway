import {HttpWrapper} from './http-wrapper';
import {Peer} from 'models/peer';

export class PeersService {
  static inject = [HttpWrapper];
  constructor(http) {
    this.http = http;
  }

  getPeers() {
    return this.http.get('/peers').then(result => {
      return result.peers.map(item => {
        return new Peer(item);
      });
    });
  }
  connectPeer(publicKey, host, port = 9735) {
    const payload = {
      publicKey,
      host,
      port
    };

    return this.http.post('/peers', payload).then(result => {
      return new Peer({
        public_key: publicKey,
        host,
        port
      });
    });
  }
  disconnectPeer(peer) {
    return this.http.delete(`/peers/${peer.public_key}`).then(result => {
      return new Peer(result);
    });
  }
}
