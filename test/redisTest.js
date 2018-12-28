let redis = require('../plugin/redis/redis');
let should = require('should');
let mocha = require('mocha');
let runtime = require('babel-plugin-transform-runtime');
let polyfill = require('babel-polyfill');

let myRedis;

module.exports = async () => {

	try {
        describe('redis 初始化', () => {
            describe('#init', () => {
                it('redis init', async () => {
                    try {
                    	myRedis = await new redis(
                          {client:{
														port: 6379,
														host:'127.0.0.1',
														connect_timeout:1000
													}}).init();
											myRedis.should.be.type('object');
                    } catch (e) {
                        console.log(e);
                    }
                });
            });

						describe('#set', () => {
            	it('redis set value', () => {
            		try	{
									myRedis.set('test', 1, (err, res) => {
										res.should.be.ok;
									});
								} catch (e) {
            			console.log(e)
								}
							})
						});

						describe('#get', () => {
							it('redis get value', () => {
								try{
									myRedis.get('test', (err, reply) => {
										reply.should.be.eql(1)
									})
								}catch (e) {
									console.log(e)
								}
							})
						})
        });
    } catch (e) {
        console.log(e);
    }
};