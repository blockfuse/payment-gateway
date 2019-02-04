const axios = require('axios');

const accountingHubToken = process.env.ACCOUNTING_HUB_TOKEN;

if (!accountingHubToken) {
  throw new Error('Error: No ACCOUNTING_HUB_TOKEN found.');
}

class AccountingHubService {
  requestOrder(orderRequest) {
    const url = `http://accountinghubapp:3987/v1/sell/`;
    const body = JSON.stringify(orderRequest);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accountingHubToken}`
    };

    return axios.post(url, body, {headers: headers}).then(result => {
      return result.data;
    }).catch(error => {
      throw new Error(error);
    });
  }
  getExchangeRate(pair) {
    const url = `http://accountinghubapp:3987/v1/exchange-rates/${pair}`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accountingHubToken}`
    };

    return axios.get(url, {headers: headers}).then(result => {
      console.log(result.data)
      return result.data;
    }).catch(error => {
      throw new Error(error);
    });
  }
}

module.exports = AccountingHubService;
