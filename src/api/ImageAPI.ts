import BookModel from "../models/BookModel";
import {getRequest} from "./Request";
import ImageModel from "../models/ImageModel";


export async function getAllImageByIdBook(bookId:number):Promise<ImageModel[]> {    // Hoạt động bất đồng bộ lấy ra toàn bộ sách
    const result:ImageModel[] = []; // Biến lưu giá trị trả về

    const uri:string = `http://localhost:8080/sach/${bookId}/danhSachHinhAnh`;

    const reponse = await getRequest(uri); // Tạm dừng để lấy dữ liệu

    // lấy json sách
    const responseData = reponse._embedded.hinhAnhs;


    return responseData;
}