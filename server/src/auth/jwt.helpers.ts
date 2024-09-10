import { JwtFromRequestFunction } from 'passport-jwt';

export const extractJwtFromCookies =
  (cookieName: string): JwtFromRequestFunction =>
  (req) => {
    if (req && req.cookies && req.cookies[cookieName]) {
      return req.cookies[cookieName];
    }

    return null;
  };
