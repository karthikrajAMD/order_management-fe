import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";
import { ToastContainer } from "react-toastify";
import "./Sidebar.css";
function SidebarDashboard(props) {
  const [sideShow, setSideShow] = useContext(Context);
  return (
    <>
      <div>
        {props.role === "user" ? (
          ""
        ) : (
          <>
            <header className={`header ${sideShow ? "space-toggle" : null}`}>
              <div
                className="header-toggle"
                onClick={() => setSideShow(!sideShow)}
              >
                <i
                  className={`fas fa-bars ${
                    sideShow ? "fa-solid fa-xmark" : null
                  }`}
                ></i>
              </div>
              <div>
                <h2 className="h2-title nav-heading">{props.name}</h2>
              </div>
            </header>
            <aside className={`sidebar ${sideShow ? "sideShow" : null}`}>
              <nav className="nav">
                <div>
                  <Link to="/" className="nav-logo">
                    <i className={`fas fa-home-alt nav-logo-icon`}></i>
                    <span className="nav-logo-name ">Homepage</span>
                  </Link>

                  <div className="nav-list">
                    <Link
                      to={"/dashboard"}
                      className={
                        props.name === "Dashboard"
                          ? "nav-links active"
                          : "nav-links "
                      }
                    >
                      <i className="fas fa-tachometer-alt nav-links-icon"></i>
                      <span className="nav-links-name ">Dashboard</span>
                    </Link>
                    <Link
                      to={"/add-product"}
                      className={
                        props.name === "Add Product"
                          ? "nav-links active"
                          : "nav-links "
                      }
                    >
                      <i className="fas fa-hotel nav-links-icon"></i>
                      <span className="nav-links-name ">Add Product</span>
                    </Link>
                    {/* <Link
                      to={
                      }
                      className="nav-links"
                    >
                      <i className="fas fa-image nav-links-icon"></i>
                      <span className="nav-links-name">Service Request</span>
                    </Link> */}
                  </div>
                </div>

                <Link to="/home" className="nav-links">
                  <i className="fas fa-sign-out nav-links-icon"></i>
                  <span className="nav-links-name ">Logout</span>
                </Link>
              </nav>
            </aside>
          </>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default SidebarDashboard;
