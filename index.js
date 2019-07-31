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

console.log(publickey);
console.log(privatekey);
console.log(address);

////
//  Check if an Address is valid (Boolean)

var validaddress = qreditjs.crypto.validateAddress('Qe2wKrsaeAvoxyNtdt6ZabWjiygXLWuGKK');

console.log(validaddress);

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
    ver err = null;
  }
  else
  {
    // Failed Transaction
    var txid = null;
    var err = sendResult.error;
  }
  
  console.log(txid);
  console.log(err);

})();

////
//  Get current chain height

(async () => {
  
  var currentHeight = await qapi.getBlockHeight();
  
  console.log(currentHeight);
  
})();

////
//  List 10 blocks

(async () => {
  
  var page = 1;
  var limit = 10;
  var id = null;
  var height = null;
  var orderBy = 'height';
  
  var blockList = await qapi.listBlocks(page, limit, id, height, orderBy);
  
  console.log(blockList.data);

})();

////
//  Get block by Height

(async () => {
  
  var height = 3679139;
  
  var blockList = await qapi.getBlockByHeight(height);
  
  console.log(blockList.data[0]);

})();

////
//  Get block by ID

(async () => {
  
  var blockid = '7a0d0214242a3b4326f533b65ae449c4b1fbf3236325b1e76032790e9d74ae7c';
  
  var blockList = await qapi.getBlockById(blockid);
  
  console.log(blockList.data[0]);

})();

////
//  Get Transactions in a block by block ID

(async () => {
  
  var blockid = '7a0d0214242a3b4326f533b65ae449c4b1fbf3236325b1e76032790e9d74ae7c';
  
  var transactionList = await qapi.getTransactionsByBlockID(blockid);
  
  console.log(transactionList.data); 

})();

////
//  Get Transactions by Transaction ID

(async () => {
  
  var txid = '757b9d750b884e9dcb3247314330c54bea7189c52a4037088c1b7b821be023ac';
  
  var transaction = await qapi.getTransactionByID(txid);
  
  console.log(transaction.data); 

})();

////
//  Get Received Transactions to a Specified Address

(async () => {
  
  var address = 'Qe2wKrsaeAvoxyNtdt6ZabWjiygXLWuGKK';
  var page = 1;
  var limig = 100;
  
  var transactions = await qapi.getWalletReceivedTransactions(address);
  
  console.log(transactions.data); 

})();

////
//  Tokens



(async () => {
  
  var tokenList = await qae.listTokens();
  
  console.log(tokenList);
  
})();
