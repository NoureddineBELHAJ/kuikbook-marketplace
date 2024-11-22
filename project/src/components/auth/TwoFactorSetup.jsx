import { useState } from 'react';
import { TwoFactorAuth } from '../../services/auth/2fa';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export default function TwoFactorSetup() {
  const { user, updateUser } = useAuth();
  const [secret, setSecret] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const setupTwoFactor = async () => {
    try {
      setIsLoading(true);
      const { secret, qrCodeUrl } = await TwoFactorAuth.generateSecret(user.email);
      setSecret(secret);
      setQrCode(qrCodeUrl);
    } catch (error) {
      toast.error('Failed to setup 2FA');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAndEnable = async () => {
    try {
      setIsLoading(true);
      const isValid = TwoFactorAuth.verifyToken(verificationCode, secret);
      
      if (!isValid) {
        toast.error('Invalid verification code');
        return;
      }

      await updateUser({
        ...user,
        twoFactorEnabled: true,
        twoFactorSecret: secret
      });

      toast.success('2FA enabled successfully');
    } catch (error) {
      toast.error('Failed to enable 2FA');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h2>
        <p className="mt-1 text-sm text-gray-500">
          Enhance your account security by enabling two-factor authentication
        </p>
      </div>

      {!user.twoFactorEnabled ? (
        <div className="space-y-4">
          {!qrCode ? (
            <button
              onClick={setupTwoFactor}
              disabled={isLoading}
              className="btn-primary"
            >
              {isLoading ? 'Setting up...' : 'Setup 2FA'}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
              </div>
              
              <p className="text-sm text-gray-600 text-center">
                Scan this QR code with your authenticator app
              </p>

              <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  className="input mt-1"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                />
              </div>

              <button
                onClick={verifyAndEnable}
                disabled={isLoading || verificationCode.length !== 6}
                className="btn-primary w-full"
              >
                {isLoading ? 'Verifying...' : 'Enable 2FA'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-green-50 p-4 rounded-md">
          <p className="text-green-800">
            Two-factor authentication is enabled for your account
          </p>
        </div>
      )}
    </div>
  );
}