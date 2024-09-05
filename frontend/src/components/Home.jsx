import React from 'react'
import HeroCarousel from './HeroCarousel'
import Navbar from './Navbar'
import GalleryMenu from './GalleryMenu'
import Gallery from './Gallery'
import About from './About'

const Home = () => {
  return (
    <div className='relative'>
    <Navbar/>
     <HeroCarousel/> 
    <About/>
     
    </div>
  )
}

export default Home
