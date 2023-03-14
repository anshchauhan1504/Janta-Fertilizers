import { Add, Remove } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Enquiry from "../Components/Enquiry";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { FungiItems, HerbiItems, InsectItems, popularProducts } from "../data";
import { mobile } from "../Responsive";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestmethods";
import { useDispatch } from "react-redux";
import { setProducts, setTotal, setQuantity } from "../Redux/cartredux";
import { addproduct,removeproduct,clearcart } from "../Redux/cartredux";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const Cart = () => {
  // const { id } = useParams();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const key = process.env.REACT_APP_STRIPE;
  const [quantity, setQuantity] = useState(1);
  const [stripetoken, setStripetoken] = useState(null);
  const dispatch = useDispatch();
  const onToken = (token) => {
    setStripetoken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripetoken.id,
          amount: 500,
        });
        navigate("/Success", {
          state: {
            stripeData: res.data,
            products: cart,
          },
        });
      } catch (err) {
        console.log(err);
      }
    };

    stripetoken && makeRequest();
  }, [stripetoken, cart.total, navigate]);
  
  const product=[];

  //Explanation of useEffect
  //   we are performing an asynchronous operation using userRequest.post to submit a payment with Stripe. Once the payment has been successfully processed, we use history.push (or navigate) to navigate to the "/success" page and pass along two pieces of data as state: stripeData and products. stripeData contains the data returned by Stripe in response to the payment request, while products contains the cart items that were submitted for payment.

  // This effect depends on the stripetoken, cart.total, and history variables, so it will re-run whenever any of these variables change. If stripetoken is truthy (i.e. if a token has been obtained from Stripe), the makeRequest function is called. This function sends a POST request to our server with the tokenId and amount parameters. If the request is successful, the client is redirected to the "/success" page with the stripeData and products data. If there is an error in the request or the stripetoken is falsy, nothing happens.
  const handleClick = (product,quantity) => {
    dispatch(addproduct({ ...product, quantity }));
  };
  const handleClick1=(product,quantity)=>{
    dispatch(removeproduct({...product,quantity}));

  }
  // const handlequantity = (type) => {
  //   if (type === "dec") {
  //     quantity > 1 && setQuantity(quantity - 1); //Basic logic
  //   } else {
  //     setQuantity(quantity + 1);
  //   }
  // };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR ITEMS</Title>
        <Top>
          <TopButton onClick={() => navigate(`/`)}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add
                      onClick={()=>{handleClick(product,product.quantity)}}
                    />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove
                      onClick={()=>{handleClick1(product,product.quantity)}}
                    />
                  </ProductAmountContainer>
                  <ProductPrice>
                    ₹ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₹ 100</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>₹ -20</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹{cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Janta Fertilizers"
              image="http://www.dayalgroup.com/img/dg-logo.jpg"
              billingAddress
              shippingAddress
              description={`Your total is ₹${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={key}
              currency="INR"
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Enquiry />
      <Footer />
    </Container>
  );
};

export default Cart;
