import React, { useEffect, useState } from 'react'
import BookModel from '../../../models/BookModel';
import IImageModel from '../../../models/IImageModel';
import { getAllImageByIdBook } from '../../../api/ImageAPI';
import { Link } from 'react-router-dom';

interface BookPropsInterface {

    book: BookModel;
}

const BookSearch: React.FC<BookPropsInterface> = (props) => {
    const bookId: number = props.book.maSach;

    const [rating, setRating] = useState(0);

    const [imageList, setImageList] = useState<IImageModel[]>([])

    const [loadingData, setLoadingData] = useState(true);

    const [error, setError] = useState(null);

    let bookAvata: string = "https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png";

    imageList.forEach(image => {
        if (image.icon == true) {
            bookAvata = image.duLieuAnh != undefined ? image.duLieuAnh : 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png';
        }
    })

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


    return (
        <div>
            <Link className='' style={{ 'textDecoration': 'none', 'color': 'black' }} to={`/san-phams/${props.book.maSach}`}  >

                <li className="px-4 bookSearchIteam border-0 list-group-item d-flex align-items-center">

                    <img width={'40px'} src={`${bookAvata}`} alt="" className='' />
                    <span className='ms-4'> {props.book.tenSach}</span>



                </li>
            </Link>


        </div>
    )
}

export default BookSearch
