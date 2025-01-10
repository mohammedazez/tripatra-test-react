import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, deleteProductAsync } from "../redux/productSlice";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { products, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductAsync(id))
        .unwrap()
        .then(() => alert("Product deleted successfully!"))
        .catch((err) => alert(`Failed to delete product: ${err}`));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Product List</h2>
      <Link to="/add-product">Add Product</Link>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>
              {product.name} ({product.price}) {product.stock}
            </span>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
            <Link to={`/edit-product/${product.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
