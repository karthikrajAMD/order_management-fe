import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";
import { DeleteCartComplete } from "../Redux/cartSystem";
import { env } from "../environment";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { AddCart } from "../Redux/cartSystem";
import { RemoveCart } from "../Redux/cartSystem";
import { DeleteCart } from "../Redux/cartSystem";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [orderId, setOrderId] = useState();
  const { cart } = useSelector((item) => item.user);
  const name = useSelector((item) => item.user.userName);
  const email = useSelector((item) => item.user.email);
  let [id, setId] = useState();
  const makePayment = async (token) => {
    let resultPayment = await axios.post(
      `${env.apiurl}/stripe/create-checkout-session`,
      {
        token,
        price: calculateTotal(),
        name: name,
        id: id,
        desc: "No.1 Mobile shop",
        quantity: 0,
      }
    );
    if (resultPayment.data.statusCode === 200) {
      toast.success("Payment successful");
      sendCart();
    } else {
      toast.error("Error in payment");
    }
  };
  const sendCart = async () => {
    console.log(cart.map((i) => i.name));
    let addDetails = await axios.post(
      `${env.apiurl}/order-details/add_details`,
      {
        Name: name,
        ProductName: cart.map((i) => i.name),
        email: email,
        OrderId: id,
        orderedProducts: cart,
      }
    );

    toast.success("Your order placed successfully");
    if (addDetails.data.statusCode === 200) {
      setTimeout(() => {
        dispatch(DeleteCartComplete());
        navigate("/shoppage");
      }, 3000);
    } else {
      toast.error(addDetails.data.message);
    }
  };
  function calculateTotal() {
    let total = cart.map((e) => e.price * e.quantity);
    let sum = 0;
    for (let a of total) {
      sum += a;
    }
    return sum;
  }
  // function valuePass(id) {
  //   setOrderId(id);
  // }
  function generateId() {
    let x = Math.floor(Math.random() * 1000000 + 1);
    let y = Math.floor(Math.random() * 100 + 1);
    let oId = x + email.substring(0, 2).toUpperCase() + y;
    id = oId;
    console.log(oId);
    return oId;
  }
  return name ? (
    <div>
      {console.log(cart)}
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
              <Button className="cartdisp mr-5" disabled={true}>
                <i className="fas fa-shopping-cart"></i>
                <span> {cart.length}</span>
              </Button>
            </Nav>
          </Container>
        </Navbar>
      </div>
      {cart.length !== 0 ? (
        <div className="container">
          <div className="carPage-container">
            <Table striped className="cartPage-table">
              <tbody className="cartPage-tbody">
                {cart.map((m, i) => (
                  <>
                    <tr key={i} className="cartPage-tr">
                      <td>{m.name}</td>
                      <td>
                        <img className="table-image" src={m.img} alt={m.name} />
                      </td>
                      <td>
                        <i className="fa fa-inr"></i>
                        {m.price}.00
                      </td>
                      <td>
                        <Button
                          onClick={() => {
                            dispatch(RemoveCart(m));
                          }}
                        >
                          -
                        </Button>
                        <span className="cartPage-span">{m.quantity}</span>
                        <Button
                          onClick={() => {
                            dispatch(AddCart(m));
                          }}
                        >
                          +
                        </Button>
                        <i
                          onClick={() => {
                            dispatch(DeleteCart(m));
                          }}
                          className="fa-solid fa-trash p-2"
                          style={{ color: "red" }}
                        ></i>
                      </td>
                      <td>
                        <i className="fa fa-inr"></i>
                        {m.price * m.quantity}.00
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>

            <div className="total-cal">
              <h2>Total:Rs.</h2>
              <span>
                <h2>
                  {calculateTotal()}
                  /-
                </h2>
              </span>
            </div>
            <div className="default-card">
              <h6>
                Default card number :
                <span className="card-num">4242 4242 4242 4242 </span>{" "}
              </h6>
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
          </div>
          <StripeCheckout
            stripeKey="pk_test_51MiBDRSITjwDaDDyYkboiU6VMv4vdm9ZhbeHFT8f93bFudNkx0ERk9fTh3q43rN94xJPvW0DioqMFj4fnkOObstd00dFYytdY4"
            name={"Your Order id is:" + generateId()}
            amount={calculateTotal() * 100}
            currency="INR"
            token={makePayment}
          >
            <Button
              className="carPage-proceed"
              onClick={() => {
                // sendCart();
              }}
            >
              Proceed Checkout
            </Button>
          </StripeCheckout>
        </div>
      ) : (
        <div className="container">
          <div className="carPage-empty">
            <h1>Cart is Empty!</h1>
          </div>
        </div>
      )}
    </div>
  ) : (
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
  );
}

export default CartPage;
