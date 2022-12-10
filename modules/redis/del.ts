import redis from "./index";

const byKey = async (key: string) => {
    await redis.getInstance().del(key);
};

export default {
    byKey,
};