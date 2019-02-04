export class DataStore {
  channels = [];
  peers = [];
  invoices = [];
  merchants = [];
  users = [];
  orders = [];

  getPeerFromPublicKey(publicKey) {
    return this.peers.find(peer => {
      return peer.public_key.toLowerCase() === publicKey.toLowerCase();
    });
  }
  getInvoiceById(id) {
    return this.invoices.find(invoice => {
      return invoice.id.toLowerCase() === id.toLowerCase();
    });
  }
  getOrderById(id) {
    return this.orders.find(order => {
      return order.id.toLowerCase() === id.toLowerCase();
    });
  }
  getMerchantById(id) {
    return this.merchants.find(merchant => {
      return merchant.id.toLowerCase() === id.toLowerCase();
    });
  }
  getUserById(id) {
    return this.users.find(user => {
      return user.id.toLowerCase() === id.toLowerCase();
    });
  }
  getChannelsByPubkey(publicKey) {
    return this.channels.filter(channel => {
      return channel.partner_public_key.toLowerCase() === publicKey.toLowerCase();
    });
  }
}
