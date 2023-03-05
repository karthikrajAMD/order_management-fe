import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { ToastContainer, toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import Nav from "react-bootstrap/Nav";
import { env } from "../environment";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
function OrdersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((item) => item.user);
  const name = useSelector((item) => item.user.userName);
  const email = useSelector((item) => item.user.email);
  const [orders, setOrders] = useState([]);
  const [onlyProduct, setProduct] = useState([]);

  const loadData = async () => {
    const userData = await axios.get(`${env.apiurl}/order-details/details`);
    let data = userData.data.users.filter((e) => e.email === email);
    const myArray = [];
    let oId;
    setOrders(data);
    for (let a of data) {
      const [...rest] = a.orderedProducts;
      oId = a.OrderId;
      for (let a of rest) {
        myArray.push({
          a,
          oId,
        });
      }
    }
    setProduct(myArray);
  };
  useEffect(() => {
    loadData();
  }, []);
  return name ? (
    <div>
      {console.log(onlyProduct)}
      {/* {console.log(orders)} */}
      <div>
        <Navbar bg="primary" variant="dark">
          <LogoutIcon
            className="logout-icon-cartpage"
            onClick={() => {
              navigate("/");
            }}
          />
          <Container>
            <Nav></Nav>
            <Nav className="my-nav">
              <Button
                onClick={(e) => {
                  navigate("/shoppage");
                }}
                className="my-Link my-link-first"
              >
                Home
              </Button>
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
      {orders.length !== 0 ? (
        <div className="container">
          <div className="carPage-container ">
            <Table striped bordered hover className="mt-5">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Order Date</th>
                  <th>Order ID</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Delivery Date</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {onlyProduct.map((e, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{e.a.name}</td>
                    <td>{e.a.created}</td>
                    <td>{e.oId}</td>
                    <td>Rs:{e.a.price}</td>
                    <td>{e.a.quantity}</td>
                    <td>{e.a.expected}</td>
                    <td>{e.a.action}</td>
                    <td>Rs:{e.a.price * e.a.quantity}/-</td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="carPage-empty">
            <h1>No Order Placed!</h1>
          </div>
        </div>
      )}
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

export default OrdersPage;
