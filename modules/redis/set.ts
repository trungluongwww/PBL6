import redis from "./index";

const keyValue = async (key: string, value: string): Promise<void> => {
    await redis.getInstance().set(key, value);
};

const keyValueWithTTL = async (
    key: string,
    value: string,
    ttl: number
): Promise<void> => {
    await redis.getInstance().set(key, value, {
        EX: ttl,
    });
};

export default {
    keyValue,
    keyValueWithTTL,
};