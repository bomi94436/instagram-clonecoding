import { Column, Default, HasMany, Model, Table } from 'sequelize-typescript';
import {
  IsDefined,
  IsEmail,
  IsOptional,
  Length,
  Matches,
} from 'class-validator';
import { Comment, CommentLike, Follow, Post } from '.';
import PostLike from './postlike';

@Table({
  charset: 'utf8',
  collate: 'utf8_general_ci',
})
export default class User extends Model {
  @IsDefined({
    message: '이메일을 입력해야 합니다.',
  })
  @IsEmail({}, { message: '아이디는 이메일 형식이어야 합니다.' })
  @Column
  email: string;

  @IsDefined({
    message: '비밀번호를 입력해야 합니다.',
  })
  @Length(6, 18, {
    message: '비밀번호는 6자 이상 18자 이하여야 합니다.',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
    message: '비밀번호는 영어, 숫자 조합이어야 합니다.',
  })
  @Column
  password: string;

  @IsDefined({
    message: '닉네임을 입력해야 합니다.',
  })
  @Length(4, 16, {
    message: '닉네임은 4자 이상 16자 이하여야 합니다.',
  })
  @Matches(/^([가-힣ㄱ-ㅎa-zA-Z0-9._])+$/, {
    message: '닉네임은 한글, 영어, 숫자, 특수문자(. _)로만 가능합니다.',
  })
  @Column
  nickname: string;

  @IsOptional()
  @Column
  token: string;

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Comment)
  comments: Comment[];

  // 누군가 -> 나
  @HasMany(() => Follow, 'followingId')
  followers: Follow[];

  // 나 -> 누군가
  @HasMany(() => Follow, 'followerId')
  followings: Follow[];

  @HasMany(() => PostLike)
  likedPost: PostLike[];

  @HasMany(() => CommentLike)
  likedComment: CommentLike[];

  // 작성한 게시글 개수
  @Default(0)
  @Column
  postCount: number;
}
