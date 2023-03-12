import Homepage from "./Pages/Homepage";
import ProductList from "./Pages/Fungicide";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  },
  media:{
    mobile:"768px",
    tab:"998px",
  }
}));
const App = () => {
  const classes =useStyles();
  return (
    <BrowserRouter>
    <div className={classes.App}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>} exact/>
        <Route path="/Fungicide/:id" element={<Fungicide/>} exact/>
        <Route path="/Herbicide/:id" element={<Herbicide/>} exact/>
        <Route path="/Insecticide/:id" element={<Insecticide/>} exact/>
        <Route path="/Product/:id" element={<Product/>} exact/>
        <Route path="/Register/" element={<Register/>} exact/>
        <Route path="/Login/" element={<Login/>} exact/>
        <Route path="/Cart/:id" element={<Cart/>} exact/>
      </Routes>
      <Enquiry/>
      <Footer/>
    </div>
    </BrowserRouter>
  )
};

export default App;