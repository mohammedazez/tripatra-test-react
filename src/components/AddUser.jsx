import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserAsync } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      alert("Both name and email are required!");
      return;
    }

    dispatch(addUserAsync({ name, email }))
      .unwrap()
      .then(() => {
        setName("");
        setEmail("");
      })
      .catch((err) => {
        alert(`Failed to add user: ${err}`);
      });

    navigate("/users");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
        Add New User
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Adding..." : "Add User"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default AddUser;
