import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

const renderRaiting = (point:number) => {
    const stars = [];
    for(let i = 1; i <=5;i++) {
        if (i<=point) {
            stars.push(<StarFill className='text-warning'/>)
        }else {

            if (point> (i -1)+(0.2)) {
                stars.push(<StarHalf className="text-warning"/>)
            }else{
                stars.push(<Star className='text-warning'/>)
            }
        }
    }
    return stars;
}

export default renderRaiting;