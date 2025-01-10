import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import ProductList from "./components/ProductList";
import AddUser from "./components/AddUser";
import AddProduct from "./components/AddProduct";
import EditUser from "./components/EditUser";
import EditProduct from "./components/EditProduct";
import Login from "./components/Login";
import { useSelector } from "react-redux";

const App = () => {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <div>
        {/* {!isAuthenticated ? (
          <Login />
        ) : ( */}
        <Routes>
          {/* users */}
          <Route path="/users" element={<UserList />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          {/* products */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Routes>
        {/* // )} */}
      </div>
    </Router>
  );
};

export default App;
