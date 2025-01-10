import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAsync } from "../redux/productSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const product = useSelector((state) =>
    state.product.products.find((product) => product.id === id)
  );

  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || "");
  const [stock, setStock] = useState(product?.stock || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductAsync({ id, name, price, stock }));
    navigate("/products");
  };

  if (!product) return <div>Product not found</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <button type="submit">Update Product</button>
    </form>
  );
};

export default EditProduct;
