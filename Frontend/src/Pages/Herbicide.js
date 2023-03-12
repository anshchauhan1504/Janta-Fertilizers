
import { HerbiItems } from '../data'
import HerbiItem from "../Components/HerbiItem"
import styled from 'styled-components';
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
const Herbicide = () => {
  return (
    <Container>
      <Title>Herbicide</Title>
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
        {HerbiItems.map((item)=>(
          <HerbiItem item={item} key={item.id}/>
        ))}
      </ImageContainer>
    </Container>
  )
}

export default Herbicide
