import React, { useEffect, useState } from 'react';
import BookModel from "../../../models/BookModel";
import { getAllImageByIdBook } from "../../../api/ImageAPI";
import IImageModel from "../../../models/IImageModel";
import { Link } from 'react-router-dom';
import DangTaiDuLieuComponent from '../../ultils/DangTaiDuLieuComponent';
import renderRaiting from '../../ultils/renderRaiting';

interface BookPropsInterface {

    book: BookModel;
}

const BookProps: React.FC<BookPropsInterface> = (props) => {

    const bookId: number = props.book.maSach;

    const [rating, setRating] = useState(0);

    const [imageList, setImageList] = useState<IImageModel[]>([])

    const [loadingData, setLoadingData] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {
        getAllImageByIdBook(bookId).then(
            imageData => {
                setImageList(imageData);
                setLoadingData(false);
            }
        ).catch(
            error => {
                setError(error.message);
            }
        );

    }, []) // chỉ gọi 1 lần

    if (loadingData) {
        return (
            <>
                <DangTaiDuLieuComponent />
            </>
        )
    }

    if (error) {
        return (
            <div>
                <h1>Gặp lỗi : {error}</h1>
            </div>

        )
    }

    // Sau khi có được danh sách hình ảnh thì lấy ra icon

    let bookAvata = null;

    imageList.forEach(image => {
        if (image.icon == true) {
            bookAvata = image.duLieuAnh;
        }
    })

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const formattedPrice = (price: number) => {
        return formatter.format(price);
    }


    return (
        <div >
            <div className="card  border-0 p-2 ">
                <Link className='' style={{ 'textDecoration': 'none', 'color': 'black', 'minWidth' : '100%' }} to={`/san-phams/${props.book.maSach}`}  >
                    <img
                        src={`${bookAvata}`}
                        className="card-img-top d-block ms-auto me-auto"
                        alt={""}
                        style={{ height: '175px', width: '158px' }}
                    />
                    <div className="card-body">
                        <h6 className="card-title text-truncate">{props.book.tenSach}</h6>
                        <p className="card-text  text-truncate">{props.book.moTa}</p>
                        <strong>{renderRaiting(props.book.trungBinhXepHang?props.book.trungBinhXepHang: 5)}</strong>
                        <div className="price d-block">
                            <span className="original-price">
                                <strong className={'text-danger text-orgin-price'}>
                                    {props.book.giaBan != (undefined || null) ? formattedPrice(props.book.giaBan) : formattedPrice(0)}
                                </strong>
                            </span>
                            <br />
                            <span className="discounted-price">
                                <del className={'text-discounted'}>
                                    {props.book.giaNiemYet != (undefined || null) ? formattedPrice(props.book.giaNiemYet) : formattedPrice(0)}
                                </del>
                            </span>
                        </div>

                    </div>

                </Link>



                <div className="d-flex align-items-center  p-0 justify-content-around" role="group">
                    {/* <div className=" p-0">
                        <a href="#" className="btn  btn-secondary btn-block">
                            <i className="fas fa-heart"></i>

                        </a>
                    </div>
                    <div className=" p-0">
                        <button className="btn btn-danger btn-block">
                            <i className="fas fa-shopping-cart"></i>
                        </button>
                    </div> */}
                </div>


            </div>
        </div>
    );
};

BookProps.propTypes = {};

export default BookProps;