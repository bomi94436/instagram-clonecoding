import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { IsDefined } from 'class-validator';
import { Post, PostHashtag } from './index';

@Table({
  charset: 'utf8',
  collate: 'utf8_general_ci',
})
export default class Hashtag extends Model {
  @IsDefined()
  @Column
  name: string;

  @BelongsToMany(() => Post, () => PostHashtag)
  posts: Post[];
}
