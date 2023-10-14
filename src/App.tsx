import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Navbar from './layouts/header-footer/Navbar';
import HomePage from './layouts/home/HomePage';
import Footer from "./layouts/header-footer/Footer";
import {getAllBooks} from "./api/SachAPI";
import HeaderBaner from './layouts/header-footer/HeaderBaner';
import ListProduct from './layouts/product/ListProduct';

function App() {
   
  return (
    <>
    <HeaderBaner/>
     <div className={'container'}>
      <Navbar/>
      <HomePage/>
      <ListProduct/>
      <Footer/>
    </div>
    </>
   
  );
}

export default App;
