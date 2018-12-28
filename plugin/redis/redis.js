/**
 * @description redis构造器
 * @author evan
 * @date 2018/12/21
 * @param {Object} config 初始化信息
 * @return {Object} instance redis 实例
 * @example 示例
 *  支持 set get setex（设置过期时间）
 *
 *  how to use it
 *  step 1:  const client = require('./client').init( config);
 *  step 2: client.get(key, (err, val) => {})
 *  step 3: client.set(key, val, (err, res) => {})
 *  step 3: client.setex(key, val, maxage, (err, res) => {{ })
 */

const Redis = require('redis');

const _defaultConfig = {
	client: {
		port: 6379,
		host:'127.0.0.1',
		connect_timeout:1000
	},
};

class myredis {
	constructor(config){
		this.config = Object.assign({}, _defaultConfig, config);
		this.myRedis = null;
	}

	connect () {
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
		return this.myRedis;
	}

	set (key, value, callback) {
		if(value !== undefined){
			this.myRedis.set.call(this.myRedis, key, JSON.stringify(value), callback);
		}
	}

	get (key,callback) {
		this.myRedis.get.call(this.myRedis, key, function (err, reply) {
			if(err) {console.log('redis get', err)}
			callback(null, JSON.parse(reply))
		});
	}

	setex  (key, maxAge, value, callback) {
		if(value !== undefined){
			this.myRedis.setExpires.call(this.myRedis, key, maxAge, JSON.stringify(value), callback)
		}
	}
}

module.exports = myredis;
