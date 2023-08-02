import { Facebook, Instagram, MailOutline, Phone, Room, Twitter } from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components'
import { mobile } from "../Responsive";
const Container=styled.div`
display:flex;
${mobile({ flexDirection: "column" })}
overflow-x: hidden;
`
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const Logo = styled.h1`
font-style:bold;`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
  text-shadow: 2px;
  
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
  text-decoration: none;
  color: black;
  transition: color 0.2s;

  &:hover {
    color: blue;
  }
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;
const SocialIconLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;
const Footer = () => {
  const handleLinkClick = (url) => {
    // Redirect the user to the specified URL when a list item is clicked
    window.location.href = url;
  };
  return (
    <Container>
        <Left>
        <Logo>Janta Fertilizer</Logo>
        <Desc>
        Discover the excellence of Janta Fertilizers – your go-to source for top-quality fertilizers. Our customer-centric approach fosters lasting relationships, ensuring a positive experience with goods and services of unparalleled quality.
        </Desc>
        <SocialContainer>
          <SocialIconLink href="https://www.facebook.com/profile.php?id=100075641943091" target="_blank" rel="noopener noreferrer" color="3B5999">
            <Facebook />
          </SocialIconLink>
          <SocialIconLink href="https://www.instagram.com/anshchauhan13_22/" target="_blank" rel="noopener noreferrer" color="E4405F">
            <Instagram />
          </SocialIconLink>
          <SocialIconLink href="https://twitter.com/ANSHCHA49852121" target="_blank" rel="noopener noreferrer" color="55ACEE">
            <Twitter />
          </SocialIconLink>
        </SocialContainer>
      </Left>
      <Center>
        <Title><b>Useful Links</b></Title>
        <List>
        <List>
          <ListItem onClick={() => handleLinkClick("https://janta-fertilizer.netlify.app/products/Fungicide")}>Fungicide</ListItem>
          <ListItem onClick={() => handleLinkClick("https://janta-fertilizer.netlify.app/products/Growth")}>Growth Control</ListItem>
          <ListItem onClick={() => handleLinkClick("https://janta-fertilizer.netlify.app/products/Herbicide")}>Herbicide</ListItem>
          <ListItem onClick={() => handleLinkClick("https://janta-fertilizer.netlify.app/products/Insecticide")}>Insecticide</ListItem>
        </List>
        </List>
      </Center>
      <Right>
        <Title><b>Contact</b></Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}}/> Near Roadways bust stand, Noorpur, Bijnor(U.P)
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/> +91 9719437625
        </ContactItem>
        <ContactItem>
          <MailOutline style={{marginRight:"10px"}} /> ansh.chauhan15apr@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>

    </Container>
  )
}

export default Footer
