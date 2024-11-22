import { useState } from 'react';
import { TwoFactorAuth } from '../../services/auth/2fa';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export default function TwoFactorVerify({ onVerified }) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleVerify = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      const isValid = TwoFactorAuth.verifyToken(code, user.twoFactorSecret);
      
      if (!isValid) {
        toast.error('Invalid verification code');
        return;
      }

      onVerified();
    } catch (error) {
      toast.error('Verification failed');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Two-Factor Authentication Required
      </h2>
      
      <p className="text-sm text-gray-600 mb-6">
        Please enter the verification code from your authenticator app
      </p>

      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Verification Code
          </label>
          <input
            type="text"
            id="code"
            className="input mt-1"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            maxLength={6}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || code.length !== 6}
          className="btn-primary w-full"
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  );
}