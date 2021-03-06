declare interface ResponseData<D = any> {
  success: boolean;
  message: string;
  data?: D;
  mode?: 'home' | 'explore';
  lastId?: number;
}

declare interface UserInfo {
  id: number | null;
  email: string | null;
  nickname: string | null;
  profile?: string | undefined;
  likedPost: { postId: number }[];
  postCount: number | null;
  followings: { followingId: number }[];
  followers: { followerId: number }[];
}

declare interface Mode {
  mode: 'home' | 'explore';
}
