declare namespace Express {
  interface Request {
    user?: string;
    files?: any;
  }
}

declare interface Token {
  email: string;
  iat: number;
  exp: number;
}

declare interface ResponseData {
  success: boolean;
  message: string;
  data?: any;
}

declare interface PostData {
  content: string;
  picture: {
    id: number;
    type: string;
    size: number;
    ext: string;
    src: string;
  }[];
}
