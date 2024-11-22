import LoadingSpinner from './LoadingSpinner';

export default {
  title: 'Components/Common/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered'
  }
};

export const Default = () => <LoadingSpinner />;

export const CustomSize = () => (
  <div className="w-24 h-24">
    <LoadingSpinner />
  </div>
);