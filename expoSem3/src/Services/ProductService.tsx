import axios from "axios";

export interface Product {
  id: number;
  picture: string;
  product_name: string;
  price: number;
  description: string;
  category_name: string;
  stocks: number;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(
    "http://localhost:5205/api/product"
  );
  return response.data;
};
