import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Heading from '../../components/Heading';
import ProductItem from '../../components/ProductItem';
import { homeAPI } from '../../config';
import Slider from '../../components/slider/slider';
import {
    slidesXL7, colorsXL7,
    slidesErtiga, colorsErtiga,
    slidesCiaz, colorsCiaz,
    slidesSwift, colorsSwift,
    slidesCarryPro, colorsCarryPro,
    slidesCarryTruck, colorsCarryTruck,
} from '../../data/SliderData';
import axios from 'axios'

const ProductDetail = ({ car, otherProducts }) => {
    const router = useRouter();
    const [carDetail, setCarDetail] = useState('')
    const [sliderProps, setSliderProps] = useState({});

    const pathName = router.asPath.split('/').pop();

    useEffect(() => {
        car && car.map((item) => {
            if (item.id == pathName) {
                setCarDetail(item)
            }
        })
    }, [pathName])

    const addPointToPrice = (price) => {
        if (price !== undefined) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
        return "";
    }

    useEffect(() => {
        if (carDetail.name && carDetail.name.toLowerCase().includes("xl7")) {
            setSliderProps({ src: slidesXL7, colors: colorsXL7 });
        } else if (carDetail.name && carDetail.name.toLowerCase().includes("ertiga")) {
            setSliderProps({ src: slidesErtiga, colors: colorsErtiga });
        } else if (carDetail.name && carDetail.name.toLowerCase().includes("ciaz")) {
            setSliderProps({ src: slidesCiaz, colors: colorsCiaz });
        } else if (carDetail.name && carDetail.name.toLowerCase().includes("swift")) {
            setSliderProps({ src: slidesSwift, colors: colorsSwift });
        } else if (carDetail.name && carDetail.name.toLowerCase().includes("carry pro")) {
            setSliderProps({ src: slidesCarryPro, colors: colorsCarryPro });
        } else if (carDetail.name && carDetail.name.toLowerCase().includes("carry truck")) {
            setSliderProps({ src: slidesCarryTruck, colors: colorsCarryTruck });
        } else {
            setSliderProps({ src: "", colors: "" });
        }
    }, [carDetail.name]);

    return (
        <div className="product-detail-wrapper">
            <Head>
                <title>{carDetail.name}</title>
                <meta property="og:image" content={carDetail.src} />
                <meta name="title" content={carDetail.name} />
                <meta name="description" content={carDetail.description} />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Suzuki cần thơ"></meta>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="revisit-after" content="1 days" />
                <meta httpEquiv="content-language" content="vi" />
                <meta name="city" content="Cần Thơ" />
                <meta name="keywords" content="Suzuki, thông số xe" />
            </Head>
            <div className="product-detail">
                <div className="product-infor d-flex flex-row flex-wrap justify-content-start">
                    <div className="product-imgs d-flex justify-content-center align-items-center">
                        {/* <img src={carDetail.src || carDetail.imageTemp} alt="" /> */}
                        <Slider {...sliderProps} product_src={carDetail.src || carDetail.imageTemp} />
                    </div>
                    <div className="product-content">
                        <div className="product-name">
                            <h3>{carDetail.name}</h3>
                            <div className="price-group d-flex justify-content-between">
                                <b>Giá bán:</b>
                                <h4 className="text-danger">
                                    {addPointToPrice(carDetail.price)}&nbsp;VNĐ
                                </h4>
                            </div>
                            <div>
                                <p dangerouslySetInnerHTML={{ __html: carDetail.description }}></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ padding: "0px 2%" }}>
                    <Heading className="text-center" title={`Chi tiết ${carDetail.name}`} />
                    <p dangerouslySetInnerHTML={{ __html: carDetail.moreInfo }}></p>
                </div>
            </div>

            <Heading title="Một vài mẫu xe khác" />
            <div className="other-products w-100 d-flex flex-row flex-wrap align-items-center justify-content-around">
                {otherProducts.map((item, index) => {
                    if (index <= 2 && item.id !== pathName) {
                        return (
                            <ProductItem
                                className=""
                                key={index}
                                name={item.name}
                                imageTemp={item.imageTemp}
                                src={item.src}
                                href={item.id}
                                price={item.price}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default ProductDetail;

export async function getStaticPaths() {
    const Res = await axios.get(`${homeAPI}/admin?page=${1}&limit=${100}`);

    const path = Res?.data.map((x) => ({
        params: {
            id: x?.id,
        },
    }));

    return {
        paths: path,
        fallback: true, // can also be true or 'blocking'
    };
}

export async function getStaticProps({ params }) {
    const { id } = params;

    try {
        const res = await fetch(`${homeAPI}/admin/${id}`);
        // const car = await res.json();

        const res2 = await fetch(homeAPI + '/admin');
        const allCars = await res2.json();

        const otherProducts = allCars.filter((item) => item.id !== id);
        const car = allCars

        return {
            props: {
                car,
                otherProducts,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            notFound: true,
        };
    }
}