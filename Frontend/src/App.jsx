import Homepage from "./Pages/Homepage";
import ProductList from "./Pages/ProductList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core";
import Product from "./Pages/Product";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Success from "./Pages/Success";
const useStyles=makeStyles(()=>({
  App: {
    color:"black",
    // minHeight:"100vh",
    overflowX:"hidden",
  },
}));
const App = () => {
  const classes =useStyles();
  return (
    <BrowserRouter>
    <div className={classes.App}>
 
      <Routes>
        <Route path="/" element={<Homepage/>} exact/>
        <Route path="/products/:category" element={<ProductList/>} exact/>
        <Route path="/product/:id" element={<Product/>} exact/>
        <Route path="/register/" element={<Register/>} exact/>
        <Route path="/login/" element={<Login/>} exact/>
        <Route path="/cart" element={<Cart/>} exact/>
        <Route path="/success" element={<Success/>} exact/>
      </Routes>

    </div>
    </BrowserRouter>
  )
};

export default App;