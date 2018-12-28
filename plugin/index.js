const mongo = require('./mongo'),
      mysql = require('./mysql');
      myredis = require('./redis');
      // fastInterface = require('./fastInterface');
module.exports = {
  mongo,
  mysql,
  myredis
  // fastInterface
};