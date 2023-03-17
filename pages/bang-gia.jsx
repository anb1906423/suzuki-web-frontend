import React, { useState, useEffect } from 'react'
import Heading from '../components/Heading'
import PriceTableItem from '../components/PriceTableItem'
import Head from 'next/head'
import { homeAPI } from "../config"

const PriceTable = () => {
  const [priceTable, setPriceTable] = useState([])
  useEffect(() => {
    fetch(`${homeAPI}/admin/find-all-price-table`)
      .then((res) => res.json())
      .then((priceTable) => {
        setPriceTable(priceTable)
      })
  }, [])

  return (
    <div className="price-table-group">
      <Head>
        <title>Bảng giá ô tô Suzuki Chi nhánh Cái Răng Cần Thơ</title>
        <meta name="title" content="Bảng giá ô tô tại chi nhánh ủy quyền chính thức của Suzuki tại thành phố Cần Thơ" />
        <meta name='revisit-after' content='1 days' />
        <meta http-equiv="content-language" content="vi" />
        <meta name='city' content='Cần Thơ' />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name='keywords' content='Ô tô Suzuki Cái Răng - thành phố Cần Thơ' />
        <meta name="description" content="Bảng giá ô tô suzuki, swift, suzuki XL7" />
      </Head>
      <Heading title="Bảng giá" />
      <div className="">
        {priceTable.length ? (
          priceTable.map((item, index) => {
            return (
              <PriceTableItem
                key={index}
                id={item.id}
                nameCar={item.nameCar}
                srcCar={item.srcCar}
                version={item.version}
                price={item.price}
              />
            )
          })
        ) : <p className="text-center w-100">Bảng giá xe đang được cập nhật!</p>
        }
      </div>
    </div >
  )
}

export default PriceTable