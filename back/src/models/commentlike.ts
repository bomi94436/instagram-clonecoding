import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Comment, User } from './index';

@Table({
  charset: 'utf8',
  collate: 'utf8_general_ci',
})
export default class CommentLike extends Model {
  @ForeignKey(() => Comment)
  @PrimaryKey
  @Column
  commentId: number;

  @BelongsTo(() => Comment)
  comment: Comment;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
