const main = async () => {
  var x = 0;

  switch (x) {
    case 10:
      console.log(10);
    case 20:
      console.log(20);
    default:
      console.log("default");
  }
  console.log("pass switch");
};
main().then();
