import React from 'react'
import Baner from "./component/Baner";
import Carousel from "./component/Carousel";

import ListProduct from "../product/ListProduct";
import FeaturedProducts from "./component/FeaturedProducts";
import {getFlashSaleBook, getTheLatestBook} from "../../api/SachAPI";

import "./css/home-page.scss"

function HomePage() {
    return (
        <div >
            <Baner/>
            <Carousel/>

            <div className={'border d-block mt-5 head-featured'}>
                <h5 className={''}>SÁCH MỚI NHẤT</h5>
            </div>
            <FeaturedProducts  fetchBooks={getTheLatestBook}/>
            <div className={'border d-block bg-warning  mt-5 head-featured'}>
                <h5 className={''}>FLASH SALE </h5>
            </div>
            <FeaturedProducts  fetchBooks={getFlashSaleBook}/>
            <div><h1>Danh Sách Sản Phẩm</h1></div>
            <ListProduct/>
        </div>
    )
}

export default HomePage
