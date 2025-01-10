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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Home Page</h1>
      <p>Please select a page to view:</p>
      <button
        onClick={goToUsers}
        style={{ padding: "10px 20px", margin: "10px" }}
      >
        Go to User List
      </button>
      <button
        onClick={goToProducts}
        style={{ padding: "10px 20px", margin: "10px" }}
      >
        Go to Product List
      </button>
    </div>
  );
};

export default Home;
