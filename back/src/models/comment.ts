import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { IsString, MinLength } from 'class-validator';
import { DataTypes } from 'sequelize';
import { CommentLike, Post, User } from './index';

@Table({
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
})
export default class Comment extends Model {
  @MinLength(1, {
    message: '내용을 입력해야 합니다.',
  })
  @IsString()
  @Column(DataTypes.TEXT)
  content: string;

  @ForeignKey(() => Post)
  @Column
  postId: number;

  @BelongsTo(() => Post)
  post: Post;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Comment)
  @Column
  replyId: number;

  @HasMany(() => Comment, 'replyId')
  replies: Comment[];

  @HasMany(() => CommentLike)
  likedUser: CommentLike[];
}
