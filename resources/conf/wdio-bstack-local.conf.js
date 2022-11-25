var defaults = require("./wdio-bstack.conf.js");
var browserstack = require("browserstack-local");
var _ = require("lodash");

let timeStamp = new Date().getTime();
let localIdentifier = `localIdentifier_${timeStamp}`;
if(defaults.config.capabilities[0].platformName==="Android")
  {var x=Object.assign({},defaults.config.capabilities[0],{autoGrantPermissions:true,maxInstances:1,"browserstack.localIdentifier": localIdentifier});
  defaults.config.capabilities[0]=x;
 }
  else {
    var x=Object.assign({},defaults.config.capabilities[0],{gpsEnabled:true,automationName:"XCUITest",maxInstances:1,"browserstack.localIdentifier": localIdentifier});
    defaults.config.capabilities[0]=x;
   }

var overrides = {
  specs: ["./test/specs/local/local.spec.js"],

  
  onPrepare: (config, capabilities) => {
    console.log("Connecting local");
    return new Promise((resolve, reject) => {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start(
        {
          key: process.env.BROWSERSTACK_ACCESS_KEY,
          localIdentifier: localIdentifier,
        },
        (error) => {
          if (error) return reject(error);
          console.log("Connected. Now testing...");
          resolve();
        }
      );
    });
  },
  onComplete: function (capabilties, specs) {
    console.log("Closing local tunnel");
    return new Promise((resolve, reject) => {
      exports.bs_local.stop((error) => {
        if (error) return reject(error);
        console.log("Stopped BrowserStackLocal");
        resolve();
      });
    });
  },
};

const tmpConfig = _.defaultsDeep(overrides, defaults.config);


exports.config = tmpConfig;
