import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTimes, FaEdit } from 'react-icons/fa'
import { swalert, swtoast } from "../mixins/swal.mixin";
import { homeAPI, feAPI } from "../config"

const PriceTableItem = (props) => {
  const [priceTable, setPriceTable] = useState([])
  const version = props.version
  const price = props.price
  
  const addPointToPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  const versionItem = version.map((item, index) => {
    if (item != '') {
      return (
        <div className="fw-bold" key={index}>{item}</div>
      )
    }
  })
  const priceItem = price.map((item, index) => {
    if (item != '') {
      return (
        <div className="fw-bold" key={index}>{addPointToPrice(item)}</div>
      )
    }
  })

  return (
    <div className="price-table-item text-center position-relative">
      <div className="img-wrapper position-relative">
        <img src={props.srcCar} alt="" />
        <div className="edit-price-table-absolute position-absolute" onClick={() => {
          window.location.assign(feAPI + `/admin/price-table/${props.id}`)
        }}>
          <FaEdit className="edit-price-table-btn text-center" />
        </div>
      </div>
      <div className="infor-price-table-group">
        <h4 className="name-car text-uppercase">{props.nameCar}</h4>
        <div className="table-responsive">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className="fw-bold bg-light"><div>Phiên bản</div></td>
                <td className="fw-bold bg-light"><div>Giá&nbsp;(VNĐ)</div></td>
              </tr>
              <tr>
                <td>
                  {versionItem}
                </td>
                <td>
                  {priceItem}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PriceTableItem