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
