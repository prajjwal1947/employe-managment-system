import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import "./style/style-mobile.css";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import NotFound from "./components/NotFound.jsx";
import EmployeeForm from "./components/EmployeeForm.jsx";
import ListEmployee from "./components/EmployeeList.jsx";
import ViewEmployee from "./components/ViewEmployee.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { isUserLoggedIn } from "./services/AuthService.js";
import Homepage from "./components/Homepage.jsx";


function App() {
  function AuthenticatedRoute({ children }) {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    }

    return <Navigate to="/" />;
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="" element={<Homepage />}> </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />} ></Route>
        <Route path="/list" element={<AuthenticatedRoute><ListEmployee /></AuthenticatedRoute>}></Route>
        <Route path="/add" element={<AuthenticatedRoute><EmployeeForm /></AuthenticatedRoute>} ></Route>
        <Route path="/update/:id" element={<AuthenticatedRoute><EmployeeForm /></AuthenticatedRoute>}></Route>
        <Route path="/view/:id" element={<AuthenticatedRoute><ViewEmployee /></AuthenticatedRoute>}></Route>
        <Route path="*" element={<NotFound />} ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
