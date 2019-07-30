"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require("ioredis");
const config = require(`${process.cwd()}/config`).default;
exports.default = (app) => {
    if (config.redis && config.redis.enable) {
        const options = config.redis.options;
        const redis = new Redis(options.port, options.host, {
            db: options.db,
            password: options.password,
        });
        redis.on('connect', () => {
            // app.logger.info(`Redis connected to: ${config.redis.options.host}`);
            console.log(`Redis connected to: ${config.redis.options.host}`);
        });
        redis.on('error', (err) => {
            app
                .logger
                .error(`Redis connect to ${config.redis.options.host} error: ${err}`);
        });
        return redis;
    }
    return undefined;
};
//# sourceMappingURL=redis.js.map