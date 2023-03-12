import React from 'react'
import Carousel_imp from '../Components/Carousel_imp'
import Categories from '../Components/Categories'
import Enquiry from '../Components/Enquiry'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import Products from '../Components/Products'
import "../Pages/homepage.css"



const Homepage = () => {
  return (
    <div className='hmpage'>
      <Navbar/>
      <Carousel_imp/>
      <Categories/>
      <Products/>
      <Enquiry/>
      <Footer/>

    </div>
  )
}

export default Homepage
