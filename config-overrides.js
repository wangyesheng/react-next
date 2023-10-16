const { override, addBabelPlugin } = require("customize-cra");

const path = require("path");

module.exports = override(
  addBabelPlugin([
    "@babel/plugin-proposal-decorators",
    {
      legacy: true,
    },
  ])
);
