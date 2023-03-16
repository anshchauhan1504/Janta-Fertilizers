import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Search, ShoppingBasketOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { mobile } from "../Responsive";
import { useSelector } from "react-redux";
import axios from "axios";
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
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`; //This 'left' name can not be changed

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
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
const Navbar = () => {
  const [userEmail, setUserEmail] = useState("");
  const cartProducts = useSelector((state) => state.cart.quantity);
  const navigate = useNavigate();
  function getcookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const userId = getcookie("userId");
  console.log(userId) //This is printing undefined
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        console.log("inside") //This is not hitting 
        const res = await axios.get("http://localhost:5000/api/auth/user", {
          withCredentials: true,
        });
        setUserEmail(res.data.email);
      } catch (error) {
        console.log(error);
      }
    };
  
    if(userId){
      fetchUserEmail();
    }
    else{
      console.log("not working") //This is printing
    }
    
    
  }, []);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo onClick={() => navigate(`/`)}>Janta Fertilizers</Logo>
        </Center>
        <Right>
          {userEmail ? (
            <>
              <MenuItem>{userEmail}</MenuItem>
              <MenuItem onClick={() => navigate(`/Cart`)}>
                <Badge badgeContent={cartProducts} color="primary">
                  <ShoppingBasketOutlined />
                </Badge>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={() => navigate(`/Register/`)}>
                Register
              </MenuItem>
              <MenuItem onClick={() => navigate(`/Login/`)}>Sign In</MenuItem>
              <MenuItem onClick={() => navigate(`/Cart`)}>
                <Badge badgeContent={cartProducts} color="primary">
                  <ShoppingBasketOutlined />
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
