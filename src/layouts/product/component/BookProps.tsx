import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Book from "../../../models/Book";
import BookModel from "../../../models/BookModel";
import ImageModel from "../../../models/ImageModel";
import {getAllImageByIdBook} from "../../../api/ImageAPI";
import IImageModel from "../../../models/IImageModel";

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
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
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
        <a href={"#"} className="col-md-2 book-hover " >
            <div className="card border-0 p-2 ">

                <img
                    src={`${bookAvata}`}
                    className="card-img-top m-auto"
                    alt={""}
                    style={{height: '200px', width: '180px'}}
                />
                <div className="card-body">
                    <h6 className="card-title text-truncate">{props.book.tenSach}</h6>
                    <p className="card-text  text-truncate">{props.book.moTa}</p>
                    <div className="price d-block">
                        <span className="original-price">
                           <strong className={'text-danger text-orgin-price'}>
                               {props.book.giaBan != (undefined || null) ? formattedPrice(props.book.giaBan) : formattedPrice(0)}
                           </strong>
                        </span>
                        <br/>
                        <span className="discounted-price">
                             <del className={'text-discounted'}>
                                 {props.book.giaNiemYet != (undefined || null) ? formattedPrice(props.book.giaNiemYet) : formattedPrice(0)}
                             </del>
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            <a href="#" className="btn  btn-secondary btn-block">
                                <i className="fas fa-heart"></i>

                            </a>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger btn-block">
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </a>
    );
};

BookProps.propTypes = {};

export default BookProps;