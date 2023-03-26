import { Add, Remove } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Enquiry from "../Components/Enquiry";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { mobile } from "../Responsive";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestmethods";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
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
  justify-content:center;
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
  const [cartItems, setCartItems] = useState([]);
  const [totalamount, setTotalAmount] = useState(0);
  const key = process.env.REACT_APP_STRIPE;
  const [totalItems, setTotalItems] = useState("");
  const [stripetoken, setStripetoken] = useState(null);
  const dispatch = useDispatch();
  const onToken = (token) => {
    setStripetoken(token);
  };
  const cookies = new Cookies();
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/carts/cartItems",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // set the cookie header with the user's cookie
            },
            body: JSON.stringify({ userId: cookies.get("userId") }),
            credentials: "include",
          }
        );
        const data = await response.json();
        console.log(data);
        setCartItems(data.cartItems);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItems();
  }, []);

  //Get total length of user cart array
  useEffect(() => {
    const fetchlength = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/user", {
          method: "POST",
          body: JSON.stringify({
            userId: cookies.get("userId"),
          }),
          credentials: "include",
        });
        const content = await res.json();
        console.log(content);
        let totalAmount = 0;
        for (let i = 0; i < content.user.cart.length; i++) {
          //Get total amount of items stored in user cart array
          totalAmount += content.user.cart[i].price*content.user.cart[i].quantity;
        }
        setTotalAmount(totalAmount);
        setTotalItems(content.user.cart.length);
      } catch (error) {
        console.log(error);
        // Handle error here
      }
    };

    fetchlength();
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === productId) {
        if (newQuantity < 1) {
          // If the new quantity is less than 1, remove the product from the cart
          return null;
        } else {
          // Otherwise, update the quantity and price of the product
          return {
            ...item,
            quantity: newQuantity,
            price: item.price * item.quantity,
          };
        }
      } else {
        return item;
      }
    });

    // Remove any null items from the updated cart
    const filteredCartItems = updatedCartItems.filter((item) => item !== null);

    // Update the cart items in the state
    setCartItems(filteredCartItems);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post(
          "http://localhost:5000/api/checkout/payment",
          {
            tokenId: stripetoken.id,
            amount: 500,
          }
        );
        navigate("/success", {
          state: {
            stripeData: res.data,
            products: cartItems,
          },
        });
      } catch (err) {
        console.log(err);
      }
    };

    stripetoken && makeRequest();
  }, [stripetoken, totalamount, navigate]);

  //Explanation of useEffect
  //   we are performing an asynchronous operation using userRequest.post to submit a payment with Stripe. Once the payment has been successfully processed, we use history.push (or navigate) to navigate to the "/success" page and pass along two pieces of data as state: stripeData and products. stripeData contains the data returned by Stripe in response to the payment request, while products contains the cart items that were submitted for payment.

  // This effect depends on the stripetoken, cart.total, and history variables, so it will re-run whenever any of these variables change. If stripetoken is truthy (i.e. if a token has been obtained from Stripe), the makeRequest function is called. This function sends a POST request to our server with the tokenId and amount parameters. If the request is successful, the client is redirected to the "/success" page with the stripeData and products data. If there is an error in the request or the stripetoken is falsy, nothing happens.
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
            <TopText>Shopping Bag({totalItems})</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cartItems.map((item) => (
              <Product key={item._id}>
                <ProductDetail>
                  <Image src={item.productImage} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {item.productTitle}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {item.productId}
                    </ProductId>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    {/* <Add
                      
                    /> */}
                    <ProductAmount>{item.quantity}</ProductAmount>
                    {/* <Remove
                      
                    /> */}
                  </ProductAmountContainer>
                  <ProductPrice>₹ {item.price}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹ {totalamount}</SummaryItemPrice>
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
              <SummaryItemPrice>
                ₹
                {totalamount > 0 && totalamount >= 120
                  ? totalamount - 120
                  : totalamount}
              </SummaryItemPrice>
            </SummaryItem>
            {totalamount > 0 && (
              <StripeCheckout
                name="Janta Fertilizers"
                image="http://www.dayalgroup.com/img/dg-logo.jpg"
                billingAddress
                shippingAddress
                description={`Your total is ₹${
                  totalamount > 0 && totalamount >= 120
                    ? totalamount - 120
                    : totalamount
                }`}
                amount={
                  (totalamount > 0 && totalamount >= 120
                    ? totalamount - 120
                    : totalamount) * 100
                }
                token={onToken}
                stripeKey={key}
                currency="INR"
              >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Enquiry />
      <Footer />
    </Container>
  );
};

export default Cart;
