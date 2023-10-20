import React from 'react'
import Baner from './component/Baner'
import Carousel from './component/Carousel'
import FeaturedProducts from './component/FeaturedProducts'
import { getFlashSaleBook, getTheLatestBook } from '../../api/SachAPI'
import './css/home-page.scss'
import { useParams } from 'react-router-dom'

function HomePage() {

   const { maTheLoai } = useParams();
   let matheloaiNumber = 0;
   try {
      matheloaiNumber = parseInt(maTheLoai + '');
   } catch (error) {
      matheloaiNumber = 0;
      console.log(error);


   }

   return (
      <div className=''>
         <Baner />
         <Carousel />
         <div className='head-featured mt-5' >
            <h5>Sách mới nhất</h5>
         </div>
         <FeaturedProducts fetchBooks={getTheLatestBook} />
         <div className='head-featured mt-5 bg-warning' >
            <h5>Flash sale</h5>
         </div>
         <FeaturedProducts fetchBooks={getFlashSaleBook} />

      </div>
   )
}

export default HomePage
