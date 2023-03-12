import styled from "styled-components"
import { Add, Remove } from "@material-ui/icons";
import { useNavigate, useParams } from 'react-router-dom';
import { FungiItems, HerbiItems, InsectItems, popularProducts } from "../data";
import { mobile } from "../Responsive";
const Container=styled.div`
 
`
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
 
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
  &:hover{
      background-color: #f8f4f4;
  }
`;
const Product = () => {
  const navigate=useNavigate();
  const { id } = useParams();
  let item;
  if(id>=13 && id<=20){
    item = FungiItems.find((item) => item.id === parseInt(id));
  }
  else if(id>=5 && id<=12 ){
    item = popularProducts.find((item) => item.id === parseInt(id));
  }
  else if(id>=21 && id<=28){
    item = HerbiItems.find((item) => item.id === parseInt(id));
  }
  else if(id>=29 && id<=36){
    item = InsectItems.find((item) => item.id === parseInt(id));

  }

  // console.log(item);
  return (
    <Container>
        <Wrapper>
            <ImgContainer>
            <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
          <Title>{item.title}</Title>
          <Desc>
            {item.desc}
          </Desc>
          <Price>{item.price}</Price>
          <AddContainer>
            <AmountContainer>
              <Remove />
              <Amount>1</Amount>
              <Add />
            </AmountContainer>
            <Button onClick={()=>navigate(`/Cart/${id}`)}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
        </Wrapper>

    </Container>
  )
}

export default Product
