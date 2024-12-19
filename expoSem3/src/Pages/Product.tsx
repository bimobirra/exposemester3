import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useAuth } from "../useAuth";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";

interface ProductDetail {
  id: number;
  product_name: string;
  picture: string;
  price: number;
  description: string;
  stocks: number;
  categoryId: number;
  category_name: string;
}

type AddToCart = {
  quantity: number;
  cartId: number;
  productId: number;
  price: number;
};

const Product: React.FC = () => {
  const { user, isLoggedIn } = useAuth();
  const { Id } = useParams<{ Id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get<ProductDetail>(
          `http://localhost:5205/api/product/${Id}`
        );
        setProduct(response.data);
      } catch (err: any) {
        console.error("Failed to fetch product", err);
      }
    };
    fetchProductDetail();
  }, [Id]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addItem = async () => {
    try {
      if (isLoggedIn()) {
        await axios.post<AddToCart>("http://localhost:5205/api/cart", {
          quantity: quantity,
          cartId: user?.cartId,
          productId: product?.id,
          price: product?.price,
        });
        toast.success("Added to cart");
      } else {
        navigate("/login", { state: { from: window.location.pathname } });
      }
    } catch (err: any) {
      console.error("Failed to add to cart", err);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value > 0 ? value : 1); // Pastikan quantity minimal 1
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <section className="py-5">
          <div className="container px-4 px-lg-5 my-3">
            <div className="row gx-4 gx-lg-5 d-flex align-items-start">
              {/* Flexbox container for image and text */}
              <div className="col-md-6 d-flex align-items-start">
                {/* Gambar produk */}
                <img
                  className="card-img-top mb-5 mb-md-0"
                  src={product?.picture} // Menampilkan gambar produk atau gambar placeholder
                  alt={product?.product_name}
                  style={{
                    maxWidth: "100%", // Pastikan gambar responsif
                    height: "auto",
                    objectFit: "contain", // Agar gambar tetap terjaga proporsinya
                  }}
                />
              </div>
              <div className="col-md-6">
                {/* Nama produk dan informasi */}
                <h1 className="display-5 fw-bolder">{product?.product_name}</h1>
                <div className="fs-5 mb-2">
                  <span>Rp {product?.price.toLocaleString("id-ID")}</span>
                </div>
                <div className="fs-5 mb-5">
                  <span>Stocks:  {product?.stocks}</span>
                </div>
                <div className="d-flex">
                  <button className="btn secondary" onClick={handleDecrement}>
                    <strong>-</strong>
                  </button>
                  <input
                    className="form-control text-center"
                    id="inputQuantity"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    style={{ maxWidth: "4rem" }}
                  />
                  <button className="btn secondary" onClick={handleIncrement}>
                    <strong>+</strong>
                  </button>
                  <button
                    className="btn btn-outline-dark flex-shrink-0 mx-3"
                    type="button"
                    onClick={() => addItem()}
                  >
                    <i className="bi-cart-fill me-1"></i>
                    Add to cart
                  </button>
                </div>
                <p className="lead mt-3">
                  <ReactMarkdown>{product?.description}</ReactMarkdown>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Product;
