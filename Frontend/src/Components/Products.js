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
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    getProducts();
  }, [cat]);

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
        : products
            .slice(0, 8)
            .map((item) => <ProductItem item={item} key={item._id} />)}
    </Container>
  );
};


export default Products;
