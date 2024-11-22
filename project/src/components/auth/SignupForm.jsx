import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { BuildingOfficeIcon, UserIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const ROLES = [
  {
    id: 'TRAVELER',
    title: 'Traveler',
    description: 'Book and enjoy activities worldwide',
    icon: UserIcon,
    features: [
      'Book activities and experiences',
      'Save favorite destinations',
      'Write reviews',
      'Track your bookings'
    ],
    color: '#FF9900',
    bgColor: '#FFF7ED',
    borderColor: '#FFEDD5'
  },
  {
    id: 'PROVIDER',
    title: 'Activity Provider',
    description: 'List and manage your activities',
    icon: BuildingOfficeIcon,
    features: [
      'List your activities',
      'Manage bookings',
      'Track earnings',
      'Engage with travelers'
    ],
    color: '#003580',
    bgColor: '#EFF6FF',
    borderColor: '#DBEAFE'
  },
  {
    id: 'ADMIN',
    title: 'Administrator',
    description: 'Manage and oversee the platform',
    icon: ShieldCheckIcon,
    features: [
      'Manage users and roles',
      'Review and approve activities',
      'Handle platform settings',
      'Monitor platform metrics'
    ],
    color: '#40C5C5',
    bgColor: '#F0FDFA',
    borderColor: '#CCFBF1'
  }
];

export default function SignupForm() {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    userType: 'INDIVIDUAL',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    companyName: '',
    phone: '',
    address: '',
    termsAccepted: false
  });

  const handleRoleSelect = (roleId) => {
    setFormData(prev => ({ ...prev, role: roleId }));
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      toast.error('Please accept the Terms of Service and Privacy Policy');
      return;
    }

    try {
      await signup(formData);
      navigate(`/${formData.role.toLowerCase()}`);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {step === 1 ? 'Choose your account type' : 'Complete your profile'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>

        {step === 1 ? (
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ROLES.map((role) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.id}
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-2xl border p-8 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  style={{ borderColor: role.borderColor, backgroundColor: role.bgColor }}
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <div className="absolute top-8 right-8 p-2 rounded-lg" style={{ backgroundColor: role.color }}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900">{role.title}</h3>
                    <p className="mt-2 text-gray-600">{role.description}</p>
                    <ul className="mt-8 space-y-3">
                      {role.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <svg className="h-5 w-5 mr-2" style={{ color: role.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="mt-12 space-y-8 bg-white rounded-xl shadow-sm border p-8"
          >
            {formData.role === 'PROVIDER' ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    className="input mt-1"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="input mt-1"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="input mt-1"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="input mt-1"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="input mt-1"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="input mt-1"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="input mt-1"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-primary-600 hover:text-primary-500"
              >
                ← Back to role selection
              </button>
              <button 
                type="submit" 
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
}