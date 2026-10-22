// backend/src/middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (Format: Bearer <token>)
      token = req.headers.authorization.split(' ')[1];

      // Verify token signature and expiration
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user object to request (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      const err = new Error('Not authorized, token failed');
      err.statusCode = 401;
      return next(err);
    }
  }

  if (!token) {
    const err = new Error('Not authorized, no token provided');
    err.statusCode = 401;
    return next(err);
  }
};