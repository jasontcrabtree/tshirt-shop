import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import App from './../src/pages/_app';

describe('App', () => {
  it('renders navigation', async () => {
    await act(async () => {
      render(<Home />);
    });

    // Wait for the component to finish rendering after the state update
    act(async () => {
      await waitFor(() => {
        expect(screen.getByTestId('nav')).toBeInTheDocument();
      });
    });
  });

  it('opens cart on click', async () => {
    render(<App />);

    const cartButton = await screen.getByTestId('cart-button');
    expect(cartButton).toBeInTheDocument();

    act(() => {
      cartButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
  });
});
