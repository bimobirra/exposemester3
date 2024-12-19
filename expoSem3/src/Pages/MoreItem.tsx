import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import { useEffect, useState } from "react";
import { fetchProducts, Product } from "../Services/ProductService";
import { fetchCategory } from "../Services/CategoryService";
import { Link } from "react-router-dom";

const MoreItem: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategory();
      setCategories(data);
    };
    getCategories();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="fw-normal">Products</h2>
        <div className="my-3">
          {categories.map((category) => (
            <div className="d-inline-block" key={category.id}>
              <Link
                to={`/category/${category.id}`}
                className="btn btn-outline-secondary mx-2"
              >
                <span className="h4">{category.category_name}</span>
              </Link>
            </div>
          ))}
        </div>
        {products.map((product) => (
          <div className="d-inline-block" key={product.id}>
            <Card
              name={product.product_name}
              price={product.price}
              productId={product.id}
              img={product.picture}
            />
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default MoreItem;
