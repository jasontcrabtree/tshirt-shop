import error from 'next/error';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type ProductDataType = {
  imageURL: string;
  title: string;
};

const useFetchProduct = async (productIds: string[]) => {
  const [data, setData] = useState<ProductDataType | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/products/${productIds}`);
        const apiJson = await response.json();
        setData(apiJson);
      } catch (error) {
        toast.error('Error fetching products, please refresh and try again');
        setData(null);
      }
    }
  }, [productIds]);

  return {
    data,
  };
};

export default useFetchProduct;
