var defaults = require("./wdio-bstack.conf.js");
var _ = require("lodash");
let timeStamp = new Date().getTime();
let localIdentifier = `localIdentifier_${timeStamp}`;

var overrides = {
  specs: ["./test/specs/local/local.spec.js"],

  services: [
    [ 'browserstack',
      { 
        app:"bs://<android-app-id>",
        browserstackLocal: true,
      },
    ],
  ],
  
  capabilities: [
    {
      maxInstances: 1,
      device: "Samsung Galaxy A51",
      os_version: "10.0",
      autoGrantPermissions: true,
      platformName: "Android"
    },
  ],
};

const tmpConfig = _.defaultsDeep(overrides, defaults.config);

tmpConfig.capabilities.forEach((caps) => {
  for (const i in tmpConfig.commonCapabilities)
    caps[i] = caps[i] || tmpConfig.commonCapabilities[i];
});

exports.config = tmpConfig;
