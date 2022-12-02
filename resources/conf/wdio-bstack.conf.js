var defaults = require("./wdio.conf.js");
var _ = require("lodash");

var overrides = {
  
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  
  commonCapabilities: {
    "browserstack.debug": true,
    // name : require("minimist")(process.argv.slice(2))["bstack-session-name"] || "default_name",
    build: process.env.BROWSERSTACK_BUILD_NAME || "browserstack-examples-appium-webdriverio" + " - " + new Date().getTime(),
    project: "browserstack-examples-appium-webdriverio",    
  },


};

exports.config = _.defaultsDeep(overrides, defaults.config);