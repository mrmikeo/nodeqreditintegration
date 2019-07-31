const qreditjs = require("qreditjs");
const qaeApi = require("nodeQaeApi");
const qreditApi = require("nodeQreditApi");

const qae = new qaeApi.default();
const qapi = new qreditApi.default();

(async () => {
  
  var currentHeight = await qapi.getBlockHeight();
  
  console.log("Blockchain Height: " + currentHeight);
  
})();

(async () => {
  
  var tokenList = await qae.listTokens();
  
  console.log(tokenList);
  
})();
