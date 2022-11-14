import email from "./index";
import * as fs from "fs";
import parse from "node-html-parser";
import strings from "../../ultilities/strings";

const createOrder = (gmail: string, total: number) => {
  const p = process.cwd() + "/template/new-order.html";

  fs.readFile(p, "utf-8", (err, fd) => {
    if (err) {
      return console.log(`[email] Error when send email to: ${gmail}`);
    }
    const root = parse(fd);
    let field = root.querySelector("#total");
    if (field) {
      field.innerHTML = strings.content.convertToMoneyString(total);
    }

    email.sendEmail([gmail], "Bạn có đơn hàng mới", root.toString());
  });
};

export default {
  createOrder,
};
