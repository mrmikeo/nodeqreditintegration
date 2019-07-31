const qreditjs = require("qreditjs");
const qaeApi = require("nodeQaeApi");
const qreditApi = require("nodeQreditApi");

const qae = new qaeApi.default();
const qapi = new qreditApi.default();

////
//  Generate New or Existing Key / Address Pair from a Passphrase

var keys = qreditjs.crypto.getKeys("long password or some kind of passphrase");
var publickey = keys.publicKey;
var privatekey = keys.d.toBuffer().toString("hex");
var address = qreditjs.crypto.getAddress(publickey);

////
//  Check if an Address is valid (Boolean)

var validaddress = qreditjs.crypto.validateAddress('Qe2wKrsaeAvoxyNtdt6ZabWjiygXLWuGKK');

////
//  Sending a Transaction

(async () => {
  
  var feeOverride = 2000000;  // 0.02 XQR
  var qreditAmount = 100000000; // 1 XQR
  var passPhrase = privatekey;
  var toAddress = 'QediyYJcErKnqpZinAWuUdamGUYeFYyaiY';
  var vendorField = null; // String, up to 255 characters
  var secondPassphrase = null; // Not typically used, must be registered after address creation
  var version = null; // Not typically used
  
  var transaction = qreditjs.transaction.createTransaction(toAddress, qreditAmount, vendorField, passPhrase, secondPassphrase, version, feeOverride);

  var transactionId = transaction.id;
  
  var sendResult = await qapi.createTransaction([transaction]);
  
  if (sendResult.data && sendResult.data.accept[0] == transactionId)
  {
    // Successful Transaction
    var txid = transactionId;
  }
  else
  {
    // Failed Transaction
    var err = sendResult.error;
  }

})();

////
//  Get current chain height

(async () => {
  
  var currentHeight = await qapi.getBlockHeight();
  
})();






(async () => {
  
  var tokenList = await qae.listTokens();
  
  console.log(tokenList);
  
})();
