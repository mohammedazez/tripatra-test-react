import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserAsync } from "../redux/userSlice";

const AddUser = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      alert("Both name and email are required!");
      return;
    }

    dispatch(addUserAsync({ name, email }))
      .unwrap()
      .then(() => {
        alert("User added successfully!");
        setName("");
        setEmail("");
      })
      .catch((err) => {
        alert(`Failed to add user: ${err}`);
      });
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add User"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AddUser;
