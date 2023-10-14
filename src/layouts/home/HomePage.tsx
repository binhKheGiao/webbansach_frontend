import React from 'react'
import Baner from './component/Baner'
import Carousel from './component/Carousel'
import FeaturedProducts from './component/FeaturedProducts'
import { getFlashSaleBook, getTheLatestBook } from '../../api/SachAPI'
import './css/home-page.scss'

function HomePage() {
  return (
    <div>
       <Baner/>
       <Carousel/>
       <div className='head-featured mt-5' >
          <h5>Sách mới nhất</h5>
       </div>
       <FeaturedProducts fetchBooks={getTheLatestBook}/>
       <div className='head-featured mt-5 bg-warning' >
          <h5>Flash sale</h5>
       </div>
       <FeaturedProducts fetchBooks={getFlashSaleBook}/>

    </div>
  )
}

export default HomePage
