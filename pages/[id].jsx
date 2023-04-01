import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import Heading from '../components/Heading'
import ProductItem from '../components/ProductItem'
import Head from 'next/head'
import { homeAPI } from "../config"
import { isBrowser } from 'react-device-detect';

const ProductDetail = (products) => {
    const router = useRouter();
    const productId = router.query.id;

    // const [pathName, setPathName] = useState()

    // const isBrowser = typeof window !== "undefined";
    // useEffect(() => {
    //     if (isBrowser) {
    //         // Đoạn mã của bạn sử dụng window ở đây
    //         setPathName(window.location.pathname.substring(1));
    //     }
    // }, [])

    const [cars, setCars] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [imageTemp, setImageTemp] = useState('')
    const [src, setSrc] = useState('')
    const [id, setId] = useState('')
    const [description, setDescription] = useState('')
    const [newProduct, setNewProduct] = useState()
    const [type, setType] = useState('')
    const [moreInfo, setMoreInfo] = useState('')

    const [otherProducts, setOtherProducts] = useState([])

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

    useEffect(() => {
        cars && cars.map((item) => {
            if (item.id == productId) {
                setName(item.name)
                setPrice(item.price)
                setDescription(item.description)
                setMoreInfo(item.moreInfo)
                setImageTemp(item.imageTemp)
                setNewProduct(item.newProduct)
                setType(item.type)
                setSrc(item.src)
            }
        })
    }, [cars])

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
                                    <b>Giá bán:</b><h4 className="text-danger">{price}&nbsp;VNĐ</h4>
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
