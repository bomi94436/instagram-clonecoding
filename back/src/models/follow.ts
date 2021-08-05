import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './index';

@Table({
  charset: 'utf8',
  collate: 'utf8_general_ci',
})
export default class Follow extends Model {
  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  followingId: number;

  @BelongsTo(() => User, 'followingId')
  following: User;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  followerId: number;

  @BelongsTo(() => User, 'followerId')
  follower: User;
}
