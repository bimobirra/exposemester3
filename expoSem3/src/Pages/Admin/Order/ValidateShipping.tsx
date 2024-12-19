import Sidebar from "../../../Components/Sidebar";
import { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import axios from "axios";
import { toast } from "react-toastify";

interface orderDetail {
  id: number;
  cartId: number;
  date: Date;
  payment_Picture: string;
  payment_Status: string;
  orderHistoryId: number;
  productNames: string;
  total: number;
  customer: string;
  address: string;
  email: string;
  phone: string;
}

function ValidateShipping() {
  const [orders, setOrders] = useState<orderDetail[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToValidate, setItemToValidate] = useState<number | null>(null);
  const [validateHistory, setValidateHistory] = useState<number | null>(null);

  // Memuat data kategori hanya sekali saat komponen pertama kali dirender
  useEffect(() => {
    const getOrders = async () => {
      const response = await axios.get(
        "http://localhost:5205/api/cart/order_detail/status/Shipping"
      );
      setOrders(response.data);
    };
    getOrders();
  }, []); // Dependency array kosong untuk pemanggilan hanya sekali

  // Inisialisasi DataTable setelah data tersedia
  useEffect(() => {
    if (orders.length > 0) {
      $("#dataTable").DataTable(); // Inisialisasi DataTable
    }
  }, [orders]); // Memastikan DataTable diinisialisasi setelah data dimuat

  const validateOrder = async (id: number, historyId: number) => {
    try {
      // Object yang berisi data untuk diperbarui
      const updatedStatus = {
        payment_Status: "Completed",
      };

      const updateHistory = {
        status: "Completed",
      };

      // URL endpoint dengan id
      const url = `http://localhost:5205/api/cart/update/detail/${id}`;
      const urlHistory = `http://localhost:5205/api/cart/update/history/${historyId}`;

      // Mengirimkan permintaan PUT ke server

      await axios.put(url, updatedStatus);
      await axios.put(urlHistory, updateHistory);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, payment_Status: "Completed" } : order
        )
      );

      // Menangani respon dari server
      toast.success("Order completed!");
      setShowModal(false);
    } catch (error) {
      // Menangani error jika terjadi
      toast.error("Failed to complete order!");
    }
  };

  const openValidateModal = (itemId: number, orderHistoryId: number) => {
    setValidateHistory(orderHistoryId);
    setItemToValidate(itemId);
    setShowModal(true);
  };

  // Tutup modal untuk delete
  const closeValidateModal = () => {
    setShowModal(false);
    setItemToValidate(null);
    setValidateHistory(null);
  };

  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-4">
          {/* Header Section */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3">Manage Orders</h1>
          </div>

          {/* Table Section */}
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h6 className="m-0 font-weight-bold">Order Data</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table table-bordered table-hover my-3"
                  id="dataTable"
                  width="100%"
                >
                  <thead className="thead-dark">
                    <tr>
                      <th>No</th>
                      <th>Customer</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Products</th>
                      <th>Total</th>
                      <th>Shipping</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order.id}>
                        <td>{index + 1}</td>
                        <td>{order.customer}</td>
                        <td>{order.address}</td>
                        <td>{order.phone}</td>
                        <td>{order.email}</td>
                        <td>{order.productNames}</td>
                        <td>{order.total}</td>
                        <td>
                          <button
                            onClick={() =>
                              openValidateModal(order.id, order.orderHistoryId)
                            }
                            className="btn btn-success mx-1"
                          >
                            Complete
                          </button>
                        </td>{" "}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && itemToValidate !== null && (
        <div
          className="modal fade show"
          tabIndex={-1}
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Complete order</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeValidateModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to complete this order?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeValidateModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() =>
                    itemToValidate !== null &&
                    validateOrder(itemToValidate, validateHistory)
                  }
                >
                  Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ValidateShipping;
