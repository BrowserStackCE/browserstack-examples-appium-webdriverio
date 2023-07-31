var defaults = require("./wdio.conf.js");
var _ = require("lodash");

var overrides = {
  port: 4723,
  path: '/',
  isSimulator: true,
  specs: ["./test/specs/e2e/e2e.spec.js"],

  capabilities: [
    {
      maxInstances: 1,
      device: "Google Pixel 5",
      os_version: "11.0",
      app: "bin/<androidAppName>",
      autoGrantPermissions: true,
      platformName: "Android",
    },
  ],

  services:[
    ['browserstack', {
        testObservability: true,
        testObservabilityOptions: {
            user: process.env.BROWSERSTACK_USERNAME,
            key: process.env.BROWSERSTACK_ACCESS_KEY,
            projectName: 'browserstack-examples-appium-webdriverio',
            buildName: 'browserstack-examples-appium-webdriverio-build',
            buildTag: 'appium wdio'
        },
    }]
],
};

exports.config = _.defaultsDeep(overrides, defaults.config);
