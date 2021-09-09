const glob = require("glob");

glob("**/*.test.js", function (error, files) {
  files.forEach((file) => require(`./${file}`));
});
