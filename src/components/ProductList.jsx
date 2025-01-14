import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  deleteProductAsync,
  logout,
} from "../redux/productSlice";
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
        .catch((err) => alert(`Failed to delete product: ${err}`));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      {/* Logout text link in top-right corner */}
      <span
        onClick={handleLogout}
        className="absolute top-6 right-6 text-red-600 cursor-pointer hover:text-red-700 transition-colors duration-300"
      >
        Logout
      </span>

      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        Product List
      </h2>

      {/* Back to Home text link with right arrow */}
      <Link
        to="/"
        className="mb-4 inline-block text-blue-600 hover:text-blue-700 transition-colors duration-300 flex items-center"
      >
        <span className="mr-2">Back to Home</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-blue-600 hover:text-blue-700"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6"></path>
        </svg>
      </Link>

      <Link
        to="/add-product"
        className="mb-4 inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
      >
        Add Product
      </Link>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Stock</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-200">
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300 mr-2"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/edit-product/${product.id}`}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors duration-300"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
