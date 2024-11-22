import { useEffect } from 'react';
import { usePayments } from '../../hooks/usePayments';
import { CreditCardIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function PaymentMethods() {
  const { 
    paymentMethods, 
    fetchPaymentMethods, 
    removePaymentMethod,
    isLoading 
  } = usePayments();

  useEffect(() => {
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);

  const handleRemove = async (paymentMethodId) => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      await removePaymentMethod(paymentMethodId);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading payment methods...</div>;
  }

  return (
    <div className="space-y-4">
      {paymentMethods.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No payment methods saved
        </div>
      ) : (
        paymentMethods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <CreditCardIcon className="h-6 w-6 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {method.card.brand.toUpperCase()} •••• {method.card.last4}
                </p>
                <p className="text-sm text-gray-500">
                  Expires {method.card.exp_month}/{method.card.exp_year}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleRemove(method.id)}
              className="text-red-600 hover:text-red-700"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))
      )}
    </div>
  );
}