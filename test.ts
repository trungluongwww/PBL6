// import postgres from "./ultilities/strings/content";
// import content from "./ultilities/strings/content";

import { buffer } from "stream/consumers";

// function makeid(length: number) {
//   var result = "";
//   var characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   var charactersLength = characters.length;
//   for (var i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }
// function main() {
//   const a = Date.now() + makeid(10);
//   console.log(a);
// }
// main();

// const a = {
//   _id: "6350d7asdfd596a636276ff6",
//   content: "trungluongw",
//   isRead: false,
//   title: "Selly",
//   updatedAt: Date.now().toString(),
//   targetId: "6350d79fdad596a636276ff6",
//   analyticLabel: null,
//   icon: null,
//   imageURL: null,
//   category: "text",
//   action: {
//     type: "OPEN_APP_BROWSER",
//     value: "https://chat.unibag.xyz/#6350d79fdad596a636276ff6&sourch=selly_app",
//   },
// };

// console.log(JSON.stringify(a));
const getStartEndOfWeek = (date: Date): [Date, Date] => {
  date.setDate(date.getDate() - date.getDay() + 1);

  let startDay = new Date(date);

  date.setDate(date.getDate() + 6);

  let endDate = new Date(date);

  return [startDay, endDate];
};

const a = new Date("2022-11-13 11:00:04.141+00");
console.log(Date.now());
console.log(Date.parse(a.toString()));
