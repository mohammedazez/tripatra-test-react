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
        alert("Product added successfully!");
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
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <input
          type="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <input
          type="stock"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AddProduct;
