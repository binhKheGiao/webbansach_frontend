import React, { useEffect, useState } from 'react'
import { getBookById } from '../../../api/SachAPI'
import { useParams } from 'react-router-dom'
import BookModel from '../../../models/BookModel';
import { error } from 'console';
import HinhAnhSanPham from './HinhAnhSanPham';
import ProductReview from "./ProductReview";
import DangTaiDuLieuComponent from '../../ultils/DangTaiDuLieuComponent';
import renderRaiting from '../../ultils/renderRaiting';
import formattedPrice from '../../ultils/formattedPrice';


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
        <>
          <DangTaiDuLieuComponent/>
        </>
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
              <h6>{renderRaiting(book.trungBinhXepHang?book.trungBinhXepHang : 0 )}</h6>
              <h6>{formattedPrice(book.giaBan?book.giaBan : 0)}</h6>
              <div dangerouslySetInnerHTML={{__html:(book.moTa+'')}} ></div>

            </div>
            <div className='col-4'>
              Phần đặt hàng
            </div>
          </div>

        </div>
      </div>
      <div>      
        <ProductReview maSach={maSachNumber}/>
      </div>
    </div>
  )
}

export default ProductDetail
