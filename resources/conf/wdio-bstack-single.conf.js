var defaults = require("./wdio-bstack.conf.js");
var _ = require("lodash");

var overrides = {
  specs: ["./test/specs/e2e/e2e.spec.js"],

  capabilities: [
    {autoGrantPermissions:true,
      maxInstances:1
    },
  ],
};

const tmpConfig = _.defaultsDeep(overrides, defaults.config);

exports.config = tmpConfig;
