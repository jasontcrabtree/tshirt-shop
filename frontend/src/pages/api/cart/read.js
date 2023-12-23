import cookie from 'cookie';

async function openDb() {
  return open({
    filename: './../../../../../backend/Store.db',
    driver: sqlite3.Database,
  });
}

export default async function handler(req, res) {
  const cookieHeader = req.headers.cookie;
  const parsedCookies = cookie.parse(cookieHeader || '');

  console.log('Parsed Cookies:', parsedCookies.userId);

  try {
    // Read server-side cart data from DB, filtered by userId (cookie);
    const cart = [];

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
