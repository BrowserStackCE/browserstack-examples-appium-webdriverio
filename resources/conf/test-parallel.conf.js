const parallelConfig = {
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    hostname: 'hub.browserstack.com',
    capabilities: [
        {
            device: "Samsung Galaxy A51",
            os_version: "10.0",
            app: "bs://<android-app-id>",
            platformName: "Android",
          },
          {
            device: "Google Pixel 7",
            os_version: "13.0",
            app: "bs://<android-app-id>",
            platformName: "Android",
          },
          {
            device: "OnePlus 9",
            os_version: "11.0",
            app: "bs://<android-app-id>",
            platformName: "Android",
          },
          {
            device: "iPhone 14",
            os_version: "16",
            app: "bs://<ios-app-id>",
            platformName: "iOS",
          },
          
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
  