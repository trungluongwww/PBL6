import redis from "./index";

const byKey = async (key: string): Promise<string | null> => {
    return await redis.getInstance().get(key);
};

export default {
    byKey,
};