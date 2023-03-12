import styled from "styled-components";
import { FungiItems } from "../data";
import FungiItem from "../Components/FungiItem";
import { mobile } from "../Responsive";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Title = styled.h1`
  margin: 20px;
  flex-basis: 100%;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color:#f5fbfd;
`;
const Filter = styled.div`
  margin: 20px;
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const Fungicide = () => {
  return (
    <Container>
      <Title>Fungicide</Title>
      <FilterContainer>
      <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <ImageContainer>
        {FungiItems.map((item) => (
          <FungiItem item={item} key={item.id} />
        ))}
      </ImageContainer>
    </Container>
  );
};



export default Fungicide;
