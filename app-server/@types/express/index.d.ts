declare namespace Express {
  interface Request {
    authToken?: string;
    userInfo?: UserInfo;
  }
}
