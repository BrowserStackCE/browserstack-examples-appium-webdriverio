var defaults = require("./wdio-bstack.conf.js");
var _ = require("lodash");
let timeStamp = new Date().getTime();
let localIdentifier = `localIdentifier_${timeStamp}`;

var overrides = {
  specs: ["./test/specs/local/local.spec.js"],

  services: [
    [ 'browserstack',
      { 
        browserstackLocal: true,
      },  
    ],
  ],

  capabilities: [
    {
      maxInstances: 1,
      device: "Samsung Galaxy A51",
      os_version: "10.0",
      app: "bs://<android-app-id>",
      platformName: "Android",
      autoGrantPermissions: true,
    },
    {
      maxInstances: 1,
      device: "iPhone 12 Pro",
      os_version: "14",
      app: "bs://<ios-app-id>",
      platformName: "iOS",
      automationName: "XCUITest",
      gpsEnabled: "true",
    },
  ],
};

const tmpConfig = _.defaultsDeep(overrides, defaults.config);

tmpConfig.capabilities.forEach((caps) => {
  for (const i in tmpConfig.commonCapabilities)
    caps[i] = caps[i] || tmpConfig.commonCapabilities[i];
});

exports.config = tmpConfig;
