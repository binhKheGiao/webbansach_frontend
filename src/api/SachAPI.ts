import BookModel from "../models/BookModel";
import {getRequest} from "./Request";
import {promises} from "dns";


async function getBook(url : string) :Promise<BookModel[]> {

    // const result:BookModel[] = []; // Biến lưu giá trị trả về

    const reponse = await getRequest(url); // Tạm dừng để lấy dữ liệu

    const responseData = reponse._embedded.saches;

    return responseData;

}

export async function  getTheLatestBook() :Promise<BookModel []> {
    // Lấy sản phẩm được bán ít nhất tháng trước ra làm flash sale hoặc là sản phẩm do admin set

    const url: string = 'http://localhost:8080/sach?sort=maSach,asc&page=0&size=6';
    return getBook(url);
}
export async function  getFlashSaleBook() :Promise<BookModel []> {
    const url: string = 'http://localhost:8080/sach?sort=maSach,desc&page=0&size=6';
    return getBook(url);
}

export async function getAllBooks():Promise<BookModel[]> {    // Hoạt động bất độ
    const url:string = 'http://localhost:8080/sach?sort=maSach,desc';

    return getBook(url);
}