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

  const [quantity, setQuantity] = useState(1);

  const quantityBookExits = book?.soLuong ? book.soLuong : 0;

  const increasingQuantity = () => {

    if (quantity < quantityBookExits) {
      setQuantity(quantity + 1);
    }

  }

  const reduceQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }

  }

  const handlerQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= quantityBookExits) {
      setQuantity(newQuantity);
    }
    if (!isNaN(newQuantity) && newQuantity > quantityBookExits) {
      setQuantity(quantityBookExits);
    }

  }

  const handlerBuyNow = () => {
    alert("Thêm vào gio hang");
  }


  const handlerAddToCard = () => {
    alert("them vào")
  }





  useEffect(() => {
    getBookById(maSachNumber)
      .then((book) => {
        console.log("mã sách " + maSachNumber);

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
        <DangTaiDuLieuComponent />
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
          <HinhAnhSanPham maSach={maSachNumber} />
        </div>
        <div className='col-8'>
          <div className='row'>
            <div className='col-8'>
              <h1>{book.tenSach}</h1>
              <h6>{renderRaiting(book.trungBinhXepHang ? book.trungBinhXepHang : 0)}</h6>
              <h6>{formattedPrice(book.giaBan ? book.giaBan : 0)}</h6>
              <div dangerouslySetInnerHTML={{ __html: (book.moTa + '') }} ></div>

            </div>
            <div className='col-4'>
              <div>
                <div className='mb-2'>Số Lượng</div>
                <div className='d-flex align-items-center'>
                  <button style={{ minWidth: '40px' }} className='btn btn-outline-danger me-2' onClick={reduceQuantity}>-</button>
                  <input

                    className='w-25  form-control border border-danger text-center'
                    style={{ 'minWidth': '50px' }}
                    type='number'
                    min={1}
                    onChange={handlerQuantity}
                    value={quantity} />
                  <button className='btn btn-outline-danger ms-2' style={{ minWidth: '40px' }} onClick={increasingQuantity}>+</button>
                </div>
                {
                  book.giaBan && (
                    <div className='mt-2 '>
                      Số tiền tạm tính
                      <h3 className='text-danger'>{formattedPrice(quantity * book.giaBan)}</h3>
                    </div>
                  )
                }
                <div className='d-grid gap-3'>
                  <button type='button' onClick={handlerBuyNow} className='btn btn-danger mt 3'>Mua Ngay</button>
                  <button type='button' onClick={handlerAddToCard} className='btn btn-outline-secondary mt 3'>Thêm vào giỏ hàng</button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
      <div>
        <ProductReview maSach={maSachNumber} />
      </div>
    </div>
  )
}

export default ProductDetail
