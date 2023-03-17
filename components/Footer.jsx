import React, { useState, useEffect } from 'react'
import {
  FaMapMarkerAlt, FaPhoneSquareAlt, FaMailBulk, FaFirefox, FaAngleRight,
  FaFacebookSquare, FaTiktok, FaYoutube, FaInstagramSquare, FaCopyright
} from 'react-icons/fa'
import { homeAPI } from '../config'


const Footer = () => {
  const [contacts, setContacts] = useState([])
  const [intro, setIntro] = useState([])

  useEffect(() => {
    const handleGetContacts = async () => {
      fetch(`${homeAPI}/contact/get-all`)
        .then((res) => res.json())
        .then((contacts) => {
          console.log(contacts)
          setContacts(contacts)
        })
    }
    console.log(contacts);
    handleGetContacts()
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

  return (
    <div className='footer'>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <h6>About</h6>
              {
                intro && intro.map((item, index) => {
                  return (
                    <p className="text-justify" key={index}>{item.intro}</p>
                  )
                })
              }
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Categories</h6>
              <ul className="footer-links">
                <li><a href="/san-pham">Sản phẩm</a></li>
                <li><a href="/bang-gia">Bảng giá</a></li>
                <li><a href="/nhan-bao-gia">Nhận báo giá</a></li>
                <li><a href="/lien-he">Bản đồ</a></li>
              </ul>
            </div>

            {
              contacts && contacts.map((item, index) => {
                return (
                  <div key={index} className="col-xs-6 col-md-3">
                    <h6>Contact</h6>
                    <ul className="footer-links">
                      <li><a href="#">{item.address}</a></li>
                      <li><a href={'tel:' + item.phoneNumber}>{item.phoneNumber}</a></li>
                      <li><a href={'mailto:' + item.email}>{item.email}</a></li>
                    </ul>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              {
                contacts && contacts.map((item, index) => {
                  return (
                    <p key={index} className="copyright-text">
                      Copyright &copy; {item.website}
                    </p>
                  )
                })
              }
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              {
                contacts && contacts.map((item, index) => {
                  return (
                    <ul key={index} className="social-icons">
                      {
                        item.linkToFace != '' ?
                          <li><a className="" href={item.linkToFace}><FaFacebookSquare /></a></li> : ''
                      }
                      {
                        item.youtube != '' ?
                          <li><a className="" href={item.youtube}><FaYoutube /></a></li> : ''
                      }
                      {
                        item.instagram != '' ?
                          <li><a className="" href={item.instagram}><FaInstagramSquare /></a></li> : ''
                      }
                      {
                        item.tiktok != '' ?
                          <li><a className="" href={item.tiktok}><FaTiktok /></a></li> : ''
                      }
                    </ul>
                  )
                })
              }
            </div>
          </div>
        </div>
      </footer>
      <div className="contact-icon-group">
        {
          contacts && contacts.map((item, index) => {
            return (
              <div key={index}>
                {
                  item.linkToMessenger != '' ?
                    <label className="contact-icon-fixed icon-messenger">
                      <a target='_blank' href={"https://m.me/" + item.linkToMessenger}><img src="https://cdn.iconscout.com/icon/free/png-256/messenger-14-498409.png" alt="" /></a>
                    </label> : ''
                }
                {
                  item.zalo != '' ?
                    <label className="contact-icon-fixed icon-zalo">
                      <a target='_blank' href={"https://zalo.me/" + item.zalo}><img src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo-Arc.png" alt="" /></a>
                    </label> : ''
                }
                {
                  item.phoneNumber != '' ?
                    <div>
                      <label className="contact-icon-fixed icon-call-phone">
                        <a href={"tel:" + item.phoneNumber}><img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Phone_icon.png?20210306055547" alt="" /></a>
                      </label>
                    </div> : ''
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Footer