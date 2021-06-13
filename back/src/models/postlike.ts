import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Post, User } from './index';

@Table({
  charset: 'utf8',
  collate: 'utf8_general_ci',
})
export default class PostLike extends Model {
  @ForeignKey(() => Post)
  @PrimaryKey
  @Column
  postId: number;

  @BelongsTo(() => Post)
  post: Post;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
