export const API_VERSION = {
  '1': {
    base: '/api/v1',
    features: ['basic']
  },
  '2': {
    base: '/api/v2',
    features: ['basic', 'advanced']
  }
};

export const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: {
    default: 100,
    auth: 5, // Stricter limit for auth endpoints
    admin: 200 // Higher limit for admin endpoints
  }
};

export const SECURITY = {
  jwt: {
    accessTokenExpiry: '15m',
    refreshTokenExpiry: '7d',
    issuer: 'kuikbook-marketplace'
  },
  twoFactor: {
    enabled: true,
    issuer: 'Kuikbook Marketplace',
    tokenLength: 6,
    stepSeconds: 30
  }
};