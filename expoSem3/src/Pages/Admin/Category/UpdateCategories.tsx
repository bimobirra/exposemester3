import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../Components/Sidebar";
import { toast } from "react-toastify";

interface BrandData {
  name: string;
}

function UpdateCategories() {
  const { id } = useParams<{ id: string }>(); // Ambil ID dari URL
  const navigate = useNavigate(); // Untuk redirect setelah update

  const [brandName, setBrandName] = useState<string>(""); // State untuk form
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // State loading tombol

  // Ambil data awal berdasarkan ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5205/api/category/${id}`
        );
        setBrandName(response.data.category_name); // Set data awal ke state
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch brand data.");
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Handle input perubahan
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrandName(e.target.value);
  };

  // Handle submit update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5205/api/category/${id}`, {
        category_name: brandName,
      });
      toast.success("Brand updated successfully!");
      navigate("/managecategories"); // Redirect ke halaman kategori
    } catch (error) {
      console.error("Error updating brand:", error);
      toast.error("Failed to update brand.");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid px-4">
        <h1 className="h3 my-3">Update Brand</h1>

        <div className="card shadow mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="Brand">Brand Name:</label>
                <input
                  type="text"
                  className="form-control mt-3"
                  id="Brand"
                  value={brandName}
                  onChange={handleChange}
                  placeholder="Enter brand name"
                  autoFocus
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary mt-4">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateCategories;
