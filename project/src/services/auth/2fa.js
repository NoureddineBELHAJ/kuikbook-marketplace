import { authenticator } from 'otplib';
import QRCode from 'qrcode';

export class TwoFactorAuth {
  static async generateSecret(userId) {
    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(
      userId,
      'Kuikbook Marketplace',
      secret
    );
    
    const qrCodeUrl = await QRCode.toDataURL(otpauth);
    
    return {
      secret,
      qrCodeUrl
    };
  }

  static verifyToken(token, secret) {
    try {
      return authenticator.verify({
        token,
        secret
      });
    } catch (err) {
      console.error('2FA verification error:', err);
      return false;
    }
  }

  static generateToken(secret) {
    return authenticator.generate(secret);
  }
}