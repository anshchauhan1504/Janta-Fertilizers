import Homepage from "./Pages/Homepage";
import ProductList from "./Pages/ProductList";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Fungicide from "./Pages/Fungicide";
import Herbicide from "./Pages/Herbicide";
import Insecticide from "./Pages/Insecticide";
import Enquiry from "./Components/Enquiry";
import Footer from "./Components/Footer";
import { makeStyles } from "@material-ui/core";
import Product from "./Pages/Product";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Success from "./Pages/Success";
import { useSelector } from "react-redux";

const useStyles=makeStyles(()=>({
  App: {
    color:"black",
    minHeight:"100vh",
    overflowX:"hidden",
    // overflowY:"scroll"
  },
  
}));
const App = () => {
  const user=useSelector((state)=>state.user.currentUser);
  const classes =useStyles();
  return (
    <BrowserRouter>
    <div className={classes.App}>
      
      <Routes>
        <Route path="/" element={<Homepage/>} exact/>
        {/* <Route path="/Fungicide/:id" element={<Fungicide/>} exact/>
        <Route path="/Herbicide/:id" element={<Herbicide/>} exact/>
        <Route path="/Insecticide/:id" element={<Insecticide/>} exact/> */}
        <Route path="/Product/:id" element={<Product/>} exact/>
        <Route path="/Register/" element={user ? <Navigate to="/" /> : <Register />} exact/>
        <Route path="/Login/" element={user ? <Navigate to="/" /> : <Login />} exact/>
        <Route path="/products/:category" element={<ProductList/>} exact/>
        <Route path="/Cart" element={<Cart/>} exact/>
        <Route path="/Success" element={<Success/>} exact/>
      </Routes>

    </div>
    </BrowserRouter>
  )
};

export default App;