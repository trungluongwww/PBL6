import pub from "./pub";
import amqp from "amqplib/callback_api";
import sub from "./sub";

let amqpConn: amqp.Connection;

const connect = () => {
  const url = process.env["RABBITMQ_URL"] || "http://localhost";

  amqp.connect(url, function (error, conn) {
    if (error) {
      console.error("[AMQP] reconnecting");
      return setTimeout(connect, 1000);
    }
    conn.on("error", function (err) {
      if (err.message !== "Connection closing") {
        console.error("[AMQP] conn error", err.message);
      }
    });
    conn.on("close", function () {
      console.error("[AMQP] reconnecting");
      return setTimeout(connect, 1000);
    });
    // after connected
    amqpConn = conn;

    sub.Subcrises().then();
  });
};

const getConnection = (): amqp.Connection => {
  return amqpConn;
};

export default {
  getConnection,
  connect,
  pub,
};
