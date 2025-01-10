import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToUsers = () => {
    navigate("/users");
  };

  const goToProducts = () => {
    navigate("/products");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
      <p className="text-lg mb-6">Please select a page to view:</p>
      <div className="flex space-x-4">
        <button
          onClick={goToUsers}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
        >
          Go to User List
        </button>
        <button
          onClick={goToProducts}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
        >
          Go to Product List
        </button>
      </div>
    </div>
  );
};

export default Home;
