import React, { useState } from "react";
import { message } from "antd";

import { userStore } from "../../../store/store";

import "./style.css";

export const TicketDetails = ({ dataList, totalFare, setErrorMessage }) => {
  const [userData, setUserData] = useState({});
  const [inputErrorMessage, setInputErrorMessage] = useState(false);
  const seatId = userStore((state) => state.seatId);
  const phno = userStore((state) => state.phno);
  const [messageApi, contextHolder] = message.useMessage();
  let seatsIdData = Object.values(seatId[dataList.id]);
  let seatsIdData1 = seatsIdData.map((item) => Object.keys(item));

  console.log("Object.keys(seatId) ", seatsIdData1);

  const paymentBtnHandled = () => {
    if (seatsIdData1.length === 0) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
    }
    const key = "updatable";
    if (
      Object.keys(userData).length === 2 &&
      phno &&
      seatsIdData1.length !== 0
    ) {
      setInputErrorMessage(false);
      messageApi.open({
        type: "success",
        content: "Payment Successful",
      });
    } else {
      setInputErrorMessage(true);
    }
    const ticketData = { ...userData, phno, ...dataList };
    console.log("Ticket Details ", ticketData);
  };
  const inputHandled = (e) => {
    setInputErrorMessage(false);
    setUserData((preData) => ({ ...preData, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {contextHolder}
      <div className="ticketDetails">
        <div className="TDRow">
          <p>Boarding & Dropping</p>
        </div>
        <div className="TDRow">
          <div className="place">
            <p>{dataList.departureLocation}</p>
            <p>{dataList.route}</p>
          </div>
          <p className="time">
            {dataList.departureTime24}
            <span>({dataList.month})</span>
          </p>
        </div>
        <div className="TDRow">
          <div className="place">
            <p>{dataList.arrivalLocation}</p>
            <p>{dataList.route}</p>
          </div>
          <p className="time">
            {dataList.arrivalTime24}
            <span>({dataList.month})</span>
          </p>
        </div>
        <div className="TDRow">
          <input
            type="text"
            placeholder="Enter your Name"
            onChange={inputHandled}
            name="name"
          />
          <input
            type="email"
            placeholder="Enter your Mail Id"
            onChange={inputHandled}
            name="email"
          />
          <input
            type="number"
            defaultValue={phno}
            placeholder="Enter your Phno"
            name="phno"
          />
          {inputErrorMessage ? (
            <div className="ticketDetails-errorMessage">
              <p>please enter your details</p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="TDRow">
          <p>Seat No.</p>
          <p>
            {seatsIdData1.map((item, index) => (
              <span>
                {item[0]}
                {seatsIdData1.length - 1 === index ? "" : ","}
              </span>
            ))}
          </p>
        </div>
        <div className="TDRow">
          <p>Fare Details</p>
        </div>
        <div className="TDRow">
          <p>
            Amount
            <span> ( Taxes will be calculated during payment )</span>
          </p>
          <p>INR {totalFare}</p>
        </div>
        <div className="TDRow">
          <button onClick={paymentBtnHandled}>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </>
  );
};
