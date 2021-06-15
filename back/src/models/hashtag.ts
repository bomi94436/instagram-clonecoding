import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { IsDefined } from 'class-validator';
import { Post, PostHashtag } from './index';

@Table({
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
})
export default class Hashtag extends Model {
  @IsDefined()
  @Column
  name: string;

  @BelongsToMany(() => Post, () => PostHashtag)
  posts: Post[];
}
