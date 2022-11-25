const parallelConfig = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  hostname: 'hub.browserstack.com',
  capabilities: [
      {
          device: "Samsung Galaxy A51",
          os_version: "10.0",
          app: "bs://073a9a03ef8db1031b8111bf43e75768187d9600",
          platformName: "Android",
          "browserstack.local": true,

        }
  ],
  commonCapabilities: {
    "browserstack.debug": true,
    name : require("minimist")(process.argv.slice(2))["bstack-session-name"] || "default_name",
    build: process.env.BROWSERSTACK_BUILD_NAME || "browserstack-examples-appium-webdriverio" + " - " + new Date().getTime(),
    project: "browserstack-examples-appium-webdriverio",  
  },
  maxInstances: 10
};
const { config: baseConfig } = require('./wdio.conf.js');
exports.config = { ...baseConfig, ...parallelConfig };
// Code to support common capabilities
exports.config.capabilities.forEach(function(caps) {
  for (var i in exports.config.commonCapabilities)
    caps[i] = caps[i] || exports.config.commonCapabilities[i] ;
});
// console.log(exports.config.capabilities);