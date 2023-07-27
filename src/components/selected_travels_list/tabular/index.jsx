import React, { useEffect, useState, useMemo } from "react";
import { TbBottle } from "react-icons/tb";
import { LiaBusSolid } from "react-icons/lia";
import { AiOutlineWifi, AiOutlinePlusCircle } from "react-icons/ai";
import { PiPlug } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { GiRosaShield } from "react-icons/gi";
import { MdOutlinePeopleAlt } from "react-icons/md";

import { Seats } from "../seats";
import { TravelsData } from "../../../mock_data";

import "./style.css";
import { userStore } from "../../../store/store";

export const Tabular = () => {
  const [openSeats, setOpenSeats] = useState({});
  const [filteredData2, setFilteredData2] = useState([]);
  const selectedTravelDetails = userStore(
    (state) => state.selectedTravelDetails
  );
  const checkBoxFilter = userStore((state) => state.checkBoxFilter);
  useEffect(() => {}, [checkBoxFilter]);
  const handleSeatsOpen = (id) => {
    setOpenSeats({ [id]: !openSeats[id] });
  };
  console.log("openSeats ", openSeats);

  //useMemo
  const filteredData1 = TravelsData.filter(
    (item) =>
      item.departureLocation == selectedTravelDetails.from &&
      item.arrivalLocation == selectedTravelDetails.to &&
      item.date == selectedTravelDetails.date[2] &&
      item.month == selectedTravelDetails.date[1] &&
      item.year == selectedTravelDetails.date[3]
  );

  const checkBoxFilterData = useMemo(() => {
    if (checkBoxFilter.length !== 0) {
      setFilteredData2((preData) => [...preData]);
      checkBoxFilter.forEach((filter) => {
        // eslint-disable-next-line default-case
        switch (filter) {
          case "departurebefore6am": {
            const filteredData = filteredData2.filter((item) => {
              const departureTime = parseFloat(item.departureTime24).toFixed(2);
              return departureTime < 6;
            });
            setFilteredData2(filteredData);
            break;
          }
          case "departure6amto12pm": {
            const filteredData = filteredData2.filter((item) => {
              const departureTime = parseFloat(item.departureTime24).toFixed(2);
              return departureTime >= 6 && 12 <= departureTime;
            });
            setFilteredData2(filteredData);
            break;
          }
          case "departure12pmto6pm": {
            const filteredData = filteredData2.filter((item) => {
              const departureTime = parseFloat(item.departureTime24).toFixed(2);
              return departureTime >= 12 && departureTime <= 18;
            });
            setFilteredData2(filteredData);
            break;
          }
          case "departureafter6pm": {
            const filteredData = filteredData2.filter((item) => {
              const departureTime = parseFloat(item.departureTime24).toFixed(2);
              return departureTime >= 18;
            });
            setFilteredData2(filteredData);
            break;
          }

          case "arrivebefore6am": {
            const filteredData = filteredData2.filter((item) => {
              const arrival = parseFloat(item.arrivalTime24).toFixed(2);
              return arrival < 6;
            });
            setFilteredData2(filteredData);
            break;
          }
          case "arive6amto12pm": {
            const filteredData = filteredData2.filter((item) => {
              const arrival = parseFloat(item.arrivalTime24).toFixed(2);
              return arrival >= 6 && 12 <= arrival;
            });
            setFilteredData2(filteredData);
            break;
          }
          case "arrive12amto6pm": {
            const filteredData = filteredData2.filter((item) => {
              const arrival = parseFloat(item.arrivalTime24).toFixed(2);
              return arrival >= 12 && arrival <= 18;
            });
            setFilteredData2(filteredData);
            break;
          }
          case "arriveafter6pm": {
            const filteredData = filteredData2.filter((item) => {
              const arrival = parseFloat(item.arrivalTime24).toFixed(2);
              return arrival >= 18;
            });
            setFilteredData2(filteredData);
            break;
          }

          case "seater": {
            const filteredData = filteredData2.filter((item) => {
              return item.type === "Seeter";
            });
            setFilteredData2(filteredData);
            break;
          }
          case "sleeper": {
            const filteredData = filteredData2.filter((item) => {
              return item.type === "Sleeper";
            });
            setFilteredData2(filteredData);
            break;
          }
          case "ac": {
            const filteredData = filteredData2.filter((item) => {
              return item.type === "A/C";
            });
            setFilteredData2(filteredData);
            break;
          }
          case "nonac": {
            const filteredData = filteredData2.filter((item) => {
              return item.type === "NON A/C Sleeper";
            });
            setFilteredData2(filteredData);
            break;
          }
        }
      });
    } else {
      setFilteredData2(filteredData1);
    }
  }, [checkBoxFilter]);

  console.log("checkBoxFilter in tabular: ", checkBoxFilter);
  console.log("filteredData2: ", filteredData2);
  return (
    <>
      <div className="tabular">
        <div className="tabularHeader">
          <div className="tabularHeaderData">
            <p>
              {filteredData2.length} Buses{" "}
              <span style={{ color: "#6a6a6a" }}>found</span>
            </p>
          </div>
          <div className="tabularHeaderData">
            <p>Departure</p>
          </div>
          <div className="tabularHeaderData">
            <p>Duration</p>
          </div>
          <div className="tabularHeaderData">
            <p>Arrival</p>
          </div>
          <div className="tabularHeaderData">
            <p>Ratings</p>
          </div>
          <div className="tabularHeaderData">
            <p>Fare</p>
          </div>
          <div className="tabularHeaderData">
            <p>Seats Available</p>
          </div>
        </div>
        {filteredData2.map((item) => {
          return (
            <div className="tabularBodyContainer">
              <div className="tabularBody">
                <div className="tabularBodyData">
                  <p>{item.name}</p>
                  <p>{item.type}</p>
                  <p>
                    <TbBottle className="icon" />
                    <LiaBusSolid className="icon" />
                    <AiOutlineWifi className="icon" />
                    <AiOutlinePlusCircle className="icon" />
                    <PiPlug className="icon" />
                    <span>
                      <SlLocationPin className="icon" /> Live Tracking
                    </span>
                  </p>
                </div>
                <div className="tabularBodyData">
                  <p>{item.departureTime24}</p>
                  <p>{item.departureLocation}</p>
                </div>
                <div className="tabularBodyData">
                  <p>{item.duration}</p>
                </div>
                <div className="tabularBodyData">
                  <p>{item.arrivalTime24}</p>
                  <p> </p>
                  <p>{item.arrivalLocation}</p>
                </div>
                <div className="tabularBodyData">
                  <p>
                    <GiRosaShield className="icon" />
                    {item.ratings}
                  </p>
                  <p>
                    <MdOutlinePeopleAlt className="icon" /> {item.ratingCount}
                  </p>
                </div>
                <div className="tabularBodyData">
                  <p>Starts from </p>
                  <p>
                    INR <span>{item.fare}</span>
                  </p>
                </div>
                <div className="tabularBodyData">
                  <p>
                    <span>{item.noOfSeats}</span> Seats available
                  </p>
                  <p>
                    <span>{item.singleSeats}</span> Single
                  </p>
                </div>
                <div
                  className="viewSteats"
                  onClick={() => handleSeatsOpen(item.id)}
                >
                  VIEW SEATS
                </div>
              </div>
              <div
                className={openSeats[item.id] ? "seatsDisplay" : "seatsNone"}
              >
                <Seats
                  openSeats={openSeats}
                  setOpenSeats={setOpenSeats}
                  dataList={item}
                />
              </div>
            </div>
          );
        })}
        {filteredData2.length === 0 ? (
          <>
            <div className="noDataFound">
              <img
                src="https://www.redbus.in/images/srp/newOopsImage.svg"
                alt="no found"
              />
              <p>Oops! No buses found.</p>
              <p>No routes available</p>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
