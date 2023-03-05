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
                {
                  item.address != '' ?
                    <div>
                      <a href="#" className='d-flex align-items-center'>
                        <div className="icon-box d-flex align-items-center">
                          <FaMapMarkerAlt />
                        </div>
                        <div className="content-box">
                          <span>Địa chỉ</span><br />
                          {item.address}
                        </div>
                      </a>
                    </div> : ''
                }
                {
                  item.phoneNumber != '' ?
                    <div>
                      <a href={'tel:' + item.phoneNumber} className='d-flex align-items-center'>
                        <div className="icon-box d-flex align-items-center">
                          <FaPhoneSquareAlt />
                        </div>
                        <div className="content-box">
                          <span>Số điện thoại</span><br />
                          {item.phoneNumber}
                        </div>
                      </a>
                    </div> : ''
                }
              </div>
              <div className="col-6">
                {
                  item.email != '' ?
                    <div>
                      <a href={'mailto:' + item.email} className='d-flex align-items-center'>
                        <div className="icon-box d-flex align-items-center">
                          <FaMailBulk />
                        </div>
                        <div className="content-box">
                          <span>Email</span><br />
                          {item.email}
                        </div>
                      </a>
                    </div> : ''
                }
                {
                  item.linkToFace != '' ?
                    <div>
                      <a href={item.linkToFace} className='d-flex align-items-center'>
                        <div className="icon-box d-flex align-items-center">
                          <FaFacebookSquare />
                        </div>
                        <div className="content-box">
                          <span>Facebook</span><br />
                          {item.linkToFace}
                        </div>
                      </a>
                    </div> : ''
                }
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