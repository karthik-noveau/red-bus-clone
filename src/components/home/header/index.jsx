import React from "react";
import { VscAccount } from "react-icons/vsc";
import { BsHeadset } from "react-icons/bs";

import "./style.css";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate()
  const login = ()=>{
    navigate("/login")
  }
  return (
    <>
      <div className="header">
        <div className="headerContainer">
          <div className="leftSideMenuItems">
            <div>
              <img
                src="https://st.redbus.in/Images/rdc/rdc-redbus-logo.svg"
                alt="redbus-log"
                onClick={()=>navigate("/")}
              />
              <span></span>
            </div>
            <div onClick={()=>navigate("/")}>
              <img
                src="https://st.redbus.in/Images/rdc/rdc-redbus-logo.svg"
                alt="redbus-log"

              />
              <p>Bus Tickets</p>
            </div>
            <div onClick={()=>navigate("/")}>
              <img
                src="https://st.redbus.in/web/images/layout/ryde_vertical.svg"
                alt="redbus-log"
              />
              <p>Cab Rental</p>
            </div>
            <div onClick={()=>navigate("/")}>
              <img
                src="https://st.redbus.in/web/images/layout/rail_vertical.svg"
                alt="redbus-log"
              />
              <p>Train Tickets</p>
            </div>
          </div>
          <div className="rightSideMenuItems">
            <div onClick={()=>navigate("/")}>
              <BsHeadset className="icon" />
              <p>Help</p>
            </div>
            <div>
              <VscAccount className="icon" />
              <p onClick={login}>Account</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
