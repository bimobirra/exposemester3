import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useAuth } from "../useAuth";
import DetailCard from "../Components/DetailCard";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ImageCompressor from "image-compressor.js";

type Items = {
  id: number;
  cartId: number;
  quantity: number;
  productId: number;
  price: number;
  total: number;
  productName: string;
};

function Detail() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<Items[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [base64Image, setBase64Image] = useState("");

  const getCartItems = async () => {
    try {
      if (user?.cartId) {
        const response = await axios.get<Items[]>(
          `http://localhost:5205/api/cart/${user?.cartId}`
        );
        setCartItems(response.data);

        if (response.data.length === 0) {
          navigate("/cart", {
            state: { from: location },
            replace: true,
          });
        }
      }
    } catch (err: any) {
      console.error("Failed to fetch items", err);
    }
  };

  useEffect(() => {
    getCartItems();
  }, [user?.cartId]);

  const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string); // Hasil Base64
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const compressor = new ImageCompressor();
      try {
        const compressedImage = await compressor.compress(file, {
          quality: 0.5,
          maxHeight: 800,
          maxWidth: 800, // Mengurangi kualitas gambar untuk ukuran file yang lebih kecil
        });

        const base64 = await convertToBase64(compressedImage);
        setBase64Image(base64);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const checkOut = async () => {
    if (!base64Image) {
      toast.error("Please upload payment image!");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5205/api/checkout`, {
        CartId: user?.cartId,
        Base64Image: base64Image,
        Customer: user?.userName,
        Address: user?.address,
        Phone: user?.phone,
        Email: user?.email,
      });

      if (response.status === 200) {
        toast.success("Checkout Success!");
        navigate("/cart", {
          state: { from: location },
          replace: true,
        });
      }
    } catch (err: any) {
      console.error("Failed to checkout", err);
      toast.error("Checkout failed: " + err.response.data); // Menampilkan pesan error jika stok tidak mencukupi
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-7 col-lg-8">
            <h1 className="mt-4">Detail</h1>
            {cartItems.map((item) => (
              <DetailCard
                key={item.id}
                img={item.picture}
                name={item.productName}
                price={item.price * item.quantity}
                quantity={item.quantity}
              />
            ))}
          </div>

          <div className="col-md-5 col-lg-4 mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2>Summary</h2>
              <span className="badge bg-secondary rounded-pill">
                {cartItems.length}
              </span>
            </div>
            <ul className="list-group mb-3">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between lh-sm"
                >
                  <div>
                    <h6 className="my-0">{item.productName}</h6>
                  </div>
                  <span className="text-body-secondary">
                    Rp. {item.price * item.quantity}
                  </span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total</span>
                <strong>
                  Rp.{" "}
                  {cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </strong>
              </li>
              <form>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Payment</span>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                  />
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <button
                    type="button"
                    onClick={checkOut}
                    className="btn btn-primary"
                  >
                    Checkout
                  </button>
                </li>
              </form>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Detail;
