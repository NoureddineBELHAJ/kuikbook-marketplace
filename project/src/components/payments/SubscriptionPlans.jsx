import { usePayments } from '../../hooks/usePayments';
import { CheckIcon } from '@heroicons/react/24/outline';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    priceId: 'price_basic',
    price: 29,
    currency: 'USD',
    interval: 'month',
    features: [
      'Up to 10 listings',
      'Basic analytics',
      'Standard support',
      'Basic features'
    ]
  },
  {
    id: 'pro',
    name: 'Professional',
    priceId: 'price_pro',
    price: 79,
    currency: 'USD',
    interval: 'month',
    features: [
      'Unlimited listings',
      'Advanced analytics',
      'Priority support',
      'All features'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceId: 'price_enterprise',
    price: 199,
    currency: 'USD',
    interval: 'month',
    features: [
      'Custom solutions',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee'
    ]
  }
];

export default function SubscriptionPlans() {
  const { createCheckoutSession, isLoading } = usePayments();

  const handleSelectPlan = async (priceId) => {
    try {
      await createCheckoutSession({
        priceId,
        successUrl: `${window.location.origin}/settings/billing?success=true`,
        cancelUrl: `${window.location.origin}/settings/billing?success=false`
      });
    } catch (error) {
      console.error('Failed to select plan:', error);
    }
  };

  return (
    <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`flex flex-col rounded-lg shadow-sm divide-y divide-gray-200 bg-white ${
            plan.popular ? 'ring-2 ring-primary-500' : ''
          }`}
        >
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
            {plan.popular && (
              <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-primary-500 px-4 py-1 text-sm font-semibold text-white">
                Most popular
              </p>
            )}
            <p className="mt-8">
              <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
              <span className="text-base font-medium text-gray-500">/month</span>
            </p>
            <button
              onClick={() => handleSelectPlan(plan.priceId)}
              disabled={isLoading}
              className={`mt-8 block w-full rounded-md px-4 py-2 text-center text-sm font-semibold ${
                plan.popular
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
              }`}
            >
              {isLoading ? 'Processing...' : 'Select Plan'}
            </button>
          </div>
          <div className="px-6 pt-6 pb-8">
            <h4 className="text-sm font-medium text-gray-900">What's included</h4>
            <ul className="mt-6 space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex space-x-3">
                  <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-sm text-gray-500">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}