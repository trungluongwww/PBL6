import database from "./database";
import { Express } from "express";
import redis from "./redis";
import delivery from "./delivery";

export default {
  initialize: async (e: Express) => {
    const cfg = process.env;
    await database.connect(cfg);
    // await redis.init(cfg);
    delivery.init(cfg);
  },
};
