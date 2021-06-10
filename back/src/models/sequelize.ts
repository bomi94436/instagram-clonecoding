import { Sequelize } from 'sequelize-typescript';
import { Follow, Hashtag, Picture, Post, PostHashtag, User } from './index';

const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];

const sequelize = new Sequelize({
  database: config.database,
  username: config.username,
  password: config.password,
  host: config.host,
  port: config.port,
  dialect: 'mysql',
  define: config.define,
});

sequelize.addModels([User, Post, Picture, Hashtag, PostHashtag, Follow]);

export default sequelize;
