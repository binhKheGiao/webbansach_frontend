import React, {useEffect, useState} from 'react';

import BookProps from "./component/BookProps";
import BookModel from "../../models/BookModel";
import {getAllBooks} from "../../api/SachAPI";
import {Simulate} from "react-dom/test-utils";
import Pagination from "@mui/material/Pagination";
import error = Simulate.error;


const ListProduct: React.FC = () => {

    const [productList, setProductList] = useState<BookModel[]>([]); // Khi cập nhật thì tự động cập nhật giao diện

    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);

    const [baoLoi, setBaoLoi] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPage, setTotalPage] = useState(0);

    const [sizeItemPage, setSizeItemPage]  = useState(0);

    const pagination = (page : number) => {
        setCurrentPage(page);
    }   

    useEffect(() => {
        getAllBooks(currentPage-1).then(
            data => {
                setProductList(data.result);
                setDangTaiDuLieu(false);
                console.log("tổng số trang" +data.totalPage);
                setTotalPage(data.totalPage);

            }
        ).catch(
            error => {
                setBaoLoi(error.message)
            }
        )

    }, [currentPage]) // Chỉ gọi 1 lần

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
            <div className={"row mb-4 mt-4"}>
                {
                    productList.map((book) => (
                        <BookProps key={book.maSach} book={book}/>
                    ))
                }
            </div>
            <Pagination page={currentPage} count={totalPage} color="secondary" />  
        </div>
    );

}

export default ListProduct;