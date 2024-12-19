import Sidebar from "../../../Components/Sidebar";
import { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import axios from "axios";

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

function CompletedOrders() {
  const [orders, setOrders] = useState<orderDetail[]>([]);

  // Memuat data kategori hanya sekali saat komponen pertama kali dirender
  useEffect(() => {
    const getOrders = async () => {
      const response = await axios.get(
        "http://localhost:5205/api/cart/order_detail/status/Completed"
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

  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-4">
          {/* Header Section */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3">Completed Orders</h1>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompletedOrders;
