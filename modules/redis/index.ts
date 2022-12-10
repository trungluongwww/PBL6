import { createClient, RedisClientType } from "redis";
import set from "./set";
import get from "./get";
import del from "./del";
import key from './key'
let client: RedisClientType;

const init = async (cfg: NodeJS.ProcessEnv) => {
    client = createClient({
        url: cfg.REDIS_URI,
        username: cfg.REDIS_USERNAME,
        password: cfg.REDIS_PASSWORD,
        database: Number(cfg.REDIS_DATABASE),
    });
    client.on("error", (err) => console.log("Redis Client Error", err));

    try {
        await client.connect();
        console.log(`⚡️[redis]: connected to ${cfg.REDIS_URI}`);
    } catch (err: unknown) {
        console.log(`⚡️[redis]: error when connect to ${cfg.REDIS_URI}`);
        console.log(err);
        process.exit(1);
    }
};

const getInstance = (): RedisClientType => {
    return client;
};

export default {
    getInstance,
    init,
    set,
    get,
    del,
    key
};