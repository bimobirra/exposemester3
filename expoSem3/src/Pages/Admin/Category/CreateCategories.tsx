import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../../Components/Sidebar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function CreateCategories() {
  const [brandName, setBrandName] = useState<string>(""); // State untuk input
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrandName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman
    try {
      // Ganti URL ini dengan endpoint API Anda
      const response = await axios.post("http://localhost:5205/api/category", {
        category_name: brandName,
      });
      console.log("Response:", response.data);
      toast.success("Brand added");
      setBrandName("");
      navigate("/managecategories");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add brand");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid px-4">
        <h1 className="h3 my-3">Manage Brand</h1>

        <div className="card shadow mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="brand">Brand Name:</label>
                <input
                  type="text"
                  className="form-control mt-3"
                  id="brand"
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

export default CreateCategories;
