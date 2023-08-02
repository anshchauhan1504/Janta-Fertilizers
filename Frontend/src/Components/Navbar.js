import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Search, ShoppingBasketOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { mobile } from "../Responsive";
import { useSelector } from "react-redux";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { AuthContext } from "../AuthContext";
import "../Pages/Navbarstyle.css";
import Cookies from 'universal-cookie';
const Container = styled.div`
  //Styled components
  height: 60px;
  background-color: lightgreen;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
// const Left = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
// `; //This 'left' name can not be changed

// const Language = styled.span`
//   font-size: 14px;
//   cursor: pointer;
//   ${mobile({ display: "none" })}
// `;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
// const Input = styled.input`
//   border: none;
//   ${mobile({ width: "50px" })}
// `;
const Center = styled.div`
  /* flex: 1; */
  text-align: center;
  justify-content:center;
`;
const Logo = styled.h1`
  font-weight: bold;
  font-size: 27px;
  cursor: pointer;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 15px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

// const cartProducts = useSelector((state) => state.cart.quantity);
const Navbar = () => {
  const [userEmail, setUserEmail] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {

    const fetchData = async () => {
      try {
        console.log(cookies.get('userId'));
        const res = await fetch("https://janta-fertilizer-server.onrender.com/api/auth/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: cookies.get('userId')
        }),
          credentials: "include",

        });
        console.log(res)
        const content = await res.json();
        console.log(content.user);
        if (content.user && content.user.email) {
          setUserEmail(content.user.email); // Set user email if logged in
          setTotalItems(content.user.cart.length);
        } else {
          console.log("not found");
          // Handle missing or invalid data here
        }
      } catch (error) {
        console.log(error);
        // Handle error here
      }
    };

    fetchData();
  }, []);

  //Get total length of user cart array
  function handleCartClick() {
    if (!userEmail) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 1000);
    } else {
      navigate("/login"); // or any other action you want to perform when the user is not logged in
    }
  }



  const handleLogout = async () => {
    try {
      const userId = cookies.get("userId");
      if (!userId) {
        console.log("User is not logged in");
        return;
      }
      
      // Clear the userId cookie
      cookies.remove("userId");
      
      // Call the logout API to update the user's access token
      const response = await fetch(
        "https://janta-fertilizer-server.onrender.com/api/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      // If the logout was successful, update the userEmail state to null
      if (data.message === "Successfully logged out") {
        setUserEmail(null);
        navigate('/');
      }
      // handle success or error response from the API here
    } catch (error) {
      console.log(error);
      // handle error here
    }
  };
  
  
  
  

  return (
    <Container>
      {showAlert && (
        <Alert variant="danger">Please log in to access your cart.</Alert>
      )}
      <Wrapper>
        {/* <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left> */}
        <Center>
          <Logo onClick={() => navigate(`/`)}>Janta Fertilizers</Logo>
        </Center>
        <Right>
          {userEmail ? (
            <>
              <MenuItem className="useremail">{userEmail}</MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              <MenuItem onClick={() => navigate("/Cart")}>
                <Badge badgeContent={totalItems} color="primary">
                  <ShoppingBasketOutlined />
                </Badge>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={() => navigate(`/register/`)}>
                Register
              </MenuItem>
              <MenuItem onClick={() => navigate("/login")}>Sign In</MenuItem>
              <MenuItem>
                <Badge color="primary">
                  <ShoppingBasketOutlined onClick={handleCartClick} />
                </Badge>
              </MenuItem>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
