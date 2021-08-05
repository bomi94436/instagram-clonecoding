import {
  BelongsTo,
  BelongsToMany,
  Column,
  Default,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { IsDefined, IsString } from 'class-validator';
import { Comment, Hashtag, Picture, PostHashtag, User } from './index';
import PostLike from './postlike';
import { DataTypes } from 'sequelize';

@Table({
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
})
export default class Post extends Model {
  @IsDefined({
    message: '내용을 입력해야 합니다.',
  })
  @IsString()
  @Column(DataTypes.TEXT)
  content: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Picture)
  pictures: Picture[];

  @BelongsToMany(() => Hashtag, () => PostHashtag)
  hashtags: Hashtag[];

  // 좋아요한 사람 수
  @Default(0)
  @Column
  likeCount: number;

  @HasMany(() => PostLike)
  likedUser: PostLike[];

  @HasMany(() => Comment)
  comments: Comment[];
}
