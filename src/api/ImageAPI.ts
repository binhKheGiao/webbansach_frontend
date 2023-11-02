
import {getRequest} from "./Request";
import IImageModel from "../models/IImageModel";
import { baseUrl } from "../layouts/ultils/config";


export async function getAllImageByIdBook(bookId:number):Promise<IImageModel[]> {    // Hoạt động bất đồng bộ lấy ra toàn bộ sách
    const result:IImageModel[] = []; // Biến lưu giá trị trả về

    const uri:string = `${baseUrl}/sach/${bookId}/danhSachHinhAnh`;

    const reponse = await getRequest(uri); // Tạm dừng để lấy dữ liệu

    // lấy json sách
    const responseData = reponse._embedded.hinhAnhs;


    return responseData;
}