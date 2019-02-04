import {HttpClient} from 'aurelia-http-client';

export class HttpWrapper {
  http;

  constructor() {
    this.http = new HttpClient()
      .configure(x => {
        x.withBaseUrl(`http://payment-gateway.blockfuse.io/api/v1/`);
      });
  }
  setHeader(header, value) {
    this.http.configure(x => {
      x.withHeader(header, value);
    });
  }
  get(path) {
    return this.http.get(path).then(result => {
      return result.content;
    });
  }
  post(path, body) {
    return this.http.post(path, body).then(result => {
      return result.content;
    });
  }
  put(path, body) {
    return this.http.put(path, body).then(result => {
      return result.content;
    });
  }
  patch(path, body) {
    return this.http.patch(path, body);
  }
  delete(path) {
    return this.http.delete(path);
  }
}
