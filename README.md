# letsencrypt-other-ports
This is a reverse proxy to use other ports than 80, 443 with let's encrypt.

### Requirements
* Linux
* Node.js
* Downloaded Let's encrypt certs.

### Usage
**install**
```bash
npm install --save TakutoYoshikai/letsencrypt-other-ports
```

**example**
```javascript
const HttpsProxy = require("letsencrypt-other-ports");

const proxy = new HttpsProxy("example.com", [
  // https://example.com:8080 -> http://example.com:8081
  {
    from: 8080,
    to: 8081
  },
  // https://example.com:5021 -> http://example.com:5001
  {
    from: 5021,
    to: 5001
  }
]);

proxy.start();

// cron to refresh cert
proxy.registerCron("0 0 1 * *");
```


### License
MIT License
