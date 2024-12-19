import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../../Components/Sidebar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Category, fetchCategory } from "../../../Services/CategoryService";
import ImageCompressor from "image-compressor.js";

function CreateProduct() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [picture, setPicture] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategory();
      setCategories(data);
    };
    getCategories();
  }, []);

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
          maxWidth: 800,
        });

        const base64 = await convertToBase64(compressedImage);
        setPicture(base64);
        console.log(base64);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        product_name: productName,
        picture: picture,
        price: price,
        description: description,
        stocks: stock,
        categoryId: selectedCategoryId,
      };
      console.log(payload);
      await axios.post("http://localhost:5205/api/product", payload);
      toast.success("Product added successfully");
      navigate("/manageproducts");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid px-4">
        <h1 className="h3 my-3">Add Product</h1>

        <div className="card shadow mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="productName">Product Name:</label>
                <input
                  type="text"
                  className="form-control my-3"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="picture">Picture:</label>
                <input
                  accept="image/*"
                  type="file"
                  className="form-control my-3"
                  id="picture"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  className="form-control my-3"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  placeholder="Enter price"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  className="form-control my-3"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stocks:</label>
                <input
                  type="number"
                  className="form-control my-3"
                  id="stock"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  placeholder="Enter stock quantity"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Brand:</label>
                <select
                  className="form-control mt-3"
                  id="category"
                  value={selectedCategoryId || ""}
                  onChange={(e) =>
                    setSelectedCategoryId(Number(e.target.value))
                  }
                  required
                >
                  <option value="" disabled hidden>
                    Select a brand
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
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

export default CreateProduct;
