import React, { useEffect, useState } from 'react'
import { getBookById } from '../../../api/SachAPI'
import { useParams } from 'react-router-dom'
import BookModel from '../../../models/BookModel';
import { error } from 'console';
import HinhAnhSanPham from './HinhAnhSanPham';

const ProductDetail = () => {

  // Lấy mã sách từ url
  const { maSach } = useParams();

  let maSachNumber = 0;
  try {
    maSachNumber = parseInt(maSach + '');
    if (Number.isNaN(maSachNumber)) {
      maSachNumber = 0;
    }
  } catch (error) {
    maSachNumber = 0;

  }

  const [book, setBook] = useState<BookModel | null>(null);

  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);

  const [baoLoi, setBaoLoi] = useState(null);



  useEffect(() => {
    getBookById(maSachNumber)
      .then((book) => {
        console.log("mã sách "+maSachNumber);
        
        setBook(book);
        setDangTaiDuLieu(false);
      }



      ).catch((error) => {
        setBaoLoi(error.message);
        setDangTaiDuLieu(false);
      });

  }, [maSach])

  if (dangTaiDuLieu) {
    return (
      <div className='d-flex mt-5 mb-5 align-items-center justify-content-center'  >

        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (baoLoi) {
    return (
      <div>
        <h1>Gặp lỗi : {baoLoi}</h1>
      </div>

    )
  }

  if (!book) {
    return (
      <div>
        <h1>sach k tồn tại</h1>
      </div>

    )
  }


  return (
    <div className='container'>
      <div className='row'>
        <div className='col-4'>
          <HinhAnhSanPham maSach={maSachNumber}/>
        </div>
        <div className='col-8'>
          <div className='row'>
            <div className='col-8'>
              <h1>{book.tenSach}</h1>
              <h1>{book.trungBinhXepHang}</h1>
              <div dangerouslySetInnerHTML={{__html:(book.moTa+'')}} ></div>

            </div>
            <div className='col-4'>
              Phần đặt hàng
            </div>
          </div>

        </div>
      </div>
      <div>
        Phần re view
      </div>
    </div>
  )
}

export default ProductDetail
