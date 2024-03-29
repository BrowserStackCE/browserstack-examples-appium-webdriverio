var defaults = require("./wdio-bstack.conf.js");
var _ = require("lodash");

var overrides = {
  specs: [
    "./test/specs/e2e/e2e.spec.js",
    "./test/specs/login/*.spec.js",
    "./test/specs/offers/*.spec.js",
    "./test/specs/user/*.spec.js",
    "./test/specs/cart/*.spec.js",
  ],
  services: [['browserstack',{
    testObservability: true,
            testObservabilityOptions: {
                'projectName': 'browserstack-examples-appium-webdriverio',
                'buildName': 'browserstack-examples-appium-webdriverio-build',
                'buildTag': 'appium wdio'
            },
  }
]],

  capabilities: [
    {
      maxInstances: 2,
      device: "Samsung Galaxy A51",
      os_version: "10.0",
      app: "bs://<android-app-id>",
      autoGrantPermissions: true,
      platformName: "Android",
    },
    {
      maxInstances: 2,
      device: "iPhone 12 Pro",
      platformName: "iOS",
      os_version: "14",
      gpsEnabled: "true",
      automationName: "XCUITest",
      app: "bs://<ios-app-id>",
    },
  ],
};

const tmpConfig = _.defaultsDeep(overrides, defaults.config);

tmpConfig.capabilities.forEach((caps) => {
  for (const i in tmpConfig.commonCapabilities)
    caps[i] = caps[i] || tmpConfig.commonCapabilities[i];
});

exports.config = tmpConfig;
