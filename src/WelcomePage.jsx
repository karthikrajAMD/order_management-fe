import React from "react";
import { useNavigate } from "react-router-dom";
import "./welcomepage.css";
import { Link } from "react-router-dom";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";
function WelcomePage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="header-welcomepage">
        <h1 className="logo">Raja Mobiles</h1>
        <div onClick={() => navigate("/home")} className="Login-cont">
          <h3>
            Lets go <SendToMobileIcon />
          </h3>
        </div>
      </div>
      <div className="banner">
        <div className="content">
          <h2>
            Order <span>Management</span>
          </h2>
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
