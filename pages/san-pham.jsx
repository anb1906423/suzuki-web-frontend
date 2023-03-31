import React, { useState, useEffect } from 'react'
import ProductItem from '../components/ProductItem'
import Heading from '../components/Heading'
import Head from 'next/head'
import { homeAPI } from "../config"

const Product = (products) => {
  const [cars, setCars] = useState([])
  useEffect(() => {
    fetch(homeAPI + '/admin')
      .then((res) => res.json())
      .then((cars) => {
        setCars(cars)
      })
  }, [])

  return (
    <div className="product-page">
      <Head>
        <title>Đại lý ủy quyền chính thức của Suzuki tại Cần Thơ</title>
        <meta name="title" content="Đại lý ủy quyền chính thức của Suzzuki tại Việt Nam" />
        <meta name='revisit-after' content='1 days' />
        <meta http-equiv="content-language" content="vi" />
        <meta name='city' content='Cần Thơ' />
        <meta name='keywords' content='suzuki swift, suzuki xl7, ertiga, the new ciaz' />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name='description' content="Trang trưng bày, chi tiết thông số cũng như giá bán các dòng xe Suzuki chính hãng. Tư vấn tận tình, giá cả hợp lý, đáng tin cậy, tự hào được nhiều khách hàng tin tưởng lựa chọn. - Chi nhánh ủy quyền chính thức của Suzuki tại Cần Thơ" />
      </Head>
      <Heading title="Xe du lịch" />
      <div className="product-container d-flex flex-row flex-wrap justify-content-start">
        {
          cars.map((item, index) => {
            if (item.type === 'Xe du lịch' && item.newProduct && item.state) {
              return (
                <ProductItem className="" key={index} name={item.name} imageTemp={item.imageTemp} src={item.src} href={item.id} price={item.price} />
              )
            }
          })
        }
      </div>

      <Heading title="Xe thương mại" />
      <div className="product-container d-flex flex-row flex-wrap justify-content-start ">
        {
          cars.map((item, index) => {
            if (item.type === 'Xe thương mại' && item.newProduct && item.state) {
              return (
                <ProductItem className="" key={index} name={item.name} imageTemp={item.imageTemp} src={item.src} href={item.id} price={item.price} />
              )
            }
          })
        }
      </div>
    </div>
  )
}

export default Product