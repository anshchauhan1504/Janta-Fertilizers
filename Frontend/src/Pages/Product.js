import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FungiItems, HerbiItems, InsectItems, popularProducts } from "../data";
import { mobile } from "../Responsive";
import Navbar from "../Components/Navbar";
import Enquiry from "../Components/Enquiry";
import Footer from "../Components/Footer";
import { publicRequest } from "../requestmethods";
import { useEffect, useState } from "react";
import { addproduct } from "../Redux/cartredux";
import { useDispatch } from "react-redux";
const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
  margin-left: 200px;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  /* cursor:pointer; */
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;
const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handlequantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1); //Basic logic
    } else {
      setQuantity(quantity + 1);
    }
  };

  // The addproduct action creator takes an argument which is an object representing the product being added to the cart. In this case, you are passing an object that is a copy of the product state, with an additional quantity property.
  // The addproduct action creator is called with an argument that is an object representing the product being added to the cart.
  // The object being passed to the action creator is a copy of the product state, with an additional quantity property. The quantity property is set to the value of the quantity state, which represents the quantity of the product being added to the cart.
  // The action creator returns an action object that has a type property set to "ADD_PRODUCT" and a payload property set to the object representing the product being added to the cart.
  // The dispatch function is called with the action object returned by the action creator. This will trigger a state update that adds the product to the shopping cart.
  const handleClick = () => {
    dispatch(addproduct({ ...product, quantity }));
  };


  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>₹{product.price}</Price>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handlequantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handlequantity("inc")} />
            </AmountContainer>
            {/* onClick={()=>navigate(`/Cart/${id}`)} */}
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Enquiry />
      <Footer />
    </Container>
  );
};

export default Product;
