import express from "express";
import dotenv from "dotenv";
import router from "./server/routes";
import modules from "./modules";
import localtunnel from "localtunnel";

async function init() {
  const app = express();
  dotenv.config();
  await modules.initialize(app);
  router(app);
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log("server listen on port: ", port);
  });

  const tunnel = await localtunnel({
    port: 5000,
    subdomain: "trungluong",
  });

  console.log(tunnel.url);
  tunnel.on("close", () => {
    console.log("close");
  });
}

init().then();
