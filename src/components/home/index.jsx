import React, { useState } from "react";
import { LiaBusSolid } from "react-icons/lia";
import { CgCalendarDates } from "react-icons/cg";
import { AiOutlineSwap } from "react-icons/ai";
import moment from "moment";
import { Select, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";

import { Header } from "./header";
import { LocationData } from "../../mock_data/index.jsx";

import "./style.css";
import { userStore } from "../../store/store";

export const Home = () => {
  const [selectedTravelDetails, setSelectedTravelDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();
  const addSelectedTravelDetails = userStore(
    (state) => state.addSelectedTravelDetails
  );

  const fromLocationDataHandled = (value) => {
    setSelectedTravelDetails({ ...selectedTravelDetails, from: value });
    setErrorMessage(false);
  };

  const toLocationDataHandled = (value) => {
    setSelectedTravelDetails({ ...selectedTravelDetails, to: value });
    setErrorMessage(false);
  };

  const travelDateHandled = (date, dateString) => {
    const selectedDate = moment(dateString);

    const dayOfWeek = selectedDate.format("ddd");
    const month = selectedDate.format("MMM");
    const day = selectedDate.format("D");
    const year = selectedDate.format("YYYY");
    let selectedDateValue = [dayOfWeek, month, day, year];

    console.log(dateString, dayOfWeek, month, day, year);
    setSelectedTravelDetails({
      ...selectedTravelDetails,
      date: selectedDateValue,
    });
    setErrorMessage(false);
  };

  const handleBtn = () => {
    if (
      selectedTravelDetails &&
      Object.keys(selectedTravelDetails)?.length === 3
    ) {
      addSelectedTravelDetails(selectedTravelDetails);
      navigate("/travels-list");
    } else {
      setErrorMessage(true);
    }
  };
  console.log(selectedTravelDetails);
  return (
    <div>
      <Header />
      <div className="searchBoxContainer">
        <div className="searchBoxContainerBox">
          <div className="searchBar">
            <div className="searchBarContainer">
              <div className="fromSeachBtn">
                <LiaBusSolid className="icon" />
                <div></div>
                <Select
                  showSearch
                  placeholder="From"
                  optionFilterProp="children"
                  onChange={fromLocationDataHandled}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={LocationData}
                />
                <AiOutlineSwap className="centerIcon" />
              </div>

              <div className="toSeachBtn">
                <LiaBusSolid className="icon" />
                <Select
                  showSearch
                  placeholder="To"
                  optionFilterProp="children"
                  onChange={toLocationDataHandled}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={LocationData}
                />
              </div>
              <div className="datePickerBtn">
                <CgCalendarDates className="icon" />
                <DatePicker onChange={travelDateHandled} />
              </div>
            </div>
            <div className="searchBarSearchBtn" onClick={handleBtn}>
              SEARCH BUSES
            </div>
          </div>
          {errorMessage ? (
            <div className="Home-errorMessage">
              <p>please select all fields</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="bottomImage">
        <img
          src="https://platforms.makemytrip.com/contents/9b2f5285-01c5-4fd0-b134-7f03c3db551c" alt=""/>
      </div>
    </div>
  );
};
