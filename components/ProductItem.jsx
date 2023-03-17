import React from 'react'

const ProductItem = (props) => {
    const addPointToPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    return (
        <div className="product">
            <div className="product-link d-flex align-items-center justify-content-center">
                <a href={props.href}><img src={props.src} alt={props.name} className="product-img" /></a>
            </div>
            <div className="product-infor text-center">
                <div className="name">
                    <a href={props.id}>{props.name}</a>
                </div>
                <div className="price-box d-flex flex-wrap align-items-center justify-content-center">
                    <span>Giá từ:&nbsp;</span>
                    <span className="price text-danger"><b>{addPointToPrice(props.price)} VNĐ</b></span>
                </div>
            </div>
        </div>
    )
}

export default ProductItem