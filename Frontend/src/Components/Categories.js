
import styled from 'styled-components'
import CategoryItem from './CategoryItem.js';
import { categories } from "../data";
import { mobile } from "../Responsive";
const Container=styled.div`
display:flex;
padding:20px;
justify-content:space-between;
background-color:lightgreen;
align-items: center;
${mobile({ padding: "0px", flexDirection:"column" })}
overflow-x: hidden;
`
const Categories = () => {
  return (
    <Container>
        {categories.map(item=>(
            <CategoryItem item={item} key={item.id}/>
        ))}

    </Container>
  )
}

export default Categories
