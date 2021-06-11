import {
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

  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  followerId: number;
}
