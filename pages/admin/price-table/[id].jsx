import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import Heading from '../../../components/Heading'
import Head from 'next/head'
import { swalert, swtoast } from "../../../mixins/swal.mixin";
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import $ from 'jquery'
const EDITPRICETABLE_URL = `${homeAPI}/admin/price-table`
import { homeAPI, feAPI } from "../../../config"

const EditPriceTable = () => {
    const router = useRouter()
    const priceTableId = router.query.id;

    const nameCarRef = useRef()
    const srcCarRef = useRef()
    const priceRef = useRef()

    const [nameCar, setNameCar] = useState('')
    const [srcCar, setSrcCar] = useState('')
    const [err, setErr] = useState('')
    const [priceTable, setPriceTable] = useState([])

    const [version1, setVersion1] = useState('')
    const [version2, setVersion2] = useState('')
    const [version3, setVersion3] = useState('')
    const [version4, setVersion4] = useState('')
    const [version, setVersion] = useState([])

    const [price1, setPrice1] = useState('')
    const [price2, setPrice2] = useState('')
    const [price3, setPrice3] = useState('')
    const [price4, setPrice4] = useState('')
    const [price, setPrice] = useState([])


    const [cookies, setCookie] = useCookies(['user']);
    var userCookie
    const [roles, setRoles] = useState(0)
    const [token, setToken] = useState('')

    useEffect(() => {
        if (cookies.user != undefined) {
            userCookie = cookies.user
            setRoles(userCookie.roles)
            setToken(userCookie.accessToken)
        }
    })

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        if (userCookie.roles != 1) {
            $('.price-table-manage-page').hide()
        }
        const getPriceTable = async () => {
            fetch(homeAPI + '/admin/find-all-price-table', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((res) => res.json())
                .then((priceTable) => {
                    setPriceTable(priceTable)
                    console.log(priceTable)
                })
        }
        getPriceTable();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    useEffect(() => {
        console.log(priceTable, version1);
        priceTable.map((priceTable) => {
            if (priceTable.id === priceTableId) {
                setNameCar(priceTable.nameCar)
                setSrcCar(priceTable.srcCar)
                setVersion1(priceTable.version[0])
                setVersion2(priceTable.version[1])
                setVersion3(priceTable.version[2])
                setVersion4(priceTable.version[3])
                setPrice1(priceTable.price[0])
                setPrice2(priceTable.price[1])
                setPrice3(priceTable.price[2])
                setPrice4(priceTable.price[3])
                console.log(price4);
                setVersion([version1, version2, version3, version4])
                setPrice([price1, price2, price3, price4])
            }
        })
    }, [])
    useEffect(() => {
        setVersion([version1, version2, version3, version4])
    }, [version1, version2, version3, version4])
    useEffect(() => {
        setPrice([price1, price2, price3, price4])
    }, [price1, price2, price3, price4])

    const handleUpdatePriceTable = async (e) => {
        e.preventDefault();
        if (!nameCar) {
            setErr("Tên xe không được để trống!");
            nameCarRef.current.focus();
            return
        }
        if (!srcCar) {
            setErr("Link ảnh không được để trống!");
            srcCarRef.current.focus();
            return
        }
        try {
            const token = userCookie.accessToken
            const body = { nameCar, price, srcCar, version }
            console.log(body);
            const response = await axios.put(homeAPI + `/admin/update-price-table/${priceTableId}`, body
                ,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                    withCredentials: true
                }
            )
            // console.log(JSON.stringify(response?.data));
            console.log(response?.data);
            // console.log(JSON.stringify(response))
            swtoast.success({
                text: "Cập nhật bảng giá thành công!!",
            });
            window.location.assign(feAPI + '/admin/ql-bang-gia')
        } catch (err) {
            if (!err?.response) {
                setErr("No server response")
            } else if (err.response.status === 400) {
                setErr("Tên xe, giá, link ảnh không được để trống!")
            } else if (err.response.status === 401) {
                setErr('Unauthorized')
            } else if (err.response.status === 422) {
                setErr("Bảng xe đã tồn tại!")
                swtoast.error({
                    text: "Bảng xe này đã tồn tại!!",
                });
                nameCarRef.current.focus();
            } else {
                setErr("Thêm bảng xe thất bại!");
            }
            console.log(err);
        }
    }


    return (
        <div className='price-table-manage-page'>
            <Head>
                <title>Cập nhật bảng giá</title>
            </Head>
            <div className="add-price-table-group update-price-table-group">
                <Heading title='Cập nhật bảng giá' />
                <form id='add-price-table-form' action="" onSubmit={handleUpdatePriceTable}>
                    <label htmlFor="name-car" className="w-100">Tên xe:</label>
                    <input
                        id="name-car"
                        placeholder="Nhập tên xe"
                        type="text"
                        className="w-100"
                        ref={nameCarRef}
                        value={nameCar}
                        onChange={(e) => setNameCar(e.target.value)}
                    />
                    <label htmlFor="src-car" className="w-100">Link ảnh:</label>
                    <input
                        id="src-car"
                        placeholder="Dán link ảnh"
                        type="text"
                        className="w-100"
                        ref={srcCarRef}
                        value={srcCar}
                        onChange={(e) => setSrcCar(e.target.value)}
                    />
                    <div className='version-price-box justify-content-between flex-wrap d-flex align-items-center'>
                        <div>
                            <label htmlFor="version">Phiên bản:</label>
                            <input
                                id="version"
                                type="text"
                                value={version1}
                                placeholder="Phiên bản 1"
                                onChange={(e) => setVersion1(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="" htmlFor="price">Giá:</label>
                            <input
                                id="price"
                                type="text"
                                className=''
                                placeholder="Ví dụ: 1.200.000.000, 560.000.000"
                                ref={priceRef}
                                value={price1}
                                onChange={(e) => setPrice1(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='version-price-box flex-wrap d-flex align-items-center justify-content-between'>
                        <div>
                            <label htmlFor="version">Phiên bản:</label>
                            <input
                                id="version"
                                type="text"
                                placeholder="Phiên bản 2"
                                value={version2}
                                onChange={(e) => setVersion2(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="" htmlFor="price">Giá:</label>
                            <input
                                id="price"
                                type="text"
                                className=''
                                placeholder="Ví dụ: 1.200.000.000, 560.000.000"
                                ref={priceRef}
                                value={price2}
                                onChange={(e) => setPrice2(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='version-price-box flex-wrap d-flex align-items-center justify-content-between'>
                        <div>
                            <label htmlFor="version">Phiên bản:</label>
                            <input
                                id="version"
                                type="text"
                                placeholder="Phiên bản 3"
                                value={version3}
                                onChange={(e) => setVersion3(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="" htmlFor="price">Giá:</label>
                            <input
                                id="price"
                                type="text"
                                className=''
                                placeholder="Ví dụ: 1.200.000.000, 560.000.000"
                                ref={priceRef}
                                value={price3}
                                onChange={(e) => setPrice3(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='version-price-box flex-wrap d-flex align-items-center justify-content-between'>
                        <div>
                            <label htmlFor="version">Phiên bản:</label>
                            <input
                                id="version"
                                type="text"
                                placeholder="Phiên bản 4"
                                value={version4}
                                onChange={(e) => setVersion4(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="" htmlFor="price">Giá:</label>
                            <input
                                id="price"
                                type="text"
                                className=''
                                placeholder="Ví dụ: 1.200.000.000, 560.000.000"
                                ref={priceRef}
                                value={price4}
                                onChange={(e) => setPrice4(e.target.value)}
                            />
                        </div>
                    </div>
                    <p className="text-danger">{err}</p>
                    <div className="submit-wrapper w-100 text-center">
                        <button type="submit" className="submit-btn">LƯU</button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default EditPriceTable