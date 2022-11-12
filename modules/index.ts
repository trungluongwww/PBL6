import database from "./database";
import { Express } from "express";
import delivery from "./delivery";
import rabbitmq from "./rabbitmq";
import pub from "./rabbitmq/pub";
import rab from "amqplib/callback_api";
import sub from "./rabbitmq/sub";

export default {
  initialize: async (e: Express) => {
    const cfg = process.env;
    await database.connect(cfg);
    // await redis.init(cfg);
    delivery.init(cfg);

    // rabbit
    rabbitmq.connect();
  },
};
