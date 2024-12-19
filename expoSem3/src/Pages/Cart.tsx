import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import CartItem from "../Components/CartItem";
import { useEffect, useState } from "react";
import { useAuth } from "../useAuth";
import axios from "axios";
import { Link } from "react-router-dom";

type Items = {
  id: number;
  cartId: number;
  quantity: number;
  productId: number;
  price: number;
  total: number;
  productName: string;
};

type updateItem = {
  quantity: number;
};

const Cart: React.FC = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<Items[]>([]);
  const [showModal, setShowModal] = useState(false); // Untuk mengatur tampilan modal
  const [itemToDelete, setItemToDelete] = useState<number | null>(null); // Menyimpan id item yang ingin dihapus

  // Fungsi untuk mendapatkan item keranjang
  const getCartItems = async () => {
    try {
      if (user?.cartId) {
        const response = await axios.get<Items[]>(
          `http://localhost:5205/api/cart/${user?.cartId}`
        );
        setCartItems(response.data);
      }
    } catch (err: any) {
      console.error("Failed to fetch items", err);
    }
  };

  // Mengambil data keranjang saat user.cartId berubah
  useEffect(() => {
    getCartItems();
  }, [user?.cartId]);

  // Fungsi untuk memperbarui item keranjang
  const updateCartItems = async (itemId: number, newQuantity: number) => {
    try {
      const updatedItem: updateItem = {
        quantity: newQuantity,
      };

      // Update item di server
      await axios.put(
        `http://localhost:5205/api/cart/update/${itemId}`,
        updatedItem
      );

      // Update state secara langsung dengan data terbaru
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );

      // Memanggil ulang data keranjang setelah update
      getCartItems();
    } catch (err: any) {
      console.error("Error updating cart item", err);
    }
  };

  // Fungsi untuk menghapus item dari keranjang
  const deleteCartItems = async (itemId: number) => {
    try {
      await axios.delete(`http://localhost:5205/remove/${itemId}`);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
      setShowModal(false); // Menutup modal setelah item dihapus
    } catch (err: any) {
      console.error("Failed to delete item", err);
    }
  };

  // Fungsi untuk membuka modal konfirmasi penghapusan
  const openModal = (itemId: number) => {
    setItemToDelete(itemId); // Set item yang ingin dihapus
    setShowModal(true); // Tampilkan modal
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setShowModal(false); // Tutup modal
  };

  const total = cartItems.reduce((acc, item) => acc + item.total, 0);

  return (
    <>
      <Navbar />
      <div
        className="container"
        style={{ display: "flex", flexDirection: "column", minHeight: "60vh" }}
      >
        <h3 className="fw-normal mb-4 mt-4">Shopping Cart</h3>
        {cartItems.length === 0 ? (
          <div className="alert alert-info" role="alert">
            Your cart is empty!
          </div>
        ) : (
          cartItems.map((item) => (
            <>
              <CartItem
                img={item.picture}
                name={item.productName}
                quantity={item.quantity}
                price={item.total}
                id={item.id}
                onUpdate={updateCartItems} // Memanggil updateCartItems
                onDelete={() => openModal(item.id)} // Memanggil openModal dengan ID item
              />
            </>
          ))
        )}
        {cartItems.length > 0 && (
          <>
            {" "}
            <hr className="b-example-divider" />
            <h3 className="mt-2 text-end">Total : {total.toFixed(2)} </h3>
            <Link
              to="/detail"
              className="btn btn-secondary btn-block btn-lg mt-3"
            >
              Proceed to Pay
            </Link>
          </>
        )}
      </div>

      {/* Modal Konfirmasi Hapus */}
      {showModal && itemToDelete !== null && (
        <div
          className={`modal fade ${showModal ? "show" : ""}`} // Menggunakan transisi fade
          tabIndex={-1}
          style={{ display: showModal ? "block" : "none" }} // Mengontrol tampilan dengan transisi
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Remove product</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to remove this product?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    if (itemToDelete !== null) {
                      deleteCartItems(itemToDelete); // Menghapus item
                    }
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Cart;
