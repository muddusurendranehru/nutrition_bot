import type { Request, RequestHandler } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedUserPayload extends JwtPayload {
  userId: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUserPayload;
}

export const authenticateToken: RequestHandler = (req, res, next) => {
  const request = req as AuthenticatedRequest;
  const authHeader = request.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error('JWT_SECRET is not configured.');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  return jwt.verify(token, secret, (err, decoded) => {
    if (err || !decoded || typeof decoded === 'string') {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    request.user = decoded as AuthenticatedUserPayload;
    next();
  });
};

