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

const useStyles=makeStyles(()=>({
  App: {
    color:"black",
    minHeight:"100vh",
    overflowX:"hidden",
    // overflowY:"scroll"
  },
  
}));
const App = () => {
  const user=true;
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
        <Route path="/Cart/:id" element={<Cart/>} exact/>
      </Routes>

    </div>
    </BrowserRouter>
  )
};

export default App;