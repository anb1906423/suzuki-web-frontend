import React, { useState, useEFfect, useEffect } from 'react'
import Heading from '../components/Heading'
import Head from 'next/head'
import axios from 'axios'
import { homeAPI } from '../config'

import {
  FaMapMarkerAlt,
  FaPhoneSquareAlt,
  FaFirefox,
  FaFacebookSquare,
  FaMailBulk
} from 'react-icons/fa'

const Contact = () => {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    const handleGetContacts = async () => {
      const result = await axios.get(homeAPI + '/contact/get-all')
      setContacts(result.data)
    }
    console.log(contacts);
    handleGetContacts()
  }, [])
  const contactInfor = [
    {
      icon: <FaMapMarkerAlt />,
      content: 'Lô 11C, Võ Nguyên Giáp, Quận Cái Răng, TP.Cần Thơ',
      href: '#'
    },
    {
      icon: <FaPhoneSquareAlt />,
      content: '0918.941.966 Mr.Văn Tâm',
      href: '#'
    },
    {
      icon: <FaFacebookSquare />,
      content: 'Nguyễn Văn Tâm',
      href: 'https://www.facebook.com/profile.php?id=100047842143889'
    },
    {
      icon: <FaFirefox />,
      content: 'fordscantho.com',
      href: '#'
    },
  ]
  return (
    <div className="contact">
      <Head>
        <title>Đại lý ủy quyền chính thức của Ford tại Cần Thơ</title>
        <meta property="og:image" content="https://www.ford.com.vn/content/ford/vn/vi_vn/site-wide-content/billboard-carousels/explorer-overview-carousel/jcr:content/par/billboard_1441502915/imageComponent/image.imgs.full.high.jpg" />
        <meta name="title" content="Liên hệ đại lý ô tô Ford thành phố Cần Thơ" />
        <meta name='revisit-after' content='1 days' />
        <meta http-equiv="content-language" content="vi" />
        <meta name='city' content='Cần Thơ' />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name='keywords' content='ford ranger xls, fordscantho.com, ford cần thơ, liên hệ ford cần thơ, đại lý ford, ô tô ford' />
        <meta name="description" content="Liên hệ nhận báo giá và tư vấn" />
      </Head>
      <Heading title="Liên hệ" />
      <div className="contact-content">
        {
          contacts && contacts.map((item, index) =>
            <div className='content-wrapper row' key={index}>
              <div className="col-6">
                <div>
                  <a href="" className='d-flex'>
                    <div className="icon-box">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="content-box">
                      {item.address}
                    </div>
                  </a>
                </div>
                <div>
                  <a href="" className='d-flex'>
                    <div className="icon-box">
                      <FaPhoneSquareAlt />
                    </div>
                    <div className="content-box">
                      {item.phoneNumber}
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-6">
                <div>
                  <a href="" className='d-flex'>
                    <div className="icon-box">
                      <FaMailBulk />
                    </div>
                    <div className="content-box">
                      {item.email}
                    </div>
                  </a>
                </div>
                <div>
                  <a href="" className='d-flex'>
                    <div className="icon-box">
                      <FaFacebookSquare />
                    </div>
                    <div className="content-box">
                      {item.linkToFace}
                    </div>
                  </a>
                </div>
              </div>
            </div>
          )
        }
      </div>
      <div className="map">
        <img className="w-100 h-auto" src="./img/map.png" alt="" />
      </div>
    </div>
  )
}

export default Contact