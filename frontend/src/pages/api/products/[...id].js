export default async function handler(req, res) {
  try {
    // Given suitable authorization & authentication, we would use the productId passed as a parameter to filter for the provided products. The API would be designed to handle multiple product id's for use-cases like 'similar product' components
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
