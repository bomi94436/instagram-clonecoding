import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Post } from '.';
import { IsDefined, IsInt, IsString } from 'class-validator';

@Table({
  charset: 'utf8',
  collate: 'utf8_general_ci',
})
export default class Picture extends Model {
  @IsDefined()
  @IsString()
  @Column
  type: 'image' | 'video';

  @IsDefined()
  @IsInt()
  @Column
  size: number;

  @IsDefined()
  @IsString()
  @Column
  ext: string;

  @IsDefined()
  @IsString()
  @Column
  src: string;

  @ForeignKey(() => Post)
  @Column
  postId: number;

  @BelongsTo(() => Post)
  post: Post;
}
