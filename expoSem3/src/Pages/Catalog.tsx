import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Carousel from "../Components/Carousel";
import Card from "../Components/Card";
import { useEffect, useState } from "react";
import { Category, fetchCategory } from "../Services/CategoryService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { fetchProducts, Product } from "../Services/ProductService";

const Catalog: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const toastMessage = location.state?.toastMessage;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategory();
      setCategories(data);
    };
    getCategories();
  }, [categories]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data.slice(0, 8));
    };
    getProducts();
  }, [products]);

  useEffect(() => {
    if (toastMessage && !toast.isActive("unique-toast-id")) {
      toast.warning(toastMessage, { toastId: "unique-toast-id" });
      navigate(location.pathname, { replace: true });
    }
  }, [toastMessage, navigate, location.pathname]);

  return (
    <>
      <Navbar />
      <Carousel />
      <div className="container my-5">
        <h2 className="my-2">Brand</h2>
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

        <h2 className="my-2">Best Seller</h2>
        <div className="my-3">
          {products.map((product) => (
            <Card
              name={product.product_name}
              price={product.price}
              productId={product.id}
              img={product.picture}
            />
          ))}
        </div>
        <Link to="/products" className="btn btn-outline-secondary d-flex flex-column">View more</Link>
      </div>
      <Footer />
    </>
  );
};

export default Catalog;
