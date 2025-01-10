import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductAsync } from "../redux/productSlice";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const { loading, error } = useSelector((state) => state.product);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !stock) {
      alert("Please fill out all fields.");
      return;
    }

    dispatch(addProductAsync({ name, price, stock }))
      .unwrap()
      .then(() => {
        setName("");
        setPrice("");
        setStock("");
      })
      .catch((err) => {
        alert(`Failed to add product: ${err}`);
      });
    navigate("/products");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default AddProduct;
