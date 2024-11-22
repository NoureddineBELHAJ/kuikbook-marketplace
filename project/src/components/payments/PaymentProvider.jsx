import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const STRIPE_OPTIONS = {
  locale: 'en',
  appearance: {
    theme: 'stripe',
    variables: {
      colorPrimary: '#7C7F86',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#dc2626',
      fontFamily: 'Inter, system-ui, sans-serif',
      borderRadius: '0.5rem',
      spacingUnit: '4px'
    }
  }
};

export function PaymentProvider({ children }) {
  return (
    <Elements stripe={stripePromise} options={STRIPE_OPTIONS}>
      {children}
    </Elements>
  );
}