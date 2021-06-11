import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Post, User } from './index';

@Table({
  charset: 'utf8',
  collate: 'utf8_general_ci',
})
export default class PostLike extends Model {
  @ForeignKey(() => Post)
  @Column
  postId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
