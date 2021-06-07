import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { IsDefined } from 'class-validator';
import { Hashtag, Picture, PostHashtag, User } from './index';

@Table({
  charset: 'utf8',
  collate: 'utf8_general_ci',
})
export default class Post extends Model {
  @IsDefined({
    message: '내용을 입력해야 합니다.',
  })
  @Column
  content: string;

  @ForeignKey(() => User)
  @IsDefined()
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Picture)
  pictures: Picture[];

  @BelongsToMany(() => Hashtag, () => PostHashtag)
  hashtags: Hashtag[];
}
