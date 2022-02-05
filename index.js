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
          key: fs.readFileSync("/etc/letsencrypt/live/yoshikai.net/privkey.pem"),
          cert: fs.readFileSync("/etc/letsencrypt/live/yoshikai.net/fullchain.pem")
        },
        secure: true,
      });
      server.listen(relations.from);
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


module.exports = HttpsProxy;
