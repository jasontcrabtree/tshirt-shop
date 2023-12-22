import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

describe('Home', () => {
  //   it('Renders a product view', () => {
  //     render(<Home />);

  //     const heading = screen.getByRole('heading', { level: 3 });
  //     expect(heading).toBeInTheDocument();
  //   });

  it('renders loading state while waiting for data', () => {
    render(<Home />);

    const loadingSpinner = screen.getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });
});
