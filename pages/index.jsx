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

export default function Home(products) {
  const [cars, setCars] = useState([])
  const [intro, setIntro] = useState([])

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
          console.log(intro)
          setIntro(intro)
        })
    }
    console.log(intro);
    handleGetIntro()
  }, [])

  const countList = [
    {
      icon: <FaChartLine />,
      value: '17+',
      text: 'Năm hoạt động'
    },
    {
      icon: <FaUserCheck />,
      value: '150+',
      text: 'Nhân viên'
    },
    {
      icon: <FaCar />,
      value: '2500+',
      text: 'Xe đã bán'
    },
    {
      icon: <FaUsers />,
      value: '98%',
      text: 'KH hài lòng'
    },
  ]

  return (
    <div className={styles.main}>
      <Head>
        <title>Đại lý ủy quyền chính thức của Suzuki tại Cần Thơ</title>
        <meta property="og:image" content="https://www.ford.com.vn/content/ford/vn/vi_vn/site-wide-content/billboard-carousels/explorer-overview-carousel/jcr:content/par/billboard_1441502915/imageComponent/image.imgs.full.high.jpg" />
        <meta name="title" content="Ford Cần Thơ - Đại lý ủy quyền chính thức của Ford tại Việt Nam" />
        <meta name='revisit-after' content='1 days' />
        <meta name='city' content='Cần Thơ' />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="content-language" content="vi" />
        <meta name='keywords' content='ford ranger xls, Sản phẩm nổi bật của ford, ford territory, ô tô ford, cam kết khi mua xe tại ford - cần thơ, xe chính hãng, ford cần thơ' />
        <meta name="description" content="Trang chủ - Website trưng bày, tham khảo, chi tiết thông số cũng như giá bán các dòng xe Ford chính hãng. Tư vấn tận tình, giá cả hợp lý, đáng tin cậy, tự hào được nhiều khách hàng tin tưởng lựa chọn." />
      </Head>
      <div className={styles.container}>
        <CarouselComponent />
        <div className="counter-box">
          <Heading title="Vì sao khách hàng luôn tin tưởng và lựa chọn Suzuki Cần Thơ?" />
          <div className="couter-row d-flex justify-content-around">
            {
              countList.map((item, i) => {
                return (
                  <CounterItem key={i} value={item.value} icon={item.icon} text={item.text} />
                )
              })
            }
          </div>
        </div>
        <div className="introduce-box">
          <Heading title='Giới thiệu' />
          <div>
            {
              intro && intro.map((item, index) => {
                return (
                  <p className="text-justify" key={index}>{item.intro}</p>
                )
              })
            }
          </div>
        </div>
        <div className="outstanding">
          <Heading title="Sản phẩm nổi bật" />
          <div className="product-container d-flex flex-row flex-wrap justify-content-start">
            {
              cars.map((item, index) => {
                if (index < 4) {
                  return (
                    <ProductItem className="" key={index} name={item.name} src={item.src} href={item.id} price={item.price} />
                  )
                }
              })
            }

          </div>
        </div>

        <div className="undertake-wrapper position-relative">
          <Heading title="Cam kết khi mua xe tại Suzuki - Cần Thơ" />
          <div className="undertake-box d-flex flex-wrap justify-content-around">
            <UndertakeItem icon={<FaMoneyCheckAlt className="icon-item-undertake" />} title="Thanh toán và nhận xe nhanh chóng" des="Ford Cần Thơ luôn cam kết mang lại mức giá ưu đãi nhất cho quý khách với thời gian giao xe nhanh nhất" />
            <UndertakeItem icon={<FaCalendarCheck className="icon-item-undertake" />} title="Cung cấp các dòng xe chính hãng" des="Ford Cần Thơ luôn cung cấp các dòng xe chính hãng được sản xuất tại Việt Nam và nhập khẩu với các tiêu chuẩn toàn cầu" />
            <UndertakeItem icon={<FaHandshake className="icon-item-undertake" />} title="Dịch vụ bảo hành, bảo dưỡng hàng đầu" des="Ford Cần Thơ luôn cam kết chăm sóc kỹ lưỡng và chế độ hậu mãi tốt nhất cho Quý Khách khi mua xe ô tô tại đây" />
          </div>
        </div>
      </div>
    </div>
  )
}