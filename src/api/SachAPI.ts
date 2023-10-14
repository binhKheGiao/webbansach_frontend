import BookModel from "../models/BookModel";
import {getRequest} from "./Request";
import {promises} from "dns";
import ResultAPI from "./ResultAPI";


async function getBook(url : string) :Promise<ResultAPI> {

    // const result:BookModel[] = []; // Biến lưu giá trị trả về

    const reponse = await getRequest(url); // Tạm dừng để lấy dữ liệu

    const responseData = reponse._embedded.saches;

    // Lấy thông tin trang
    const totalPage:number = reponse.page.totalPages;
    const totalBook:number = reponse.page.totalElements;
    return {result: responseData,totalPage : totalPage, totalBook:totalBook};

}

export async function  getTheLatestBook() :Promise<ResultAPI> {
    // Lấy sản phẩm được bán ít nhất tháng trước ra làm flash sale hoặc là sản phẩm do admin set
    const url: string = 'http://localhost:8080/sach?sort=maSach,asc&page=0&size=6';
    return getBook(url);
}
export async function  getFlashSaleBook() :Promise<ResultAPI> {
    const url: string = 'http://localhost:8080/sach?sort=maSach,desc&page=0&size=6';
    return getBook(url);
}

export async function getAllBooks(page: number):Promise<ResultAPI> {    // Hoạt động bất độ
    console.log("page ở call api" +page);
    
    const url:string = `http://localhost:8080/sach?sort=maSach,desc&size=6&page=${page}`;

    return getBook(url);
}