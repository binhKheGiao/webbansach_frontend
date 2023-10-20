import React from 'react';
import './App.scss';
import Navbar from './layouts/header-footer/Navbar';
import HomePage from './layouts/home/HomePage';
import Footer from "./layouts/header-footer/Footer";
import HeaderBaner from './layouts/header-footer/HeaderBaner';
import ListProduct from './layouts/product/ListProduct';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './layouts/home/component/About';

function App() {

  return (
    <>
      <HeaderBaner />
      <div className={'container'}>
        <BrowserRouter>
          <Navbar />
          <Routes>

            <Route path='/' element={<HomePage />} />
            <Route path='/san-phams' element={<ListProduct />} />
            <Route path='/:maTheLoai' element={<About />} />
            <Route path='/gioi-thieu' element={<About />} />

          </Routes>
          <Footer />
        </BrowserRouter>

      </div>
    </>

  );
}

export default App;
