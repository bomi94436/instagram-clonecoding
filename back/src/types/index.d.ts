declare namespace Express {
  interface Request {
    user?: { id: number; email: string };
    files?: any;
  }
}

declare interface Token {
  id: number;
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
