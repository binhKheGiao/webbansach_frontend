import React, { useEffect, useState } from 'react';
import { getAllImageByIdBook } from '../../../api/ImageAPI';

import IImageModel from "../../../models/IImageModel";
import DangTaiDuLieuComponent from '../../ultils/DangTaiDuLieuComponent';

interface HinhAnhSanPham {
    maSach: number;

}

const HinhAnhSanPham: React.FC<HinhAnhSanPham> = (props) => {

    const maSach: number = props.maSach;

    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);

    const [baoLoi, setBaoLoi] = useState(null);

    const [selectedImage, setSelectedImage] = useState<IImageModel | null>(null);

    const [danhSachAnh, setDanhSachAnh] = useState<IImageModel[]>([]);

    const [hinhAnhDangChon, setHinhAnhDangChon] = useState<IImageModel | null >(null);

    const [hinhAnhTruocDo, setHinhAnhTruocDo] = useState<IImageModel | null>(null);
    // gọi hàm thay đổi hình ảnh đang chọn
    const chonAnh = (image: IImageModel) => {
        setHinhAnhDangChon(image);
        setHinhAnhTruocDo(image);
        setSelectedImage(image)
    }
    const hoverImage = (image: IImageModel) => {
        setHinhAnhDangChon(image);
    }

    useEffect(() => {
        getAllImageByIdBook(maSach).then(
            data => {
                setDanhSachAnh(data);
                if (data.length > 0) {
                    data.forEach((item) => {
                        if (item.icon) {
                            setHinhAnhDangChon(item);
                            setSelectedImage(item);
                        }
                    });
                    setDangTaiDuLieu(false);
                }
                if (data.length == 0) {
                    setDangTaiDuLieu(true);
                }
            }
        ).catch(
            error => {

                setBaoLoi(baoLoi);                
            }
        )

    }, [maSach])

    if (dangTaiDuLieu) {
        return (
           <>
            <DangTaiDuLieuComponent/>
           </>
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
        <div className='row'>
            <div  className=' h-100 overflow-hidden object-fit-contain'>
                {(hinhAnhDangChon) && <img className='mw-100' src={hinhAnhDangChon?.duLieuAnh} />}
            </div>
            <div>
                <div className='d-flex align-items-center justify-content-sm-start mt-3 ' >

                    {
                        danhSachAnh.map((hinhAnh, index) => (
                            <div className={` m-1 px-1   ${selectedImage === hinhAnh ? "border border-2 p-1 border-primary" : " "}`} key={index} onMouseOver={() => hoverImage(hinhAnh)} onMouseOut={() => hinhAnhTruocDo == null ? chonAnh(hinhAnh) : chonAnh(hinhAnhTruocDo)} onClick={() => chonAnh(hinhAnh)} >
                                <img src={hinhAnh.duLieuAnh} alt="" style={{ width: '50px' }} />
                            </div>
                        ))
                    }

                </div>

            </div>

        </div>
    )
}

export default HinhAnhSanPham
