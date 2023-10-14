import React from "react";


interface PaginationInterface {
    currentPage: number;
    totalPage: number;
    Pagination: any;
}

export const PaginationConfix: React.FC<PaginationInterface> = (props) => {
    const listOfPage = [];

    console.log("Trang hiện tại" +props.currentPage);
    

    if (props.currentPage === 1) {
        listOfPage.push(props.currentPage);
        if (props.totalPage >= props.currentPage + 1) {
            listOfPage.push(props.currentPage + 1);
        }
        if (props.totalPage >= props.currentPage + 2) {
            listOfPage.push(props.currentPage + 2)
        }
    } else if (props.currentPage > 1) {
        if (props.currentPage >= 3) {
            listOfPage.push(props.currentPage - 2)
        }
        if (props.currentPage >= 2) {
            listOfPage.push(props.currentPage - 1)
        }
        listOfPage.push(props.currentPage);
        // trang +1
        if (props.totalPage > props.currentPage + 1) {
            listOfPage.push(props.currentPage + 1);
        }
        if (props.totalPage > props.currentPage + 2) {
            listOfPage.push(props.currentPage + 2)
        }
    }


    return (
        <>
            <nav aria-label="...">
                <ul className="pagination">
                    <li className="page-item disabled">
                        <button className="page-link" onClick={props.Pagination(1)}>Trang Đầu</button>
                    </li>

                        {
                            listOfPage.map(
                                page => (
                                    <li className="page-item " key={page} onClick={props.Pagination(page)}>
                                        <button className={"page-link " + (props.currentPage === page? "active" : "" )}>
                                            {page}
                                        </button>
                                    </li>
                                )
                            )
                        }


                    <li className="page-item">
                        <button className="page-link" onClick={props.Pagination(props.totalPage)}>Trang Đầu</button>
                    </li>
                </ul>
            </nav>
        </>
    )
}