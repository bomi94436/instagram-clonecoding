declare interface ResponseData {
  success: boolean;
  message: string;
  data?: any;
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
