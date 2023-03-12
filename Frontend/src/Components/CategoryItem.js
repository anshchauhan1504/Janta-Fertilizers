import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../Responsive";
const Container = styled.div`
 
  display:flex;
  flex: 1;
  height: 70vh;
  position: relative;
  align-items: center;
  margin-left: 65px;
 
`;
const Image = styled.img`
  width: 75%;
  height: 75%;
  ${mobile({ height: "15vh" })}
  /* object-fit: cover; */
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: black;
  position: relative;
  margin-bottom: 20px;
  margin-right:65px;
 
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  margin-right: 80px;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: black;
    transform: scale(1.1);
  }
`;
const CategoryItem = ({ item }) => {
  const navigate=useNavigate();
  return (
    
    <Container key={item.id}>
      {/* <Link to={`/products/${item.cat}`}> */}
      <Image src={item.img} alt={item.title} />
      <Info>
        <Title>{item.title}</Title>
        {/* onClick={()=>navigate(`/${item.title}/${item.id}`)}  This was there in button*/}
        <Button onClick={()=>navigate(`/products/${item.cat}`)}>Buy Now</Button>
      </Info>
      {/* </Link> */}
    </Container>
    
  );
};

export default CategoryItem;
