import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ControlledCarousel from "./Contolled";
import ProductPage from "./ProductPage";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import "./product.css";
import { useNavigate } from "react-router-dom";
function ShopPage() {
  const { cart } = useSelector((item) => item.user);
  const navigate = useNavigate();
  const name = useSelector((item) => item.user.userName);
  return name ? (
    <div>
      <div>
        <Navbar bg="primary" variant="dark">
          <LogoutIcon
            className="logout-icon-cartpage"
            onClick={() => {
              navigate("/");
            }}
          />
          <Container>
            <Nav>
              <div className="active-pink-3 active-pink-4 ">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
            </Nav>
            <Nav className="my-nav">
              <Link to="/shoppage" className="my-Link my-link-first">
                Home
              </Link>
              <Button
                className="cartdisp mr-5"
                onClick={(e) => {
                  navigate("/cartpage");
                }}
              >
                <i className="fas fa-shopping-cart"></i>
                <span> {cart.length}</span>
              </Button>
            </Nav>
          </Container>
        </Navbar>
      </div>
      <div className="display-body">
        <ControlledCarousel />
      </div>
      <div>
        <ProductPage />
      </div>
      <div
        className="text-center p-3 mt-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023 Copyright
      </div>
    </div>
  ) : (
    <>
      <div className="invalid">
        <h1>INVALID USER</h1>
        <Button
          onClick={() => {
            navigate("/home");
          }}
        >
          Select User
        </Button>
      </div>
    </>
  );
}

export default ShopPage;
