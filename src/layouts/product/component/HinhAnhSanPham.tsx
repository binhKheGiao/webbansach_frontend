import React, { useEffect, useState } from 'react';
import ImageModel from '../../../models/ImageModel';
import IImageModel from '../../../models/IImageModel';
import { Carousel } from 'react-responsive-carousel';
import { getAllImageByIdBook } from '../../../api/ImageAPI';
import { error } from 'console';

interface HinhAnhSanPham {
    maSach: number;

}

const HinhAnhSanPham: React.FC<HinhAnhSanPham> = (props) => {

    const maSach: number = props.maSach;

    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);

    const [baoLoi, setBaoLoi] = useState(null);

    const [selectedImage, setSelectedImage] = useState<ImageModel | null>(null);

    const [danhSachAnh, setDanhSachAnh] = useState<ImageModel[]>([]);

    const [hinhAnhDangChon, setHinhAnhDangChon] = useState<ImageModel | null>(null);

    const [hinhAnhTruocDo, setHinhAnhTruocDo] = useState<ImageModel | null>(null);
    // gọi hàm thay đổi hình ảnh đang chọn
    const chonAnh = (image: ImageModel) => {
        setHinhAnhDangChon(image);
        setHinhAnhTruocDo(image);
        setSelectedImage(image)
    }
    const hoverImage = (image: ImageModel) => {
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
            }
        ).catch(
            error => {
                setBaoLoi(baoLoi);

            }
        )

    }, [maSach])

    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
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
        <div className='row'>
            <div className='overflow-hidden object-fit-contain'>
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
