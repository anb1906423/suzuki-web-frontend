import React, { useState, useEffect, useMemo } from "react"
import { useRouter } from 'next/router'
import Heading from '../components/Heading'
import ProductItem from '../components/ProductItem'
import Head from 'next/head'
import { homeAPI } from "../config"

const isBrowser = typeof window !== "undefined";

const ProductDetail = () => {
    const router = useRouter();
    const [cars, setCars] = useState([])
    const [otherProducts, setOtherProducts] = useState([])

    const addPointToPrice = (price) => {
        if (price !== undefined) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
        return "";
    }

    useEffect(() => {
        try {
            fetch(homeAPI + '/admin')
                .then((res) => res.json())
                .then((cars) => {
                    setCars(cars);
                    setOtherProducts(cars.sort(() => Math.random() - Math.random()));
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const pathName = useMemo(() => {
        return isBrowser ? window.location.pathname.substring(1) : '';
    }, []);

    const product = useMemo(() => {
        return cars.find((item) => item.id == pathName) || {};
    }, [pathName, cars]);

    const { name, price, description, moreInfo, imageTemp, src, id, newProduct, type } = product;

    return (
        <div className='product-detail-wrapper'>
            <div className='product-detail'>
                <Head>
                    <title>{name}</title>
                    <meta property="og:image" content={src} />
                    <meta name="title" content={name} />
                    <meta name="description" content={description} />
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
                            <img src={src || imageTemp} alt="" />
                        </div>
                        <div className="product-content">
                            <div className="product-name">
                                <h3>{name}</h3>
                                <div className="price-group d-flex justify-content-between">
                                    <b>Giá bán:</b><h4 className="text-danger">{addPointToPrice(price)}&nbsp;VNĐ</h4>
                                </div>
                                <div>
                                    <p dangerouslySetInnerHTML={{ __html: description }}></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <Heading className='text-center' title={`Chi tiết ${name}`} />
                        <p dangerouslySetInnerHTML={{ __html: moreInfo }}></p>
                    </div>
                </div>
            </div>

            <Heading title="Một vài mẫu xe khác" />
            <div className="other-products w-100 d-flex flex-row flex-wrap align-items-center justify-content-around">
                {
                    otherProducts.map((item, index) => {
                        if (index <= 2 && item.id !== pathName) {
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
