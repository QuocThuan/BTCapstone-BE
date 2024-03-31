import { Sequelize } from 'sequelize';
import config from './../config/config.js';

const sequelize = new Sequelize(config.databasse, config.user, config.pass, {
    host: config.host,
    port: config.port,
    dialect: config.dialect
})

export default sequelize

sequelize.authenticate()
    .then(() => {
        console.log('Connected to the database.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
