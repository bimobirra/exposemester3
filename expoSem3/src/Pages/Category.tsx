import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import axios from "axios"; 

function Category() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState<any>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5205/item/${categoryId}`
        );
        setProducts(response.data); 
      } catch (err: any) {
        console.error("Failed to fetch products", err);
      }
    };

    const fetchCategory = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:5205/api/category/${categoryId}`
        );
        setCategory(resp.data); 
      } catch (err: any) {
        console.error("Failed to fetch category", err);
      }
    };

    if (categoryId) {
      fetchProducts();
      fetchCategory();
    }
  }, [categoryId]);

  return (
    <>
      <Navbar />
      <div className="container">
        {category && (
          <div className="mt-4">
            <h2>{category.category_name}</h2>
          </div>
        )}

        {products.map((product) => (
          <div key={product.id} className="d-inline-block">
            <Card name={product.product_name} price={product.price} productId={product.id} img={product.picture} />
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Category;
