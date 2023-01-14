import React, { useEffect, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { env } from "../environment";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { Context } from "../Context";
import axios from "axios";
import SidebarDashboard from "../Bars/SidebarDashboard";
function AdminLoginPage() {
  const [sideShow, setSideShow] = useContext(Context);
  let navigate = useNavigate();
  let loadData = async () => {
    let token = sessionStorage.getItem("token");
    if (token) {
      let res = await axios.get(`${env.apiurl}/users/verify`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.data.statusCode === 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } else {
      toast.error("No Token Found!");
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => {
    setShow3(false);
  };
  const handleShow3 = () => {
    setShow3(true);
  };
  return (
    <>
      <main className={sideShow ? "space-toggle" : null}>
        <SidebarDashboard role={"admin"} />
        <div className="addUser-button">
          <Button variant="primary" className=" mt-3 mb-3">
            <div onClick={handleShow3}>
              <AddIcon />
              Add Admin
            </div>
          </Button>
        </div>
      </main>
    </>
  );
}

export default AdminLoginPage;
