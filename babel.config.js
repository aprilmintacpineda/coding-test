const alias = require('./importAliases');

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias
      }
    ]
  ]
};
