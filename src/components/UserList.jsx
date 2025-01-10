import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUserAsync } from "../redux/userSlice";
import { Link } from "react-router-dom";

const UserList = () => {
  const { users, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserAsync(id))
        .unwrap()
        .then(() => alert("User deleted successfully!"))
        .catch((err) => alert(`Failed to delete user: ${err}`));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>User List</h2>
      <Link to="/add-user">Add User</Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>
              {user.name} ({user.email})
            </span>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
            <Link to={`/edit-user/${user.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
