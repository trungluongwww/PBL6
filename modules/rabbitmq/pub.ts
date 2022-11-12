import rabbitmq from "./index";
import { IMessageRabbit } from "../../interfaces/rabbit";

const Public = (key: string, data: any) => {
  const conn = rabbitmq.getConnection();

  const message = {
    message: JSON.stringify(data),
  };
  const strData = JSON.stringify(message);

  conn.createChannel((err, channel) => {
    if (err) {
      console.log(`[Error] err when create channel ${channel}`);
      throw err;
    }

    channel.assertExchange("ECommerce", "fanout", {
      durable: false,
    });

    channel.publish("ECommerce", key, Buffer.from(strData));
  });
};

export default {
  Public,
};
