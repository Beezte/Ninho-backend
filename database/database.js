const Sequelize = require("sequelize");

const connection = new Sequelize('backend',
'root', '', {
        host: '127.0.0.1',
        port: 3307,
        password: '',
    dialect: 'mysql'
});

module.exports = connection;