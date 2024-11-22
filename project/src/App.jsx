import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleMapsProvider } from './components/maps/GoogleMapsProvider';
import { PaymentProvider } from './components/payments/PaymentProvider';
import AppRoutes from './routes';
import Layout from './components/Layout';

export default function App() {
  return (
    <GoogleMapsProvider>
      <PaymentProvider>
        <Router>
          <Layout>
            <AppRoutes />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#333',
                  color: '#fff',
                }
              }}
            />
          </Layout>
        </Router>
      </PaymentProvider>
    </GoogleMapsProvider>
  );
}