var defaults = require("./wdio-bstack.conf.js");
var browserstack = require("browserstack-local");
var _ = require("lodash");

let timeStamp = new Date().getTime();
let localIdentifier = timeStamp;

var overrides = {
  specs: ["./test/specs/local/local.spec.js"],
  services: [
    [ 'browserstack',
    {
      app: "bs://<android-app-id>"
      
      },
      {
        browserstackLocal: true,
        opts: {
          localIdentifier: localIdentifier,
        }
      },
      
    ],
  ],
  capabilities: [
    {
      maxInstances: 1,
      device: "Samsung Galaxy A51",
      os_version: "10.0",
      autoGrantPermissions: true,
      platformName: "Android",
      // "browserstack.localIdentifier": localIdentifier,
    },
  ],
};

const tmpConfig = _.defaultsDeep(overrides, defaults.config);

tmpConfig.capabilities.forEach((caps) => {
  for (const i in tmpConfig.commonCapabilities)
    caps[i] = caps[i] || tmpConfig.commonCapabilities[i];
});

exports.config = tmpConfig;