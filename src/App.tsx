import React from 'react';
import './App.scss';
import Navbar from './layouts/header-footer/Navbar';
import HomePage from './layouts/home/HomePage';
import Footer from "./layouts/header-footer/Footer";
import HeaderBaner from './layouts/header-footer/HeaderBaner';
import ListProduct from './layouts/product/ListProduct';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './layouts/home/component/About';
import ProductDetail from './layouts/product/component/ProductDetail';
import NotFound404 from './layouts/ultils/NotFound404';
import NavbarBottom from './layouts/product/component/NavbarBottom';
import ErrorPage from './layouts/erorr/ErrorPage';
import DangKy from './layouts/user/DangKy';


function App() {

  return (
    <>
      <HeaderBaner />
      <div className={'container'}>
        <BrowserRouter>
          <Navbar />
          <NavbarBottom/>
         
          <Routes>

            <Route path='/' element={<HomePage />} />
            <Route path='/san-phams' element={<ListProduct />} />
            <Route path='/san-phams/:maSach' element={<ProductDetail/>} />

            {/* Đăng kí */}

            <Route path='/dangky' element={<DangKy />}/>

            <Route path='/gioi-thieu' element={<About />} />
            <Route path='/404notfound' element={<NotFound404 />} />
            <Route path='/error' element={<ErrorPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>

      </div>
    </>

  );
}

export default App;
