import { Star, StarFill } from "react-bootstrap-icons";

const renderRaiting = (point:number) => {
    const stars = [];
    for(let i = 1; i <=5;i++) {
        if (i<=point) {
            stars.push(<StarFill className='text-warning'/>)
        }else {
            stars.push(<Star className='text-secondary'/>)
        }
    }
    return stars;
}

export default renderRaiting;