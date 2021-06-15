import { Sequelize } from 'sequelize-typescript';
import {
  Comment,
  CommentLike,
  Follow,
  Hashtag,
  Picture,
  Post,
  PostHashtag,
  User,
} from './index';
import PostLike from './postlike';

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
  timezone: '+09:00',
});

sequelize.addModels([
  User,
  Post,
  Picture,
  Hashtag,
  PostHashtag,
  Follow,
  PostLike,
  Comment,
  CommentLike,
]);

export default sequelize;
