import ErrorMessage from './ErrorMessage';

export default {
  title: 'Components/Common/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered'
  }
};

export const Default = {
  args: {
    message: 'Something went wrong!'
  }
};

export const WithCustomClass = {
  args: {
    message: 'Custom styled error message',
    className: 'max-w-md mx-auto'
  }
};