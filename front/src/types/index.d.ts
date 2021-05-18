declare interface SignUpData {
  email: string | undefined;
  password: string | undefined;
  nickname: string | undefined;
}

declare interface ResponseData {
  success: boolean;
  message: string;
  data?: any;
}
