function main() {
  const a = {
    a: 123,
    b: 0,
  };
  console.log(a);
  {
    if (1) {
      a.b = 123;
    }
  }
  console.log(a);
}
main();
