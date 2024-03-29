import React, { useRef, useState, useEffect } from 'react'
import Heading from '../components/Heading'
import Head from 'next/head'
import Link from 'next/link'
import axios from './api/axios'
import { homeAPI } from "../config"

import { swtoast } from "../mixins/swal.mixin";

const PHONENUMBER_REGEX = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const PWD_REGEX = /^[a-zA-Z0-9]+$/
const REGISTER_URL = `${homeAPI}/register`
import { Select, Input } from 'antd';
import { provinces } from '../data/ProvinceData'

const register = () => {
  const [users, setUsers] = useState([])
  const [carNameList, setCarNameList] = useState([])

  useEffect(() => {
    const getAllUsers = async () => {
      const result = await axios.get(`${homeAPI}`)
      setUsers(result.data)
    }
    const getCarList = async () => {
      const result = await axios.get(`${homeAPI}/admin`)
      const carNames = result.data.map(car => car.name)
      setCarNameList(carNames)
    }

    getAllUsers()
    getCarList()
  }, [])

  const fullNameRef = useRef();
  const phoneNumberRef = useRef();
  const paymentRef = useRef();
  const emailRef = useRef();
  const modelRef = useRef();
  const pwdRef = useRef();

  const [fullName, setFullname] = useState('')
  const [fullnameFocus, setFullnameFocus] = useState(false)

  const [phoneNumber, setPhoneNumber] = useState('')
  const [validPhoneNumber, setValidPhoneNumber] = useState(false)
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(false)

  const [isCash, setIsCash] = useState(true)

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [password, setPassword] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [model, setModel] = useState('')
  const [province, setProvince] = useState('')

  const [err, setErr] = useState()
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fullNameRef.current.focus()
  }, [])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPhoneNumber(PHONENUMBER_REGEX.test(phoneNumber));
  }, [phoneNumber]);

  // useEffect(() => {
  //   setValidPwd(PWD_REGEX.test(pwd));
  // }, [pwd]);

  useEffect(() => {
    setErr('')
  }, [fullName, email, phoneNumber, isCash, password, model])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    const v2 = PHONENUMBER_REGEX.test(phoneNumber);
    // const v3 = PWD_REGEX.test(pwd);
    // if (!v1) {
    //   emailRef.current.focus();
    //   setErr('Địa chỉ email không hợp lệ!');
    //   return
    // }
    if (!v2) {
      phoneNumberRef.current.focus();
      setErr('Số điện thoại không hợp lệ hoặc đã được sử dụng!');
      return
    }
    // if (!v3) {
    //   pwdRef.current.focus();
    //   setErr('Mật khẩu không hợp lệ!');
    //   return
    // }

    // if (pwd.length < 8) {
    //   pwdRef.current.focus();
    //   setErr('Mật khẩu phải ít nhất 8 ký tự!');
    //   return
    // }
    try {
      var response = await axios.post(REGISTER_URL,
        JSON.stringify({ fullName, phoneNumber, isCash, email, password, modelInterest: model, province }),
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        },
      )
      swtoast.success({
        text: "Đăng ký nhận báo giá thành công.",
      });

      console.log(JSON.stringify(response?.data));
      console.log(response?.data);
      console.log(JSON.stringify(response))

      setFullname('')
      setPhoneNumber('')
      setEmail('')
      setPassword('')
      setModel('')
      setSuccess("Chức mừng! Bạn đã đăng ý nhận báo giá thành công!")
    } catch (err) {
      if (!err?.response) {
        setErr('No Server Response!')
      } else if (err.response?.status === 400) {
        setErr('Vui lòng nhập đủ họ tên và số điện thoại!')
      } else if (err.response?.status === 401) {
        setErr('Unauthorized')
      } else if (err.response?.status === 422) {
        setErr("Số điện thoại hoặc địa chỉ email đã được sử dụng!");
      } else {
        setErr('Register fail!')
      }
      setSuccess(false)
      console.log(err);
    }
  }

  return (
    <div className="account-page register">
      <Head>
        <title>Đăng ký nhận báo giá</title>
        <meta name="title" content="Đăng ký nhận báo giá ngay hôm nay" />
        <meta name='revisit-after' content='1 days' />
        <meta http-equiv="content-language" content="vi" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name='city' content='Cần Thơ' />
        <meta name='keywords' content='xl7, báo giá ô tô suzuki' />
        <meta name="description" content="Nhận báo giá ô tô Suzuki chi nhánh Cái Răng thành phố Cần Thơ nhanh, chính xác và ưu đãi nhất." />
      </Head>
      <Heading title="Đăng ký nhận báo giá" />
      <div className="register-wrapper">
        <div className="main-form">
          <form action="" onSubmit={handleSubmit} className="form-log-up">
            <label htmlFor="fullname" className="d-block">Họ và tên:</label>
            <Input
              className="w-100"
              name="fullname"
              type="text"
              id="fullname"
              placeholder="Tên của bạn là..."
              onChange={(e) => setFullname(e.target.value)}
              onFocus={() => setFullnameFocus(true)}
              onBlur={() => setFullnameFocus(false)}
              value={fullName}
              ref={fullNameRef}
              required
            />
            <label htmlFor="phonenumber" className="d-block">Số điện thoại:</label>
            <Input
              className="w-100"
              name="phonenumber"
              type="text"
              id="phonenumber"
              placeholder="Số điện thoại của bạn là..."
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              ref={phoneNumberRef}
              onFocus={() => setPhoneNumberFocus(true)}
              onBlur={() => setPhoneNumberFocus(false)}
              required
            />
            {/* <label htmlFor="email" className="d-block">Email:</label>
            <input
              className="w-100"
              name="email"
              type="text"
              id="email"
              placeholder="Địa chỉ email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              ref={emailRef}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              required
            /> */}
            <label htmlFor="model-car" className="d-block">Tất cả sản phẩm:</label>
            <Select
              showSearch
              // value={model}
              onChange={(value) => setModel(value)}
              style={{
                width: "100%",
              }}
              placeholder="Chọn sản phẩm bạn quan tâm"
              // defaultValue="Chọn sản phẩm bạn quan tâm"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={carNameList.map((item) => ({
                label: item,
                value: item
              }))}
            />
            <label htmlFor="model-car" className="d-block">Chọn tỉnh thành:</label>
            <Select
              showSearch
              // value={province}
              onChange={(value) => setProvince(value)}
              style={{
                width: "100%",
              }}
              placeholder="Vui lòng chọn tỉnh thành"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={provinces.map((province) => ({
                label: province,
                value: province,
              }))}
            />
            <label htmlFor="payment" className="d-block">Hình thức thanh toán:</label>
            <div className="row">
              <div className="col-6">
                <div className="form-check-payment d-flex align-items-center justify-content-around">
                  <div className='installment'>
                    <input
                      value='installment'
                      id='installment'
                      name="payment"
                      type="radio"
                      onClick={() => setIsCash(false)}
                    // checked={!isCash}
                    />
                    <label type="" htmlFor="installment">Trả góp</label>
                  </div>
                  <div className='cash'>
                    <input
                      value='cash'
                      id='cash'
                      name="payment"
                      type="radio"
                      onClick={() => setIsCash(true)}
                      defaultChecked={isCash}
                    />
                    <label name="" htmlFor="cash">Trả hết</label>
                  </div>
                </div>
              </div>
            </div>
            {
              users.length <= 1 ?
                <>
                  <label htmlFor="pwd" className="">Mật khẩu:</label>
                  <input
                    className="w-100"
                    type="password"
                    name="pwd"
                    id="pwd"
                    placeholder="Mật khẩu"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    ref={pwdRef}
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  // required
                  />
                </> : ''
            }
            <p className="text-danger">{err}</p>
            <p className="text-success">{success}</p>
            <button className="btn submit-btn log-up-btn w-100 text-white" type="submit">Đăng ký</button>
          </form>
        </div>
      </div>
    </div >
  )
}

export default register