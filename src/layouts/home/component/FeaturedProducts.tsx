import React, { useEffect, useState } from 'react';

import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import { getAllBooks } from "../../../api/SachAPI";
import BookModel from "../../../models/BookModel";
import BookProps from "../../product/component/BookProps";



interface Props { fetchBooks: () => Promise<any>; }

//  Nếu không FeaturedProducts: React.FC<Props> nếu không thì sẽ chỉ là component rỗng
const FeaturedProducts: React.FC<Props> = ({ fetchBooks }) => {


    const [productList, setProductList] = useState<BookModel[]>([]); // Khi cập nhật thì tự động cập nhật giao diện

    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);

    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        fetchBooks().then(
            data => {
                setProductList(data.result);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setBaoLoi(error.message)
            }
        )

    }, [fetchBooks]) // Chỉ gọi 1 lần

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
    return (
        <div className={'border container'}>
            <div className={"row mt-4"}>

                {
                    productList.map((book) => (
                        <div className='col-xl-2 col-md-3 book-hover'>
                            <BookProps key={book.maSach} book={book} />
                        </div>
                    ))
                }


            </div>
            <div className={'mt-5 mb-4 d-flex justify-content-around align-items-center'}>
                <button type="button" className="btn btn-outline-danger">Xem thêm</button>
            </div>
        </div>
    );

}

export default FeaturedProducts;