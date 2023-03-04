import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import { FaBars } from 'react-icons/fa'
import $ from 'jquery'
import Cookie, { useCookies } from 'react-cookie'
// import Modal from './Modal'
import { homeAPI } from "../config"
import { swtoast } from "../mixins/swal.mixin";


const PHONENUMBER_REGEX = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/

const Header = () => {
  let [url, setUrl] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [cookies, setCookie] = useCookies(['user']);
  const [roles, setRoles] = useState('-1')
  const [isShowWindow, setIsShowWindow] = useState(false)
  const [again, setAgain] = useState(false)
  const [registed, setRegisted] = useState(false)

  // const [isUserPage, setIsUserPage] = useState(false)

  // useEffect(() => {
  //   const currentPath = window.location.pathname;
  //   if (currentPath.includes('admin')) {
  //     setIsUserPage(true)
  //   }
  // }, []);

  // useEffect(() => {
  //   let timeoutId;
  //   if (!isShowWindow && !again) {
  //     timeoutId = setTimeout(() => {
  //       setIsShowWindow(true);
  //       setAgain(true)
  //     }, 15000);
  //   }

  //   if (!isShowWindow && again && !registed) {
  //     timeoutId = setTimeout(() => {
  //       setIsShowWindow(true);
  //     }, 15000);
  //   }
  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [isShowWindow]);

  // useEffect(() => {
  //   $('.box-icon-window').click(() => {
  //     setIsShowWindow(false)
  //   })
  // })

  useEffect(() => {
    $(document).ready(function () {
      $('body').addClass('loaded');
    })
  })

  useEffect(() => {
    if (cookies.user != undefined) {
      const userCookie = cookies.user
      setRoles(userCookie.roles)
    }
  })

  useEffect(() => {
    if (isOpen === true) {
      $('.menu-item').toggleClass('d-block w-100')
      $('.menu').toggleClass('text-center w-100')
      $('.opacity').removeClass('d-none')
    } else {
      $('.menu-item').removeClass('d-block w-100')
      $('.menu').removeClass('text-center w-100')
      $('.opacity').addClass('d-none')
    }
  }, [isOpen])

  useEffect(() => {
    $(".bar-icon").click(() => {
      setIsOpen(!isOpen)
    })
    $('.opacity').click(() => {
      setIsOpen(!isOpen)
    })
  }, [isOpen])

  useEffect(() => {
    setUrl(window.location.pathname)
  }, [])
  var menu = [
    {
      name: 'Trang chủ',
      href: '/',
    },
    {
      name: 'Sản phẩm',
      href: '/san-pham',
    },
    {
      name: 'Bảng giá',
      href: '/bang-gia',
    },
    {
      name: 'Liên hệ',
      href: '/lien-he',
    },
    {
      name: 'Nhận báo giá',
      href: '/nhan-bao-gia',
    },
  ]

  // const fullNameRef = useRef()
  // const phoneNumberRef = useRef()
  // const modelRef = useRef()

  // const [fullName, setFullname] = useState('')
  // const [phoneNumber, setPhoneNumber] = useState('')
  // const [model, setModel] = useState('')
  // const [fullNameRequired, setFullnameRequired] = useState('')
  // const [phoneNumberRequired, setPhoneNumberRequired] = useState('')
  // const [err, setErr] = useState('')
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   console.log('ávd');
  //   if (fullName.length == 0) {
  //     fullNameRef.current.focus()
  //     setFullnameRequired("Vui lòng nhập họ và tên!!")
  //     return
  //   }
  //   if (!(PHONENUMBER_REGEX.test(phoneNumber))) {
  //     phoneNumberRef.current.focus()
  //     setPhoneNumberRequired("Vui lòng nhập số điện thoại!!")
  //     return
  //   }
  //   try {
  //     const response = await fetch(`${homeAPI}/test-drive/register`, {
  //       method: 'POST',
  //       body: JSON.stringify({ fullName: fullName, phoneNumber: phoneNumber, model: model }),
  //       headers: { 'Content-Type': 'application/json' }
  //     });
  //     const data = await response.json();

  //     swtoast.success({
  //       text: "Chúng tôi đã nhận được thông tin đăng ký của quý khách!",
  //     });
  //     setFullname('')
  //     setPhoneNumber('')
  //     setModel('')
  //     setRegisted(true)
  //     setIsShowWindow(false)
  //   } catch (err) {
  //     if (!err?.response) {
  //       setErr('No Server Response!')
  //     } else if (err.response?.status === 400) {
  //       setErr('Vui lòng nhập đủ họ tên và số điện thoại!')
  //     } else if (err.response?.status === 401) {
  //       setErr('Unauthorized')
  //     } else {
  //       setErr('Register fail!')
  //     }
  //     console.log(err);
  //   }
  // }
  return (
    <div className="header-group">
      <Head>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://scontent.fvca1-4.fna.fbcdn.net/v/t39.30808-6/305980746_404761665121632_2036044433566838028_n.png?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=XCrwrINP6IQAX_ZRw01&_nc_ht=scontent.fvca1-4.fna&oh=00_AfDnGTqf6rB9EzEoHszcbh3adI0b92uRd9bXHLUYCmktQw&oe=63FE8880" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous"></link>
      </Head>
      <div className="header-content">
        <div className="menu position-relative d-flex">
          <div className="logo-box">
            <a href='/'>
              <img className="logo" src="https://suzuki-cantho.vn/public/upload/logo/logo-suzuki-can-tho-official.png" alt="" />
            </a>
          </div>
          <span className='bar-icon position-absolute'>
            <FaBars />
          </span>
          {
            menu.map((item, index) => {
                return <div className="menu-item" key={index}><a className="" href={item.href}>{item.name}</a></div>
            })
          }
          {/* {!isUserPage ?
            <div onClick={() => {
              setIsShowWindow(false)
            }} className={`modal-wrapper position-absolute ${isShowWindow ? '' : 'd-none'}`}>
              <Modal
                phoneNumber={phoneNumber}
                fullName={fullName}
                phoneNumberRef={phoneNumberRef}
                fullNameRef={fullNameRef}
                modelRef={modelRef}
                model={model}
                fullNameRequired={fullNameRequired}
                phoneNumberRequired={phoneNumberRequired}
                setModel={setModel}
                setFullnameRequired={setFullnameRequired}
                setFullname={setFullname}
                setPhoneNumberRequired={setPhoneNumberRequired}
                setPhoneNumber={setPhoneNumber}
                handleSubmit={handleSubmit}
              />
            </div> : ''
          } */}
        </div>
      </div>
      <div id="loader-wrapper">
        <div id="loader"></div>
        <div className="loader-section section-left"></div>
        <div className="loader-section section-right"></div>
      </div>
      <div className="opacity position-absolute d-none"></div>
    </div>
  )
}

export default Header