import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import Heading from '../components/Heading'
import ProductItem from '../components/ProductItem'
import Head from 'next/head'
import { homeAPI } from "../config"

const ProductDetail = (products) => {
    const router = useRouter();
    const productId = router.query.id;
    const [cars, setCars] = useState([])
    const [otherProducts, setOtherProducts] = useState([])
    useEffect(() => {
        fetch(homeAPI + '/admin')
            .then((res) => res.json())
            .then((cars) => {
                setCars(cars)
                setOtherProducts(cars.sort(() => Math.random() - Math.random()))
            })
    }, [])

    return (
        <div className='product-detail-wrapper'>
            {
                cars.map((item, index) => {
                    if (item.id === productId) {
                        return (
                            <div className='product-detail' key={index}>
                                <Head>
                                    <title>{item.name}</title>
                                    <meta property="og:image" content={item.src} />
                                    <meta name="title" content={item.name} />
                                    <meta name="description" content={item.description} />
                                    <meta name='robots' content='index, follow' />
                                    <meta name="author" content="Suzuki cần thơ"></meta>
                                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                                    <meta name='revisit-after' content='1 days' />
                                    <meta http-equiv="content-language" content="vi" />
                                    <meta name='city' content='Cần Thơ' />
                                    <meta name='keywords' content='Suzuki, thông số xe' />
                                </Head>
                                <div>
                                    <div className="product-infor d-flex flex-row flex-wrap justify-content-start">
                                        <div className="product-imgs d-flex justify-content-center">
                                            <img src={item.src || item.imageTemp} alt="" />
                                        </div>
                                        <div className="product-content">
                                            <div className="product-name">
                                                <h3>{item.name}</h3>
                                                <div className="price-group d-flex justify-content-between">
                                                    <b>Giá bán:</b><h4 className="text-danger">{item.price}&nbsp;VNĐ</h4>
                                                </div>
                                                <div>
                                                    <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <Heading className='text-center' title={`Chi tiết xe ${item.name}`} />
                                        <p dangerouslySetInnerHTML={{ __html: item.moreInfo }}></p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })
            }
            <Heading title="Một vài mẫu xe khác" />
            <div className="other-products w-100 d-flex flex-row flex-wrap align-items-center justify-content-around">
                {
                    otherProducts.map((item, index) => {
                        if (index <= 2 && item.id !== productId) {
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

export default ProductDetail
