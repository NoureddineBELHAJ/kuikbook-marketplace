import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders the error message', () => {
    const message = 'Test error message';
    render(<ErrorMessage message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const className = 'custom-class';
    render(<ErrorMessage message="Test" className={className} />);
    expect(screen.getByRole('alert')).toHaveClass(className);
  });
});