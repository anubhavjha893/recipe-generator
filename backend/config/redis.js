
const Redis = require("ioredis");

let redisInstance = null; 

function getRedisInstance() {
  if (!redisInstance) {
    redisInstance = new Redis({
      host: "redis-16399.c14.us-east-1-2.ec2.redns.redis-cloud.com",
      port: 16399, 
      password: "WR3LLKyDcKeajmLQTn7Oz8u0XCOGt5PB",
    });

    redisInstance.on("connect", () => {
      console.log("Redis Connected");
    });

    redisInstance.on("error", (err) => {
      console.error("Redis Error:", err);
    });
  }
  return redisInstance;
}

module.exports = getRedisInstance;
