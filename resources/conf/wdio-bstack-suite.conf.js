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

  capabilities: [
    {
      maxInstances: 1,
      autoGrantPermissions: true,
     
    },
  ],
};

const tmpConfig = _.defaultsDeep(overrides, defaults.config);

exports.config = tmpConfig;
