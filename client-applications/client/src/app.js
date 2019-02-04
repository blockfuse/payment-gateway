import {UsersService} from 'services/users';
import {DataStore} from 'services/data-store';
import {PeersService} from 'services/peers';
import {MerchantsService} from 'services/merchants';
import {ChannelsService} from 'services/channels';

export class App {
  static inject = [DataStore, UsersService, PeersService, MerchantsService, ChannelsService];
  constructor(dataStore, usersService, peersService, merchantsService, channelsService) {
    this.dataStore = dataStore;
    this.usersService = usersService;
    this.peersService = peersService;
    this.merchantsService = merchantsService;
    this.channelsService = channelsService;
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Payment Gateway';

    const user = this.usersService.getUser();

    if (!user) {
      config.map([
        {
          route: ['', 'login'],
          name: 'login',
          moduleId: 'routes/accounts/login',
          title: 'Login'
        }, {
          route: 'register',
          name: 'register',
          moduleId: 'routes/accounts/register',
          title: 'Register'
        }
      ]);

      config.mapUnknownRoutes('routes/accounts/login');
      return;
    }

    this.usersService.setHeader(user.token);

    const channelsPromise = this.channelsService.getChannels().then(channels => {
      this.dataStore.channels = channels;
    });

    const peersPromise = this.peersService.getPeers().then(peers => {
      this.dataStore.peers = peers;
    });

    const merchantsPromise = this.merchantsService.getMerchants().then(merchants => {
      const merchantRoutes = this.getMerchantRoutes(merchants);

      this.dataStore.merchants = merchants;

      config.map([
        {
          route: ['', 'home'],
          name: 'home',
          moduleId: 'routes/home/index',
          nav: true,
          title: 'Home',
          settings: {
            icon: 'fa fa-address-card-o'
          }
        }, {
          route: 'merchants',
          name: 'merchants',
          moduleId: 'routes/merchants/index',
          nav: true,
          title: 'Merchants',
          settings: {
            icon: 'fa fa-briefcase',
            subroutes: merchantRoutes
          }
        }, {
          route: 'invoices',
          name: 'invoices',
          moduleId: 'routes/invoices/index',
          nav: true,
          title: 'Invoices',
          settings: {
            icon: 'fa fa-money'
          }
        }, {
          route: 'orders',
          name: 'orders',
          moduleId: 'routes/orders/index',
          nav: true,
          title: 'Orders',
          settings: {
            icon: 'fa fa-history'
          }
        }, {
          route: 'channels',
          name: 'channels',
          moduleId: 'routes/channels/index',
          nav: true,
          title: 'Channels',
          settings: {
            icon: 'fa fa-arrows-h'
          }
        }, {
          route: 'peers',
          name: 'peers',
          moduleId: 'routes/peers/index',
          nav: true,
          title: 'Peers',
          settings: {
            icon: 'fa fa-sitemap'
          }
        }, {
          route: 'users',
          name: 'users',
          moduleId: 'routes/users/index',
          nav: true,
          title: 'Users',
          settings: {
            icon: 'fa fa-user'
          }
        }, {
          route: 'wallet',
          name: 'wallet',
          moduleId: 'routes/wallet/index',
          nav: false,
          title: 'Wallet',
          settings: {
            icon: ''
          }
        }
      ]);
      config.mapUnknownRoutes('routes/home/index');
    });

    return Promise.all([channelsPromise, peersPromise, merchantsPromise]);
  }
  getMerchantRoutes(merchants) {
    return merchants.map(merchant => {
      const merchantName = merchant.name.toLowerCase().replace(/\s/g, '');

      const route = {
        route: merchantName,
        name: merchantName,
        href: `#/merchants/${merchant.id}`,
        title: merchant.name
      };

      return route;
    });
  }
}
