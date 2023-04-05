import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Heading from '../../components/Heading';
import ProductItem from '../../components/ProductItem';
import { homeAPI } from '../../config';

const ProductDetail = ({ car, otherProducts }) => {
    const router = useRouter();

    const pathName = router.asPath.split('/').pop();

    const addPointToPrice = (price) => {
        if (price !== undefined) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
        return "";
    }

    console.log(car);

    return (
        <div className="product-detail-wrapper">
            <Head>
                <title>{car.name}</title>
                <meta property="og:image" content={car.src} />
                <meta name="title" content={car.name} />
                <meta name="description" content={car.description} />
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
                    <div className="product-imgs d-flex justify-content-center">
                        <img src={car.src || car.imageTemp} alt="" />
                    </div>
                    <div className="product-content">
                        <div className="product-name">
                            <h3>{car.name}</h3>
                            <div className="price-group d-flex justify-content-between">
                                <b>Giá bán:</b>
                                <h4 className="text-danger">
                                    {addPointToPrice(car.price)}&nbsp;VNĐ
                                </h4>
                            </div>
                            <div>
                                <p dangerouslySetInnerHTML={{ __html: car.description }}></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Heading className="text-center" title={`Chi tiết ${car.name}`} />
                    <p dangerouslySetInnerHTML={{ __html: car.moreInfo }}></p>
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

export async function getServerSideProps({ params }) {
    const { id } = params;

    try {
        const res = await fetch(homeAPI + `/admin/${id}`);
        const car = await res.json();

        const res2 = await fetch(homeAPI + '/admin');
        const allCars = await res2.json();

        const otherProducts = allCars.filter((item) => item.id !== id);

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