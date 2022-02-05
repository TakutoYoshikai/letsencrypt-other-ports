#!/usr/bin/env node

const httpProxy = require("http-proxy");
const fs = require("fs");
const cron = require("node-cron");

function HttpsProxy(host, relations) {
  this.servers = [];
  this.start = function() {
    for (const relation of relations) {
      const server = httpProxy.createServer({
        target: `http://localhost:${relation.to}`,
        ssl: {
          key: fs.readFileSync(`/etc/letsencrypt/live/${host}/privkey.pem`),
          cert: fs.readFileSync(`/etc/letsencrypt/live/${host}/fullchain.pem`)
        },
        secure: true,
      });
      server.listen(relation.from);
      this.servers.push(server);
    }
  }

  this.stop = function() {
    for (const server of this.servers) {
      server.close();
    }
    this.servers = [];
  }

  this.restart = function() {
    this.stop();
    this.start();
  }

  this.registerCron = function(schedule) {
    const that = this;
    cron.schedule("0 " + schedule, () => {
      that.restart();
    });
  }
}

if (require.main == module) {
  const host = process.argv[2];
  const from = parseInt(process.argv[3]);
  const to = parseInt(process.argv[4]);
  
  const proxy = new HttpsProxy(host, [
    {
      from,
      to,
    }
  ]);
  proxy.start();
  proxy.registerCron("0 0 1 * *");
} else {
  module.exports = HttpsProxy;
}
