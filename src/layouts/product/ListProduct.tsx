import React, { useEffect, useState } from 'react';

import BookProps from "./component/BookProps";
import BookModel from "../../models/BookModel";
import { getAllBooks } from "../../api/SachAPI";
import { Simulate } from "react-dom/test-utils";
import Pagination from "@mui/material/Pagination";
import error = Simulate.error;
import { Box } from '@mui/material';


const ListProduct: React.FC = () => {

    const [productList, setProductList] = useState<BookModel[]>([]); // Khi cập nhật thì tự động cập nhật giao diện

    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);

    const [baoLoi, setBaoLoi] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPage, setTotalPage] = useState(0);

    const [sizeItemPage, setSizeItemPage] = useState(0);

    // const pagination = (page : number) => {
    //     setCurrentPage(page);
    // }  

    const handleChange = (event: any, page: number) => {
        // Cập nhật state của currentPage bằng value
        setCurrentPage(page);
    };

    useEffect(() => {
        getAllBooks(currentPage - 1).then(
            data => {
                setProductList(data.result);
                setDangTaiDuLieu(false);
                console.log("tổng số trang" + data.totalPage);
                setTotalPage(data.totalPage);
                window.scrollTo(0, 150)

            }
        ).catch(
            error => {
                setBaoLoi(error.message)
            }
        )

    }, [currentPage]) // Chỉ gọi 1 lần

    if (dangTaiDuLieu) {
        return (
            <div className='d-flex align-items-center justify-content-center'  >

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
        <div className={'container row p-0'}>
            <div className='col-md-4   p-4  p-0'>
                <div className='ms-2  '>
                    <h6>Danh mục sản phẩm</h6>
                    <div className='ms-3 d-flex flex-column'>
                        <span>English Book</span>
                        <span>Sách Tiếng Việt</span>
                    </div>
                </div>
                <div className='ms-2'>
                    <h6>Thương Hiệu</h6>
                    <div className='ms-3'>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                            <label className="form-check-label" >
                                Default checkbox
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                            <label className="form-check-label" >
                                Checked checkbox
                            </label>
                        </div>
                    </div>
                </div>
                <div className='ms-2'>
                    <h6>Khoảng Giá</h6>
                    <div className='ms-3'>
                        <div className="form-check">

                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" >
                                0đ - 150,000đ
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                            <label className="form-check-label" >
                                150,000đ - 300,000đ
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                            <label className="form-check-label" >
                                300,000đ - 500,000đ
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                            <label className="form-check-label" >
                                500,000đ - 700,000đ
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                            <label className="form-check-label" >
                                700,000đ - Trở lên
                            </label>
                        </div>
                    </div>
                </div>

            </div>
            <div className='col-md-8 p-0'>
                <div className={"row mb-4 mt-4 "}>
                    {
                        productList.map((book) => (
                            <div className='col-md-3 book-hover'>
                                <BookProps key={book.maSach} book={book} />
                            </div>


                        ))
                    }
                </div>
                <Box display="flex" justifyContent="center">
                    <Pagination page={currentPage} onChange={handleChange} shape="rounded" count={totalPage} color="secondary" />
                </Box>
            </div>
        </div>
    );

}



export default ListProduct