import rabbitmq from "./index";
import { IMessageRabbit, INewUser } from "../../interfaces/rabbit";
import constants from "../../constants";
import services from "../../server/services";
import { flatMap } from "lodash";
import { newCustomerEvent } from "../../constants/rabbit";
import { admin } from "../../constants/permission";
import { IProductCreate } from "../../interfaces/product";

const Subcrises = async () => {
  const connect = rabbitmq.getConnection();

  connect.createChannel((err, channel) => {
    channel.assertExchange("ECommerce", "fanout", {
      durable: false,
    });
    channel.assertQueue(
      "Order-sv3",
      {
        exclusive: false,
        durable: true,
        autoDelete: false,
        arguments: null,
      },
      function (error2, q) {
        if (error2) {
          throw error2;
        }
        console.log(
          " [*] Waiting for messages in %s. To exit press CTRL+C",
          q.queue
        );
        channel.bindQueue(q.queue, "ECommerce", "");
        channel.consume(
          q.queue,
          function (msg) {
            if (msg?.content) {
              const data = JSON.parse(
                Buffer.from(msg.content).toString()
              ) as IMessageRabbit;

              console.log("routing key: " + msg.fields.routingKey);

              switch (msg.fields.routingKey) {
                case constants.rabbit.newCustomerEvent:
                  addUser(data, "customer").then();
                  break;
                case constants.rabbit.newShopEvent:
                  addUser(data, "shop").then();
                  break;
                case (constants.rabbit.updateAccountEvent,
                constants.rabbit.newCustomerEvent):
                  addUser(data, null).then();
                  break;
                case constants.rabbit.newProduct:
                  addProduct(data).then();
                default:
                  break;
              }
            }
          },
          {
            noAck: true,
          }
        );
      }
    );
  });
};

const addUser = async (msg: IMessageRabbit, role: string | null) => {
  const newUser = JSON.parse(msg.message) as INewUser;
  await services.account.create.addUserFromRabbit(newUser, role);
};

const addProduct = async (msg: IMessageRabbit) => {
  const p = JSON.parse(msg.message) as IProductCreate;
  await services.product.create.fromRabbit(p);
};

export default {
  Subcrises,
};
