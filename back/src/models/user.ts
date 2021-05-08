import { AllowNull, Column, Model, Table, Unique } from 'sequelize-typescript';

@Table({
  charset: 'utf8',
  collate: 'utf8_general_ci',
})
export default class User extends Model {
  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Column
  nickname: string;
}
