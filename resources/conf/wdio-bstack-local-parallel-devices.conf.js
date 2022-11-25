var defaults = require("./wdio-bstack.conf.js");
var browserstack = require("browserstack-local");
var _ = require("lodash");

let timeStamp = new Date().getTime();
let localIdentifier = `localIdentifier_${timeStamp}`;
for (let i = 0; i < defaults.config.capabilities.length; i++) {
  
  if(defaults.config.capabilities[i].platformName==="Android")
  {var x=Object.assign({},defaults.config.capabilities[i],{autoGrantPermissions:true,maxInstances:1,"browserstack.localIdentifier": localIdentifier});
  defaults.config.capabilities[i]=x;
 }
  else {
    var x=Object.assign({},defaults.config.capabilities[i],{gpsEnabled:true,automationName:"XCUITest",maxInstances:1,"browserstack.localIdentifier": localIdentifier});
    defaults.config.capabilities[i]=x;
   }
  
}

var overrides = {
  specs: ["./test/specs/local/local.spec.js"],


  onPrepare: (config, capabilities) => {
    console.log("Connecting local");
    return new Promise((resolve, reject) => {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start(
        {
          key: process.env.BROWSERSTACK_ACCESSKEY,
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
