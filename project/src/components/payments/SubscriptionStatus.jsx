import { useEffect } from 'react';
import { usePayments } from '../../hooks/usePayments';
import { CheckBadgeIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function SubscriptionStatus() {
  const { 
    subscription, 
    fetchSubscription, 
    cancelSubscription,
    isLoading 
  } = usePayments();

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      await cancelSubscription(subscription.id);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading subscription status...</div>;
  }

  if (!subscription) {
    return (
      <div className="rounded-lg bg-gray-50 p-6 text-center">
        <XCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No Active Subscription</h3>
        <p className="mt-1 text-sm text-gray-500">
          Choose a subscription plan to get started
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Current Subscription
          </h3>
          <div className="mt-2 flex items-center">
            <CheckBadgeIcon className="h-5 w-5 text-green-500" />
            <span className="ml-2 text-sm text-gray-500">
              {subscription.plan.name} Plan
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-gray-900">
            ${subscription.plan.amount / 100}
            <span className="text-sm font-normal text-gray-500">
              /{subscription.plan.interval}
            </span>
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Next billing date: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={handleCancel}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Cancel subscription
        </button>
      </div>
    </div>
  );
}