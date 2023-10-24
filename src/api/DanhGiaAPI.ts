
import {getRequest} from "./Request";
import IImageModel from "../models/IImageModel";
import DanhGiaModel from "../models/DanhGiaModel";

async function getAllDanhGiaCuaMotQuyenSach(url:string):Promise<DanhGiaModel[]> {    // Hoạt động bất đồng bộ lấy ra toàn bộ sách
    const result:DanhGiaModel[] = []; // Biến lưu giá trị trả về

    const reponse = await getRequest(url); // Tạm dừng để lấy dữ liệu
    
    const responseData = reponse._embedded.danhGias

    return responseData;
}

export async function layToanBoDanhGiaCuaMotSach(maSach: number) {
    
    const url: string = `http://localhost:8080/sach/${maSach}/danhSachDanhGia`;

    return getAllDanhGiaCuaMotQuyenSach(url);

}