const plugins = require('../plugin'),
  middleWares = require('../middleWare'),
  config = require('./base.config.js');

module.exports = Object.assign({}, config, {
    plugins: {
      mysql: new plugins.mysql({
        config: {
          connectionLimit: 10,
          host: '127.0.0.1',
          port: '27017',
          user: 'root',
          password: 'ycdn8Tm5Nj',
          database: 'test'
        },
      }),
      mongo: new plugins.mongo({
        dbAddress: 'mongodb://127.0.0.1:27017',
        dbName: 'test',
        error(err){
          console.log(err);
        }
      }),

      redis: new plugins.myredis({
				client: {
					port: 6379,
					host:'127.0.0.1',
					connect_timeout:2000
				},
      })
    },
    middleWare: [
      
    ]
});