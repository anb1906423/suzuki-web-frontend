import styles from '../styles/Home.module.css'
import CarouselComponent from '../components/Carousel'
import Heading from '../components/Heading'
import ProductItem from '../components/ProductItem'
import UndertakeItem from '../components/UndertakeItem'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import AccessItem from '../components/AccessItem'
import CounterItem from '../components/CounterItem'
import axios from 'axios'
import {
  FaCarAlt, FaCommentDollar, FaPhoneSquareAlt, FaFacebookSquare, FaMoneyCheckAlt, FaCalendarCheck, FaHandshake,
  FaChartLine, FaCar, FaUserCheck, FaUsers
} from 'react-icons/fa'
import { homeAPI } from "../config"

const iconList =[
  <FaMoneyCheckAlt className="icon-item-undertake" />,
  <FaCalendarCheck className="icon-item-undertake" />,
  <FaHandshake className="icon-item-undertake" />
]

export default function Home(products) {
  const [cars, setCars] = useState([])
  const [intro, setIntro] = useState([])
  const [overviews, setOverviews] = useState([])
  const [undertake, setUndertake] = useState([])

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProducts = async () => {
      fetch(homeAPI + '/admin')
        .then((res) => res.json())
        .then((cars) => {
          setCars(cars)
        })
    }
    getProducts()
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])

  useEffect(() => {
    const handleGetIntro = async () => {
      fetch(`${homeAPI}/intro/get-all`)
        .then((res) => res.json())
        .then((intro) => {
          setIntro(intro)
        })
    }

    handleGetIntro()
  }, [])

  useEffect(() => {
    const handleGetOverview = async () => {
      fetch(`${homeAPI}/overview/get-all`)
        .then((res) => res.json())
        .then((overview) => {
          setOverviews(overview)
        })
    }

    handleGetOverview()
  }, [])

  useEffect(() => {
    const handleGetUndertake = async () => {
      fetch(`${homeAPI}/undertake/get-all`)
        .then((res) => res.json())
        .then((undertake) => {
          setUndertake(undertake)
        })
    }

    handleGetUndertake()
  }, [])

  return (
    <div className={styles.main}>
      <Head>
        <title>Đại lý ủy quyền chính thức của Suzuki tại Cần Thơ</title>
        <meta name="title" content="Suzuki Cái Răng Cần Thơ - Đại lý ủy quyền chính thức của Suzuki tại Việt Nam" />
        <meta name='revisit-after' content='1 days' />
        <meta name='city' content='Cần Thơ' />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="content-language" content="vi" />
        <meta name='keywords' content='xe ô tô suzuki, suzuki cần thơ, suzuki xl7' />
        <meta name="description" content="Trang chủ - Website trưng bày, tham khảo, chi tiết thông số cũng như giá bán các dòng xe ô tô Suzuki chính hãng. Tư vấn tận tình, giá cả hợp lý, đáng tin cậy, tự hào được nhiều khách hàng tin tưởng lựa chọn." />
      </Head>
      <div className={styles.container}>
        <CarouselComponent />
        {
          overviews && overviews.map((item, i) => {
            return (
              item.heading != '' ?
                <div key={i} className="counter-box">
                  <Heading title={item.heading} />
                  <div className="couter-row d-flex flex-wrap justify-content-around">
                    {
                      item.yearOfOperation != '' ?
                        <CounterItem value={item.yearOfOperation} icon={<FaChartLine />} text="Năm hoạt động" /> : ''
                    }
                    {
                      item.staff != '' ?
                        <CounterItem value={item.staff} icon={<FaUsers />} text="Nhân viên" /> : ''
                    }
                    {
                      item.carsSold != '' ?
                        <CounterItem value={item.carsSold} icon={<FaCar />} text="Xe đã bán" /> : ''
                    }
                    {
                      item.customerSatisfied != '' ?
                        <CounterItem value={item.customerSatisfied} icon={<FaUserCheck />} text="KH hài lòng" /> : ''
                    }
                  </div>
                </div> : ''
            )
          })
        }
        {
          intro && intro.map((item, index) => {
            return (
              item.intro != '' ?
                <div key={index} className="introduce-box">
                  <Heading title='Giới thiệu' />
                  <div>
                    <p className="text-justify">{item.intro}</p>
                  </div>
                </div> : ''
            )
          })
        }
        <div className="outstanding">
          <Heading title="Sản phẩm nổi bật" />
          <div className="product-container d-flex flex-row flex-wrap justify-content-start">
            {
              cars.map((item, index) => {
                if (item.outStanding && item.state) {
                  return (
                    <ProductItem className="" imageTemp={item.imageTemp} key={index} name={item.name} src={item.src} href={`/san-pham/${item.id}`} price={item.price} />
                  )
                }
              })
            }

          </div>
        </div>

        {undertake.length === 0 ? (
          ''
        ) : (
          undertake.map((item, index) => (
            <div key={index} className="undertake-wrapper position-relative">
              <Heading title={item.heading} />
              <div className="undertake-box d-flex flex-wrap justify-content-around">
                {item.title && item.description && iconList && item.title.map((title, i) => (
                  <UndertakeItem
                    key={i}
                    icon={iconList[i]}
                    title={title}
                    des={item.description[i]}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}