import React, { useState, useEFfect, useEffect } from 'react'
import Heading from '../components/Heading'
import Head from 'next/head'
import axios from 'axios'
import { homeAPI } from '../config'
import Map from '../components/Map'

import {
  FaMapMarkerAlt,
  FaPhoneSquareAlt,
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
        <title>Liên hệ</title>
        <meta name="title" content="Liên hệ đại lý ô tô Suzuki" />
        <meta name='revisit-after' content='1 days' />
        <meta http-equiv="content-language" content="vi" />
        <meta name='city' content='Cần Thơ' />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name='keywords' content='Suzuki cần thơ, suzuki cái răng, liên hệ ô tô suzuki' />
        <meta name="description" content="Liên hệ ô tô Suzuki để nhận mức giá ưu đãi nhất" />
      </Head>
      <Heading title="Liên hệ" />
      <div className="contact-content">
        {
          contacts && contacts.map((item, index) =>
            <div className='content-wrapper row' key={index}>
              <div className="col-md-6">
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
              <div className="col-md-6">
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
        {/* <Map /> */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.114232327323!2d105.79250601471162!3d10.00742219284605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0626326511777%3A0x45e4fadd9ddca041!2zOGEgVsO1IE5ndXnDqm4gR2nDoXAsIEjGsG5nIFBow7osIEPDoWkgUsSDbmcsIEPhuqduIFRoxqEgOTAwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1680882158742!5m2!1svi!2s"
          width="600"
          height="520"
          style={{
            border: 0,
            width: '100%',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  )
}

export default Contact