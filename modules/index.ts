import database from "./database";
import { Express } from "express";
import delivery from "./delivery";
import rabbitmq from "./rabbitmq";
import email from "./email";

export default {
  initialize: async (e: Express) => {
    const cfg = process.env;
    await database.connect(cfg);

    // await redis.init(cfg);
    delivery.init(cfg);

    // init gmail
    email.init();

    // rabbit
    rabbitmq.connect();
  },
};
