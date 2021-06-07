import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Hashtag, Post } from './index';

@Table({
  charset: 'utf8',
  collate: 'utf8_general_ci',
})
export default class PostHashtag extends Model {
  @ForeignKey(() => Post)
  @Column
  postId: number;

  @ForeignKey(() => Hashtag)
  @Column
  hashtagId: number;
}
