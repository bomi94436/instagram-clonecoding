import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Post } from '.';
import { IsDefined } from 'class-validator';

@Table({
  charset: 'utf8',
  collate: 'utf8_general_ci',
})
export default class Picture extends Model {
  @IsDefined()
  @Column
  type: 'image' | 'video';

  @IsDefined()
  @Column
  size: number;

  @IsDefined()
  @Column
  ext: string;

  @IsDefined()
  @Column
  src: string;

  @ForeignKey(() => Post)
  @Column
  postId: number;

  @BelongsTo(() => Post)
  post: Post;
}
