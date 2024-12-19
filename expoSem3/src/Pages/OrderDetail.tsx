import { useParams, Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../useAuth";

type OrderDetail = {
  id: number;
  cartId: number;
  date: Date;
  payment_Picture: string;
  payment_Status: string;
  orderHistoryId: number;
  productNames: string;
  total: number;
};

function OrderDetail() {
  const { user } = useAuth();
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { Id, cartId, orderdetailId } = useParams<{
    Id: string;
    cartId: string;
    orderdetailId: string;
  }>();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get<OrderDetail>(
          `http://localhost:5205/api/cart/order_detail/${cartId}/${orderdetailId}`
        );
        setOrderDetail(response.data);
      } catch (err: any) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };

    if (cartId && orderdetailId) {
      fetchOrderDetail();
    }
  }, [cartId, orderdetailId]);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <h3 className="text-center mb-4">Order Detail</h3>
            {loading ? (
              <div className="text-center">
                <p>Loading...</p>
              </div>
            ) : orderDetail ? (
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>Order ID</th>
                    <td>{orderDetail.id}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{user?.userName}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{user?.address}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{user?.phone}</td>
                  </tr>
                  <tr>
                    <th>Product Names</th>
                    <td>{orderDetail.productNames}</td>
                  </tr>
                  <tr>
                    <th>Payment Status</th>
                    <td>
                      {orderDetail.payment_Status === "Pending" ? (
                        <span className="badge bg-danger">
                          <i className="fas fa-clock me-2"></i>Pending
                        </span>
                      ) : orderDetail.payment_Status === "Completed" ? (
                        <span className="badge bg-success">
                          <i className="fas fa-check me-2"></i>Completed
                        </span>
                      ) : (
                        <span className="badge bg-warning">
                          <i className="fas fa-exclamation-circle me-2"></i>
                          Shipping
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <td>Rp. {orderDetail.total}</td>
                  </tr>
                  <tr>
                    <th>Order Date</th>
                    <td>{new Date(orderDetail.date).toLocaleDateString()}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p className="text-center">Failed to load order details.</p>
            )}
            <div className="text-center mt-4">
              <Link to="/history" className="btn btn-primary mx-2">
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderDetail;
