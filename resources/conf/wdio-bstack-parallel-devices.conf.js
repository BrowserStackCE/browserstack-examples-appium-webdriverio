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

  
};

const tmpConfig = _.defaultsDeep(overrides, defaults.config);



for (let i = 0; i < tmpConfig.capabilities.length; i++) {
  
  if(tmpConfig.capabilities[i].platformName==="Android")
  {var x=Object.assign({},tmpConfig.capabilities[i],{autoGrantPermissions:true,maxInstances:2});
  tmpConfig.capabilities[i]=x;
 }
  else {
    var x=Object.assign({},tmpConfig.capabilities[i],{gpsEnabled:true,automationName:"XCUITest",maxInstances:2});
    tmpConfig.capabilities[i]=x;
   }
  
}




exports.config = tmpConfig;
