export default {
  all: ["today", "last7Days", "last30Days", "byWeek", "byMonth"],
  configs: [
    { id: 1, name: "hôm nay", value: "today" },
    { id: 2, name: "trong 7 ngày qua", value: "last7Days" },
    { id: 3, name: "trong 30 ngày qua", value: "last30Days" },
    { id: 4, name: "theo tuần", value: "byWeek" },
    { id: 5, name: "theo tháng", value: "byMonth" },
  ],
  typeData: {
    toDay: "toDay",
    last7Days: "last7Days",
    last30Days: "last30Days",
    byWeek: "byWeek",
    byMonth: "byMonth",
  },
};
