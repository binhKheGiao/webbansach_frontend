import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Navbar from './layouts/header-footer/Navbar';
import HomePage from './layouts/home/HomePage';
import Footer from "./layouts/header-footer/Footer";
import {getAllBooks} from "./api/SachAPI";

function App() {
    getAllBooks().then().catch();
  return (
    <div className={'container'}>
      <Navbar/>
      <HomePage/>
      {/*<Footer/>*/}
    </div>
  );
}

export default App;
