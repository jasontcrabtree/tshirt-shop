import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import Home from './../src/pages/index';
import ProductView from './../src/components/ProductView';

/* Test Plan:
[x] Homepage renders loading spinner
[x] Homepage renders product data
[x] Nav bar renders
4. Nav bar renders cart count
5. Nav bar cart opens and closes on click
6. Nav bar cart renders cart data
7. Clicking add to cart without size fails
8. Clicking add to cart with size adds to cart, and updates cart count and cart display
*/

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          id: 1,
          title: 'Classic Tee',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
          price: 75,
          imageURL:
            'https://mrdevelopertestassets.s3.ap-southeast-2.amazonaws.com/classic-tee.jpg',
          sizeOptions: [
            {
              id: 1,
              label: 'S',
            },
            {
              id: 2,
              label: 'M',
            },
            {
              id: 3,
              label: 'L',
            },
          ],
        }),
    })
  );
});

describe('Home', () => {
  it('renders loading state while waiting for data', async () => {
    render(<Home />);

    const loadingSpinner = screen.getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('loads and displays data', async () => {
    await act(async () => {
      render(<ProductView productId={'1'} />);
    });

    await waitFor(() => {
      expect(screen.getByText('Classic Tee')).toBeInTheDocument();
    });
  });
});
