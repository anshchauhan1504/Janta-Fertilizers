import React from 'react'
import Carousel_imp from '../Components/Carousel_imp'
import Categories from '../Components/Categories'
import Products from '../Components/Products'
import "../Pages/homepage.css"



const Homepage = () => {
  return (
    <div>
      
      <Carousel_imp/>
      <Categories/>
      <Products/>

    </div>
  )
}

export default Homepage
