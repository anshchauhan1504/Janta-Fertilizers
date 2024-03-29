import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingBasketOutlined,
} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  
  flex-wrap: wrap;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display:flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const ProductItem = ({ item }) => {
  const navigate=useNavigate();

  return (
    // key={item.id} onClick={()=>navigate(`/Product/${item.id}`)} 
    <Container >
      <Circle />

      <Image src={item.img} />

      <Info>
        <Icon>
          <ShoppingBasketOutlined onClick={()=>navigate(`/cart`)}/>
        </Icon>
        <Icon>
          <SearchOutlined onClick={()=>navigate(`/Product/${item._id}`)}/>
        </Icon>
        {/* <Icon>
          <FavoriteBorderOutlined />
        </Icon> */}
      </Info>
    </Container>
  );
};

export default ProductItem;
