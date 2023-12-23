import cookie from 'cookie';

export default async function handler(req, res) {
  const cookieHeader = req.headers.cookie;
  const parsedCookies = cookie.parse(cookieHeader || '');

  console.log('Parsed Cookies:', parsedCookies.userId);

  try {
    const cart = [
      {
        title: 'Classic Tee',
        price: 75,
        imageURL:
          'https://mrdevelopertestassets.s3.ap-southeast-2.amazonaws.com/classic-tee.jpg',
        size: 'S',
        quantity: 1,
      },
      {
        title: 'Classic Tee',
        price: 75,
        imageURL:
          'https://mrdevelopertestassets.s3.ap-southeast-2.amazonaws.com/classic-tee.jpg',
        size: 'L',
        quantity: 5,
      },
    ];

    res.status(200).json({
      ...cart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occured fetching user cart',
    });
  }
}
