
const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const formattedPrice = (price: number) => {
    return formatter.format(price);
}

export default formattedPrice;