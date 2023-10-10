import React, {useEffect, useState} from 'react';
import Book from "../../models/Book";
import BookProps from "./component/BookProps";
import BookModel from "../../models/BookModel";
import {getAllBooks} from "../../api/SachAPI";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const ListProduct: React.FC = () => {

    const [productList, setProductList] = useState<BookModel[]>([]); // Khi cập nhật thì tự động cập nhật giao diện

    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);

    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        getAllBooks().then(
            data => {
                setProductList(data);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setBaoLoi(error.message)
            }
        )

    }, []) // Chỉ gọi 1 lần

    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
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
        <div className={'container'}>
            <div className={"row mt-4"}>
                {
                    productList.map((book) => (
                        <BookProps key={book.maSach} book={book}/>
                    ))
                }
            </div>


        </div>
    );

}

export default ListProduct;