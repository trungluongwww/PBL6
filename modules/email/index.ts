import nodemailer from "nodemailer";
import order from "./order";
let transport: nodemailer.Transporter;

const init = () => {
  transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  console.log("[] gmail connected");
};

const getGmail = () => {
  return transport;
};

const sendEmail = (gmail: Array<string>, title: string, content: string) => {
  const mailOptions = {
    to: gmail.length > 1 ? gmail.join(",") : gmail[0],
    subject: title,
    html: content,
  };

  // send
  getGmail().sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export default {
  init,
  sendEmail,
  order,
};
