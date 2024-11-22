import rateLimit from 'express-rate-limit';
import { API_VERSION } from '../config';

// Rate limiting configuration
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Use X-Forwarded-For header if behind a proxy, otherwise use IP
    return req.headers['x-forwarded-for'] || req.ip;
  }
});

// API versioning middleware
export const apiVersioning = (req, res, next) => {
  const version = req.headers['accept-version'] || '1';
  if (!API_VERSION[version]) {
    return res.status(400).json({
      error: 'Invalid API version',
      supportedVersions: Object.keys(API_VERSION)
    });
  }
  req.apiVersion = version;
  next();
};