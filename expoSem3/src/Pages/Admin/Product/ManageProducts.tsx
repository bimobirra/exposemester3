import Sidebar from "../../../Components/Sidebar";
import { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import { fetchProducts, Product } from "../../../Services/ProductService";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../../useAuth";

function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [imageToView, setImageToView] = useState<string | null>(null); // State to hold the image to view in the modal
  const { user, logout } = useAuth();
  const location = useLocation();

  // Memuat data kategori hanya sekali saat komponen pertama kali dirender
  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []); // Dependency array kosong untuk pemanggilan hanya sekali

  // Inisialisasi DataTable setelah data tersedia
  useEffect(() => {
    if (products.length > 0) {
      $("#dataTable").DataTable(); // Inisialisasi DataTable
    }
  }, [products]);

  const deleteProduct = async (itemId: number) => {
    try {
      await axios.delete(`http://localhost:5205/api/product/${itemId}`);
      setProducts((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
      toast.success("Product deleted successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Failed to delete product", error);
      toast.error("Failed to delete product!");
    }
  };

  // Buka modal untuk delete
  const openDeleteModal = (itemId: number) => {
    setItemToDelete(itemId);
    setShowModal(true);
  };

  // Tutup modal untuk delete
  const closeDeleteModal = () => {
    setShowModal(false);
    setItemToDelete(null);
  };

  // Buka modal untuk melihat gambar
  const openViewModal = (imageUrl: string) => {
    setImageToView(imageUrl); // Set image to display in the modal
  };

  // Tutup modal untuk melihat gambar
  const closeViewModal = () => {
    setImageToView(null); // Reset the image when closing the modal
  };

  return (
    <>
      <div className="d-flex">
        <aside
          className="sidebar d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
          style={{ width: "280px", height: "auto" }}
        >
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <span className="h2">Shoerp</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/dashboard" ? "active" : "text-white"
                }`}
                to="/dashboard"
              >
                {" "}
                <i className="bi bi-house-door-fill"></i> Home
              </Link>
            </li>
            <li>
              <Link
                className={`nav-link ${
                  location.pathname === "/manageorders"
                    ? "active"
                    : "text-white"
                }`}
                to="/manageorders"
              >
                <i className="bi bi-clipboard-check-fill"></i> Validate Payment
              </Link>
            </li>
            <li>
              <Link
                className={`nav-link ${
                  location.pathname === "/validateshipping"
                    ? "active"
                    : "text-white"
                }`}
                to="/validateshipping"
              >
                <i className="bi bi-clipboard-check-fill"></i> Validate Shipping
              </Link>
            </li>
            <li>
              <Link
                className={`nav-link ${
                  location.pathname === "/completedorders"
                    ? "active"
                    : "text-white"
                }`}
                to="/completedorders"
              >
                <i className="bi bi-clipboard-check-fill"></i> Completed Orders
              </Link>
            </li>
            <li>
              <Link
                className={`nav-link ${
                  location.pathname === "/manageproducts"
                    ? "active"
                    : "text-white"
                }`}
                to="/manageproducts"
              >
                {" "}
                <i className="bi bi-archive-fill"></i> Products
              </Link>
            </li>
            <li>
              <Link
                className={`nav-link ${
                  location.pathname === "/managecategories"
                    ? "active"
                    : "text-white"
                }`}
                to="/managecategories"
              >
                {" "}
                <i className="bi bi-ui-checks-grid"></i> Brands
              </Link>
            </li>
            <li>
              <Link
                className={`nav-link ${
                  location.pathname === "/admin" ? "active" : "text-white"
                }`}
                to="/admin"
              >
                {" "}
                <i className="bi bi-person-fill"></i> Admin
              </Link>
            </li>
          </ul>
          <hr />
          <div className="dropdown">
            <a
              href="#"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <strong>{user?.userName}</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
              <Link className="dropdown-item" to="/">
                Back to home
              </Link>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a onClick={logout} className="dropdown-item" href="#">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <div className="flex-grow-1 p-4">
          {/* Header Section */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3">Manage Products</h1>
            <Link className="btn btn-primary" to="/createproduct">
              Add Product
            </Link>
          </div>

          {/* Table Section */}
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h6 className="m-0 font-weight-bold">Product Data</h6>
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
                      <th>Product Name</th>
                      <th>Picture</th>
                      <th>Price</th>
                      <th>Description</th>
                      <th>Stocks</th>
                      <th>Brand</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td>{product.product_name}</td>
                        <td>
                          {/* Button to open view modal */}
                          <button
                            onClick={() => openViewModal(product.picture || "")}
                            className="btn btn-primary"
                          >
                            View
                          </button>
                        </td>
                        <td>{product.price}</td>
                        <td>{product.description}</td>
                        <td>{product.stocks}</td>
                        <td>{product.category_name}</td>
                        <td>
                          <Link
                            className="btn btn-warning mx-2"
                            to={`/updateproduct/${product.id}`}
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => openDeleteModal(product.id)}
                            className="btn btn-danger mx-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for View Image */}
      {imageToView && (
        <div
          className="modal fade show"
          tabIndex={-1}
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Product Image</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeViewModal}
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={imageToView}
                  alt="Product"
                  className="img-fluid"
                  style={{ maxHeight: "500px", objectFit: "contain" }}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeViewModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Delete Product */}
      {showModal && itemToDelete !== null && (
        <div
          className="modal fade show"
          tabIndex={-1}
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Remove Product</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeDeleteModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to remove this product?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeDeleteModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteProduct(itemToDelete)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ManageProducts;
