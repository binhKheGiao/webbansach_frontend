import React, { useEffect, useState } from 'react';
import { layToanBoDanhGiaCuaMotSach } from '../../../api/DanhGiaAPI';

import DanhGiaModel from '../../../models/DanhGiaModel';

import renderRaiting from '../../ultils/renderRaiting';
interface PriviewProduct {
    maSach: number;

}

const ProductReview: React.FC<PriviewProduct> = (props) => {

    const maSach: number = props.maSach;

    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);

    const [baoLoi, setBaoLoi] = useState(null);

    const [reviewList, setReviewList] = useState<DanhGiaModel[]>([]);


    useEffect(() => {
        layToanBoDanhGiaCuaMotSach(maSach)
            .then(
                data => {
                    setReviewList(data)
                    setDangTaiDuLieu(false);
                }
            )
            .catch(
                error => {
                    setDangTaiDuLieu(false)
                    setBaoLoi(error.message)
                }

            )


    }, [maSach])


   


    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu {props.maSach}</h1>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        );
    }

    return (
        <div className='container mt-2 mb-2'>
            <h5>Đánh Gía Sản Phẩm</h5>
            {reviewList.map((danhGia) => (
                <div className='row'>
                    <div className='col-4 text-end'>
                        <p>{renderRaiting(danhGia.diemXepHang?danhGia.diemXepHang:0)}</p>
                    </div>
                    <div className='col-8'>
                        <p>{danhGia.nhanXet}</p>
                    </div>

                </div>
            ))
            
            }


        </div>
    )
}

export default ProductReview

