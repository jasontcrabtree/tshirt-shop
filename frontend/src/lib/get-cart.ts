const getCartByUser = async (userIdentifier: string) => {
  const payload = {
    payload: {
      userId: userIdentifier,
    },
  };
  const cartApiRes = await fetch('api/cart/read', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await cartApiRes.json();

  return data;
};

export default getCartByUser;
