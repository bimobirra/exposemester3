import Sidebar from "../../../Components/Sidebar";
import { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import { Category, fetchCategory } from "../../../Services/CategoryService";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ManageCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  // Memuat data kategori
  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategory();
      setCategories(data);
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      $("#dataTable").DataTable(); // Inisialisasi DataTable
    }
  }, [categories]);

  // Hapus kategori
  const deleteBrand = async (itemId: number) => {
    try {
      await axios.delete(`http://localhost:5205/api/category/${itemId}`);
      setCategories((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
      toast.success("Brand deleted successfully!")
      setShowModal(false);
    } catch (error) {
      console.error("Failed to delete category", error);
      toast.error("Failed to delete brand!")
    }
  };

  // Buka modal
  const openModal = (itemId: number) => {
    setItemToDelete(itemId);
    setShowModal(true);
  };

  // Tutup modal
  const closeModal = () => {
    setShowModal(false);
    setItemToDelete(null);
  };

  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3">Manage Brands</h1>
            <Link className="btn btn-primary" to="/createcategories">
              Add Brand
            </Link>
          </div>

          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h6 className="m-0 font-weight-bold">Brand Data</h6>
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
                      <th>Brand Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category, index) => (
                      <tr key={category.id}>
                        <td>{index + 1}</td>
                        <td>{category.category_name}</td>
                        <td>
                          <Link
                            to={`/updatecategories/${category.id}`}
                            className="btn btn-warning mx-2"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => openModal(category.id)}
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

      {/* Modal */}
      {showModal && itemToDelete !== null && (
        <div
          className="modal fade show"
          tabIndex={-1}
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Remove Brand</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to remove this brand?</p>
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
                  onClick={() => deleteBrand(itemToDelete)}
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

export default ManageCategories;
