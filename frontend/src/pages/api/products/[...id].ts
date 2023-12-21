import type { NextApiRequest, NextApiResponse } from 'next';

type ProductData = {
  id: number;
  title?: string;
  description?: string;
  price?: number;
  imageURL?: string;
  sizeOptions: {
    id: number;
    label?: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data?: ProductData; message?: string; error?: string }>
) {
  try {
    const fetchServerData = async () => {
      const apiRes = await fetch(
        'https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product',
        {}
      );

      if (!apiRes.ok) {
        throw new Error(`API error, status ${apiRes.status}`);
      }

      return apiRes.json();
    };

    const data = await fetchServerData();
    res.status(200).json({
      ...data, // spread the duplicate data key
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occured fetching product data',
    });
  }
}
