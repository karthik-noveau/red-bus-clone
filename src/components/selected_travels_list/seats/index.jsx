import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import { ImCancelCircle } from "react-icons/im";
import { GiSteeringWheel } from "react-icons/gi";

import { TicketDetails } from "../ticket_details";
import { userStore } from "../../../store/store";
import { checkboxRow1, checkboxRow2, checkboxRow3 } from "../../../mock_data";

import "./style.css";

export const Seats = ({ openSeats, setOpenSeats, dataList }) => {
  const addSeatId = userStore((state) => state.addSeatId);
  const [totalFare, setTotalFare] = useState(0.0);
  const [seatId, setSeatId] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  const [paymentComponent, setPaymentComponent] = useState(false);
  useEffect(() => {
    const storedSeatId = localStorage.getItem("seatId");
    if (storedSeatId) {
      setSeatId(JSON.parse(storedSeatId));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("seatId", JSON.stringify(seatId));
  }, [seatId]);
  
  const seatTicketHandled = (event) => {
    setSeatId((prevSeatId) => {
      const updatedSeatId = { ...prevSeatId };
      const seatIdKey = dataList.id;

      if (event.target.checked) {
        setErrorMessage(false);
        updatedSeatId[seatIdKey] = {
          ...updatedSeatId[seatIdKey],
          [event.target.seatId]: {
            [event.target.seatId]: event.target.seatId,
            check: event.target.checked,
          },
        };
        setTotalFare(parseFloat((totalFare + dataList.fare).toFixed(2)));
      } else {
        delete updatedSeatId[seatIdKey][event.target.seatId];
        if (Object.keys(updatedSeatId[seatIdKey]).length === 0) {
          delete updatedSeatId[seatIdKey];
        }
        setTotalFare(parseFloat((totalFare - dataList.fare).toFixed(2)));
      }
      addSeatId(updatedSeatId);
      localStorage.setItem("seatId", JSON.stringify(updatedSeatId));
      return updatedSeatId;
    });
  };
  const handleClose = (id) => {
    setOpenSeats({
      [dataList.id]: !openSeats[id],
    });
  };
  const paymentComponentHandled = () => {
    if (Object.keys(seatId)?.length === 0) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
      setPaymentComponent(true);
    }
  };
  return (
    <>
      <div className="seats">
        <div className="seatsHeader">
          <p>Click on an Available seat to proceed with your transaction.</p>
          <ImCancelCircle
            className="icon"
            onClick={() => handleClose(dataList.id)}
          />
        </div>
        <div className="seatsMainRows">
          <div className="seatsRowContainer">
            <div className="driverSeat">
              <GiSteeringWheel className="icon" />
            </div>
            <div className="seatsRows">
              <div className="seatsRow">
                {checkboxRow1.map((item) => (
                  <>
                    <Checkbox
                      className="checkbox"
                      onChange={(event) => seatTicketHandled(event)}
                      seatId={item}
                    ></Checkbox>
                  </>
                ))}
              </div>
              <div className="seatsRow">
                {checkboxRow2.map((item) => (
                  <>
                    <Checkbox
                      className="checkbox"
                      onChange={(event) => seatTicketHandled(event)}
                      seatId={item}
                    ></Checkbox>
                  </>
                ))}
              </div>
              <div className="seatsRow">
                {checkboxRow3.map((item) => (
                  <>
                    <Checkbox
                      className="checkbox"
                      onChange={(event) => seatTicketHandled(event)}
                      seatId={item}
                    ></Checkbox>
                  </>
                ))}
              </div>
            </div>
            {errorMessage ? (
              <div className="seatSelect-errorMessage">
                <p>please select your seats</p>
              </div>
            ) : (
              ""
            )}
          </div>

          {paymentComponent ? (
            <TicketDetails
              dataList={dataList}
              totalFare={totalFare}
              setErrorMessage={setErrorMessage}
            />
          ) : (
            <div className="continueToPayment">
              <div className="PointRows">
                <div className="PointRow1">
                  <p className="headerTitle">BOARDING POINT</p>
                  <div className="PointRow1Details">
                    <div className="PointRow1DetailsTime">
                      <p>{dataList.departureTime24}</p>
                    </div>
                    <div className="PointRow1DetailsLocation">
                      <p>{dataList.departureLocation}</p>
                      <p>{dataList.route}</p>
                    </div>
                  </div>
                </div>
                <div className="PointRow2">
                  <p className="headerTitle">DROPPING POINT</p>
                  <div className="PointRow2Details">
                    <div className="PointRow2DetailsTime">
                      <p>{dataList.arrivalTime24}</p>
                      <p>
                        ({dataList.date} {dataList.day})
                      </p>
                    </div>
                    <div className="PointRow2DetailsLocation">
                      <p>{dataList.arrivalLocation}</p>
                      <p>{dataList.route}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottomRow">
                <div className="totalAmount">
                  <p>
                    Amount
                    <span> ( Taxes will be calculated during payment )</span>
                  </p>
                  <p>INR {totalFare}</p>
                </div>
                <button onClick={paymentComponentHandled}>CONTINUE</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
