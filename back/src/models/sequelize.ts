import { Sequelize } from 'sequelize-typescript';
import User from './user';

const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];

const sequelize = new Sequelize({
  database: config.database,
  username: config.username,
  password: config.password,
  port: config.port,
  dialect: 'mysql',
  define: config.define,
});

sequelize.addModels([User]);

export default sequelize;
