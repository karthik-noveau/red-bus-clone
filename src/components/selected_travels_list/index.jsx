import React, { useState } from "react";
import { Checkbox } from "antd";
import { HiOutlineArrowRight } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { PiSunHorizon } from "react-icons/pi";
import { RiSunLine } from "react-icons/ri";
import { TbSunset } from "react-icons/tb";
import { GiSunset, GiRosaShield } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import { Header } from "../home/header";
import { Tabular } from "./tabular";
import { userStore } from "../../store/store";

import "./style.css";

export const SelectedTravelsList = () => {
  const [checkBoxFilterId, setCheckBoxFilterId] = useState([]);
  const { from, to, date } = userStore((state) => state.selectedTravelDetails);
  const addCheckBoxFilter = userStore((state) => state.addCheckBoxFilter);
  const navigate = useNavigate();

  //Ref
  const handleFilterChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    if (e.target.checked) {
      setCheckBoxFilterId((preData) => {
        const data = [...preData, e.target.filterId];
        addCheckBoxFilter(data);
        return data;
      });
    } else {
      setCheckBoxFilterId((preData) => {
        const data = [...preData].filter((item) => item !== e.target.filterId);
        addCheckBoxFilter(data);
        return data;
      });
    }
  };

  return (
    <div>
      <div className="SelectedTravelsListHeader">
        <Header />
      </div>
      <div className="fareStartHeaderContainer">
        <div>
          <p>
            Bus Tickets <IoIosArrowForward className="icon" /> {from} to {to}
          </p>
          <p>Fare Starts from INR 444</p>
        </div>
        <button onClick={() => navigate("/")}>Modify</button>
      </div>
      <div className="userSelectedFromToContainer">
        <p>
          {from} <HiOutlineArrowRight className="icon" /> {to}
        </p>
        <div className="dateContainer">
          <p>
            {" "}
            {date[2]} {date[1]} {date[0]}
          </p>
        </div>
      </div>

      <div className="SelectedTravelsListSection">
        <div className="SelectedTravelsListFilterContainer">
          <div className="filtersBox">
            <p className="filtes_title">FILTERS</p>
            <p>DEPARTURE TIME</p>
            <Checkbox
              className="checkBox"
              filterId="departurebefore6am"
              onChange={handleFilterChange}
            >
              <PiSunHorizon /> Before 6 am
            </Checkbox>
            <Checkbox
              className="checkBox"
              filterId="departure6amto12pm"
              onChange={handleFilterChange}
            >
              <RiSunLine /> 6 am to 12 pm
            </Checkbox>
            <Checkbox
              className="checkBox"
              filterId="departure12pmto6pm"
              onChange={handleFilterChange}
            >
              <TbSunset /> 12 pm to 6 pm
            </Checkbox>
            <Checkbox
              className="checkBox"
              filterId="departureafter6pm"
              onChange={handleFilterChange}
            >
              <GiSunset /> After 6 pm
            </Checkbox>
          </div>

          <div className="filtersBox">
            <p>ARRIVE TIME</p>
            <Checkbox
              className="checkBox"
              filterId="arrivebefore6am"
              onChange={handleFilterChange}
            >
              <PiSunHorizon /> Before 6 am
            </Checkbox>
            <Checkbox
              className="checkBox"
              filterId="arive6amto12pm"
              onChange={handleFilterChange}
            >
              <RiSunLine /> 6 am to 12 pm
            </Checkbox>
            <Checkbox
              className="checkBox"
              filterId="arrive12amto6pm"
              onChange={handleFilterChange}
            >
              <TbSunset /> 12 pm to 6 pm
            </Checkbox>
            <Checkbox
              className="checkBox"
              filterId="arriveafter6pm"
              onChange={handleFilterChange}
            >
              <GiSunset /> After 6 pm
            </Checkbox>
          </div>

          <div className="filtersBox">
            <p>BUS TYPE</p>
            <Checkbox
              className="checkBox"
              filterId="seater"
              onChange={handleFilterChange}
            >
              SEATER
            </Checkbox>
            <Checkbox
              className="checkBox"
              filterId="sleeper"
              onChange={handleFilterChange}
            >
              SLEEPER
            </Checkbox>
            <Checkbox
              className="checkBox"
              filterId="ac"
              onChange={handleFilterChange}
            >
              AC
            </Checkbox>
            <Checkbox
              className="checkBox"
              filterId="nonac"
              onChange={handleFilterChange}
            >
              NON AC
            </Checkbox>
          </div>
        </div>
        <div className="SelectedTravelsListDataContainer">
          <div className="SelectedTravelsListDataContainerBox">
            <div className="muiltBrandImages">
              <img
                src="https://s3.rdbuz.com/Images//reddeal/srptiles/IND/PRIMO_Main.png"
                alt="brand-image1"
              />
              <img
                src="https://s3.rdbuz.com/Images//reddeal/srptiles/IND/ad/11046_Main.png"
                alt="brand-image2"
              />
              <img
                src="https://s3.rdbuz.com/Images//reddeal/srptiles/IND/FLEXITICKET_Main.png"
                alt="brand-image3"
              />
              <img
                src="https://s3.rdbuz.com/Images//reddeal/srptiles/IND/RTR_ONWARD_Main.png"
                alt="brand-image4"
              />
              <img
                src="https://s3.rdbuz.com/Images//reddeal/srptiles/IND/HIGHRATED_Main.png"
                alt="brand-image5"
              />
            </div>
            <div className="ratingDetailsText">
              <GiRosaShield className="icon" />
              All bus ratings include safety as a major factor
            </div>
            <div className="SelectedTravelListTableConatainer">
              <Tabular />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
