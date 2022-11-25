var defaults = require("./wdio.conf.js");
var test_config = require("./test.conf.js");


var test_config2 = require("./test-parallel.conf.js");
var test_local = require("./test-local.conf.js");
var test_loca_parallel=require("./test-parallel-local.conf");



var _ = require("lodash");

var overrides = {
  onBrowserstack: true,
  


  services: ["browserstack"],

  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    if (require("minimist")(process.argv.slice(2))["bstack-session-name"]) {
      await driver.executeScript(
        'browserstack_executor: {"action": "setSessionName", "arguments": {"name":"' +
          require("minimist")(process.argv.slice(2))["bstack-session-name"] +
          '" }}',
        []
      );
    } else {
      await driver.executeScript(
        'browserstack_executor: {"action": "setSessionName", "arguments": {"name":"' +
          test.title +
          '" }}',
        []
      );
    }

    if (passed) {
      await driver.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}',
        []
      );
    } else {
      const reason = error
        .toString()
        .replace(/[^a-zA-Z0-9.]/g, " ")
        .substring(0, 255);
      await driver.takeScreenshot();
      await driver.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "' +
          reason +
          '"}}',
        []
      );
    }
  },
};

exports.config = _.defaultsDeep(overrides, test_config.config);

