import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { usePayments } from '../../hooks/usePayments';

export default function PaymentMethodForm({ onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const { savePaymentMethod, isLoading } = usePayments();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        setError(error.message);
        return;
      }

      await savePaymentMethod(paymentMethod.id);
      if (onSuccess) onSuccess(paymentMethod);
      elements.getElement(CardElement).clear();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="card p-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>

      {error && (
        <div className="text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="btn-primary w-full"
      >
        {isLoading ? 'Saving...' : 'Save Card'}
      </button>
    </form>
  );
}