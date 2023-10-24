import React, { useEffect, ChangeEvent, useState, useCallback } from 'react'
import { getBookBySearchValue } from '../../api/SachAPI';
import BookModel from "../../models/BookModel";
import IImageModel from "../../models/IImageModel"
import { getAllImageByIdBook } from '../../api/ImageAPI';
import '../header-footer/header-footer.scss'
import BookSearch from '../product/component/BookSearch';
import { debounce } from '@mui/material';
import { Search } from 'react-bootstrap-icons';




const Navbar = () => {

  const [querySearch, setQuerySearch] = useState('');

  const [imageList, setImageList] = useState<IImageModel[]>([])

  const [productList, setProductList] = useState<BookModel[]>([])

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {

    let query = e.target.value.trim();
    if (query == '') {
        productList.length = 0;
    }
    setQuerySearch(query);
  
    
  }

  const debouncedSearch = useCallback(
    debounce((query:string) => {
      if (query === "") {
        setProductList([]);
        return;
      }
      // Nếu query không rỗng, gọi hàm getBookBySearchValue
      getBookBySearchValue(query)
        .then((data) => {
          setProductList(data.result);
        })
        .catch((error) => {
          console.log("có lỗi");
        });
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(querySearch); // Gọi debouncedSearch function với query hiện tại
    return () => {
      debouncedSearch.clear(); // Hủy bỏ debouncedSearch function khi component unmount
    };
  }, [querySearch, debouncedSearch]);



  return (

    <nav className="navbar navbar-expand-lg bg-light navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png" width="250px" height='50px' alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Trang chủ</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Thể loại sách
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li><a className="dropdown-item" href="1">Thể loại 1</a></li>
                <li><a className="dropdown-item" href="2">Thể loại 2</a></li>
                <li><a className="dropdown-item" href="3">Thể loại 3</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Quy định bán hàng
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                <li><a className="dropdown-item" href="#">Quy định 1</a></li>
                <li><a className="dropdown-item" href="#">Quy định 2</a></li>
                <li><a className="dropdown-item" href="#">Quy định 3</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Liên hệ</a>
            </li>
          </ul>
        </div>

        {/* Tìm kiếm */}
        <form className="d-flex position-relative">
          <input className="form-control input-search me-4" onChange={onSearchInputChange} type="search" placeholder="Tìm kiếm" aria-label="Search" />
          <button className="btn btn-danger" type="submit"> <Search/> </button>
          <div className={` ${querySearch == '' ? ' ' : ''} hidden position-absolute top-100 border rounded-3  ulsearch-nav`}>

            <ul className="list-group  ">
              {
                productList.map((book) =>
                  <BookSearch book={book} />
                )
              }
            </ul>
          </div>
        </form>


        {/* Biểu tượng giỏ hàng */}
        <ul className="navbar-nav me-1">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-shopping-cart"></i>
            </a>
          </li>
        </ul>

        {/* Biểu tượng đăng nhập */}
        <ul className="navbar-nav me-1">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-user"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    

  )

}
export default Navbar
