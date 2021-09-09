const sum = require("./sum");

test("another add 1 + 1 to equal 2", () => {
  expect(sum(1, 1)).toBe(2);
});
