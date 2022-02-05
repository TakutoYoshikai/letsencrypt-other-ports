# letsencrypt-other-ports
This is a reverse proxy to use other ports than 80, 443 with let's encrypt. You can implement https communication quickly.

### Requirements
* Linux
* Node.js
* Download Let's Encrypt certs.

### Usage
**install**
```bash
npm install --save letsencrypt-other-ports
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

proxy.stop();

proxy.restart();

// cron to refresh cert
proxy.registerCron("0 0 1 * *");
```

**command**
```bash
npm install -g TakutoYoshikai/letsencrypt-other-ports
# https://example.com:8080 -> http://example.com:8081
lop example.com 8080 8081
```

### Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

### License
MIT License
