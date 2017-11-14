module.exports.connections = {
    localDiskDb: {
    adapter: 'sails-disk'
  },
  connection: {
    adapter: 'sails-mysql',
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'b7b79e710a8d1e', //optional
    password: '58f7a65b', //optional
    database: 'heroku_343d665a84dad1d' //optional
  }
};
