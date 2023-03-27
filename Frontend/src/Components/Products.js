import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import ProductItem from "./ProductItem";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Products = ({cat,sort}) => {
  const [products, setProducts] = useState([]);
  const [sortproducts,setSortedProducts]=useState([]);
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://janta-fertilizer-server.onrender.com/api/products?category=${cat}`
            : "https://janta-fertilizer-server.onrender.com/api/products"
        );
        setProducts(res.data);
        
      } catch (err) {
        console.log(err)
      }
    };
    getProducts();
    
  }, [cat]);
const nullCategoryProducts = products.filter((product) => product.categories.length === 0);
  // console.log(nullCategoryProducts);
  useEffect(() => {
    if (sort === "newest") {
      setSortedProducts((prev) =>
        [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } else if (sort === "asc") {
      setSortedProducts((prev) =>
        [...products].sort((a, b) => a.price - b.price)
      );
    } else {
      setSortedProducts((prev) =>
        [...products].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort, products]);

  return (
    <Container>
      {cat
        ? sortproducts.map((item) => (
            <ProductItem item={item} key={item._id} />
          ))
        : nullCategoryProducts.length > 0
          ? nullCategoryProducts
              .slice(0, 8)
              .map((item) => <ProductItem item={item} key={item._id} />)
          : <div>No products found.</div>
      }
    </Container>
  );
};


export default Products;
