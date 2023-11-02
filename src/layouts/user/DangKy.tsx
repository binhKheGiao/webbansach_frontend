
import { debounce } from '@mui/material';
import React, { useCallback, useEffect } from 'react'
import { useState } from "react";
import { baseUrl } from '../ultils/config';



const DangKy = () => {

    const [tenDangNhap, setTenDangNhap] = useState("");
    const [email, setEmail] = useState("");
    const [hoDem, setHoDem] = useState("");
    const [ten, setTen] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [matKhauNhapLai, setMatKhauNhapLai] = useState("");
    const [gioiTinh, setGioiTinh] = useState(true);


    const [errorTenDangNhap, setErrorTenDangNhap] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorMatKhau, setErrorMatKhau] = useState("");
    const [errorMatKhauNhapLai, setErrorMatKhauNhapLai] = useState("");
    const [errorHoDem, setErrorHoDem] = useState("");
    const [errorTen, setErrorTen] = useState("");
    const [errorSoDienThoai, setErrorSoDienThoai] = useState("");



    const handleSubmit = async (e: React.FormEvent) => {
         
        e.preventDefault();

        const isTenDangNhapValid = kiemTraEmailDaTonTai(tenDangNhap);

        const isEmailValid = kiemTraEmailDaTonTai(email);

        const isMatKhauValid = kiemTraMatKhau(matKhau);

        if ((errorTenDangNhap || errorEmail || errorMatKhau || errorMatKhauNhapLai || errorSoDienThoai) !== "") {
            console.log("Vui lòng hoàn thành các bước đăng kí");
            return false;
        }
        if (tenDangNhap.trim() == "") {
            setErrorTenDangNhap("Tên đăng nhập không thể để trống");
            return false;
        }
        if (email.trim() == "") {
            setErrorEmail("Email không thể để trống");
            return false;
        }
        if (matKhau.trim() == "") {
            setMatKhau("Mật khẩu không được để trống")
            return false;
        }
        
        if (hoDem.trim() == "") {
            setErrorHoDem("Họ đệm không được để trống");
            return false;
        }

        if (ten.trim() == "") {
            setErrorTen("Tên không được để trống")
            return false;

        }

        if (soDienThoai.trim() == "") {
            setSoDienThoai("Số điện thoại không được để trống")
            return false;
        }
    

        


    }


    const handleTenDangNhap = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTenDangNhap(e.target.value);
        setErrorTenDangNhap('');
    }
    const kiemTraTenDangNhapDaTonTai = async (tenDangNhap: string) => {
        const url = `${baseUrl}/api/account/check-username?username=${tenDangNhap}`
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setErrorTenDangNhap("Tên đăng nhập đã tồn tại")
                return false;
            }
            setErrorTenDangNhap('');
            return true;
        } catch (error) {
            console.log("Lỗi khi kiểm tra đăng nhập")
        }
    };

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);

    }

    const kiemTraEmailDaTonTai = async (email: string) => {

        if (!validateEmail(email)) {
            setErrorEmail("Email không hợp lệ");
            return false;
        }
        setErrorEmail('');

        const url = `${baseUrl}/nguoi-dung/search/existsByEmail?email=${email}`
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setErrorEmail("Email đã tồn tại")
                return false;
            }
            setErrorEmail('');
            return true;
        } catch (error) {
            console.log("Lỗi khi kiểm tra đăng nhập")
            return false;
        }
    };

    // Kiểm tra mật khẩu 

    const kiemTraMatKhau = (matKhau: string) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(matKhau)) {
            setErrorMatKhau("Mật khẩu phải có ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự đặc biệt (!@#$%^&*)");
            return true;
        } else {
            setErrorMatKhau(""); // Mật khẩu hợp lệ
            return false;
        }
    }

    const handleMatKhauChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setMatKhau(e.target.value);
        setErrorMatKhau("");
        return kiemTraMatKhau(e.target.value)
    }, [])

    // Xử lí nhập họ đệm





    const kiemTraMatKhauNhapLai = useCallback(() => {
        if (matKhau !== matKhauNhapLai) {
            setErrorMatKhauNhapLai("Mật khẩu nhập lại không khớp")
            return false;
        } else {
            setErrorMatKhauNhapLai("")
            return true;
        }
    }, [matKhau, matKhauNhapLai]);

    useEffect(() => {
        kiemTraMatKhauNhapLai();
    }, [matKhau, matKhauNhapLai]);

    const handleMatKhauNhapLaiChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setMatKhauNhapLai(e.target.value)
    }, []);

    // Xử lí nhập tên

    // Xử lí nhập số điện thoại 

    const regexPhoneNumber  =/(84|0[3|5|7|8|9])+([0-9]{8})\b/;


    const kiemTraSoDienThoai = async (soDienThoai:string) => {
        if (!regexPhoneNumber.test(soDienThoai)) {
            setErrorSoDienThoai("Số điện thoại không hợp lệ");
            return false;
        }
        const url = `${baseUrl}/nguoi-dung/search/existsBySoDienThoai?soDienThoai=${soDienThoai}`;

        try {
            const response = await fetch(url);
            const data = await response.text();
            console.log(data);
            if (data == "true") {
                setErrorSoDienThoai("Số điện thoại này đã được đăng kí trước đó");
                return false
            }
            return true;
            
        } catch (error) {
            console.log("Lỗi xảy ra khi nhập số điện thoại");
            
        }

        
    }

    const handlerSoDienThoai = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSoDienThoai(e.target.value);
        setErrorSoDienThoai('');
        
    }

    const handleChangeGioiTinh =  (e: React.ChangeEvent<HTMLInputElement>) => {
     
        const gioiTinh = e.target.value;
        if (gioiTinh == "Nam") {
            setGioiTinh(true);
        }else {
            setGioiTinh(false);
        }
        

        
    }



    return (
        <div className='container'>
            <h1 className='mt-5 text-center'>Đăng ký</h1>
            <div className='mb-3 col-md-6 col-12 mx-auto'>
                <form action="" onSubmit={handleSubmit} className='form'>
                    <div className='mb-3'>
                        <label htmlFor='tenDangNhap' className='form-label'>Tên Đăng Nhập</label>
                        <input type="text"
                            id='tenDangNhap'
                            className='form-control'
                            onBlur={(e) => kiemTraTenDangNhapDaTonTai(e.target.value)}
                            onChange={handleTenDangNhap}

                            value={tenDangNhap}
                        />

                        <small style={{ color: "red" }}>{errorTenDangNhap}</small>
                    </div>
                    {/* Email */}
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input type="email"
                            id='email'
                            className='form-control'
                            onBlur={(e) => kiemTraEmailDaTonTai(e.target.value)}
                            onChange={handleEmail}
                            value={email}
                        />
                        <small style={{ color: "red" }}>{errorEmail}</small>
                    </div>
                    {/* Mật khẩu  */}
                    <div className='mb-3'>
                        <label htmlFor='matKhau' className='form-label'>Mật Khẩu</label>
                        <input type="text"
                            id='matKhau'
                            className='form-control'
                            onChange={handleMatKhauChange}
                            value={matKhau}
                        />
                        <small style={{ color: "red" }}>{errorMatKhau}</small>
                    </div>

                    {/* Mật khẩu nhập lại */}
                    <div className='mb-3'>
                        <label htmlFor='matKhauNhapLai' className='form-label'>Nhập Lại Mật Khẩu</label>
                        <input type="text"
                            id='matKhauNhapLai'
                            className='form-control'
                            onChange={handleMatKhauNhapLaiChange}
                            value={matKhauNhapLai}
                        />
                        <small style={{ color: "red" }}>{errorMatKhauNhapLai}</small>
                    </div>

                    {/* Họ đệm  */}

                    <div className='mb-3'>
                        <label htmlFor='hoDem' className='form-label'>Nhập Họ Đệm</label>
                        <input type="text"
                            id='hoDem'
                            className='form-control'
                            onChange={(e) => setHoDem(e.target.value)}
                            value={hoDem}
                        />
                        <small style={{ color: "red" }}>{ }</small>
                    </div>
                    {/* Nhập Tên */}

                    <div className='mb-3'>
                        <label htmlFor='ten' className='form-label'>Nhập Tên</label>
                        <input type="text"
                            id='ten'
                            className='form-control'
                            onChange={(e) => setTen(e.target.value)}
                            value={ten}
                        />

                    </div>

                    {/* Gioi Tinh */}

                    <div className='mb-3 d-flex align-items-center'>
                        <label htmlFor='ten' className='form-label me-5'>Giới Tính :</label>
                        <div className="form-check me-3">
                            <input className="form-check-input" type="radio" 
                            value="Nam" 
                            name="gioiTinh" id="gioiTinhNam"
                            onChange={handleChangeGioiTinh}
                            />
                            <label className="form-check-label">
                                Nam
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" 
                            value="Nữ" 
                            name="gioiTinh" 
                            id="gioiTinhNam"
                            onChange={handleChangeGioiTinh}
                             />
                            <label className="form-check-label" >
                                Nữ
                            </label>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='soDienThoai' className='form-label'>Số điện thoại</label>
                        <input type="text"
                            id='soDienThoai'
                            className='form-control'
                            onBlur={(e) => kiemTraSoDienThoai(e.target.value)}
                            onChange={handlerSoDienThoai}
                            value={soDienThoai}
                        />
                        <small style={{ color: "red" }}>{errorSoDienThoai}</small>

                    </div>

                    <div className='text-center'>
                        <button type='submit' className='btn btn-danger  '>Đăng Kí</button>
                    </div>






                </form>
            </div>
        </div>
    )
}

export default DangKy
