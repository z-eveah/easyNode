
/**
 * redis构造器
 * @author evan
 */
// how to use it
// const client = require('./client').init( config);
//
// client.get(key, (err, val) => {
//
// 	if (val) {
// 		// do something
//
// 	} else {
// 		// do otherthing
// 	}
// });
//
// client.set(key, val, (err, res) => {
// 	// do something
// });
//
// client.setex(key, val, (err, res) => {
// 	// do something
// })

const Redis = require('redis');

const _defaultConfig = {
	client: {
		port: 6379,
		host:'127.0.0.1',
		connect_timeout:1
	},
};

class myredis {
	constructor(config){
		this.config = Object.assign({}, _defaultConfig, config);
		this.myRedis = null;
	}

	connect () {
		console.log('config',this.config)
		this.myRedis =  Redis.createClient(this.config.client.port, this.config.client.host,
			{connect_timeout: this.config.client.connect_timeout}
			);
		this.myRedis.on("error", function(err) {
			console.log('redis error',err)
		});

		this.myRedis.on('ready', function () {
			console.log('myredis is ready')
		})
	}

	init () {
		this.connect();
		const instance = this.myRedis;
		const get = instance.get;
		const set = instance.set;
		const setExpires = instance.setex;

		instance.set = (key, value, callback) => {
			if(value !== undefined){
				set.call(instance,key, JSON.stringify(value), callback);
			}
		}

		instance.get = (key,callback) => {
		get.call(instance, key, function (err, reply) {
				if(err) {console.log('redis get', err)};
				callback(null, JSON.parse(reply))
			});
		}

		instance.setex = (key, maxAge, value, callback) => {
			if(value !== undefined){
				setExpires.call(instance, key, maxAge, JSON.stringify(value), callback)
			}
		}

		return instance;
	}
}

module.exports = myredis;
