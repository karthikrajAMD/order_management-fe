import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
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
  const { cart } = useSelector((item) => item.user);
  const name = useSelector((item) => item.user.userName);
  const email = useSelector((item) => item.user.email);
  const action = "Ordered";
  const sendCart = async () => {
    let x = Math.floor(Math.random() * 1000000 + 1);
    let y = Math.floor(Math.random() * 100 + 1);
    console.log(cart);
    console.log(cart.map((i) => i.name));
    console.log(name);
    console.log(email);
    let addDetails = await axios.post(
      `${env.apiurl}/order-details/add_details`,
      {
        Name: name,
        ProductName: cart.map((i) => i.name),
        email: email,
        OrderId: x + email.substring(0, 2).toUpperCase() + y,
        orderedProducts: cart,
      }
    );

    toast.success(addDetails.data.message);
    if (addDetails.data.statusCode === 200) {
      setTimeout(() => {
        dispatch(DeleteCartComplete());
        navigate("/shoppage");
      }, 3000);
    } else {
      toast.error(addDetails.data.message);
    }
  };
  return name ? (
    <div>
      <div>
        <Navbar bg="primary" variant="dark">
          <LogoutIcon
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
                <span>Home</span>
              </Link>
              {/* <Link to="/shoppage" className="my-Link">
                <span>Features</span>
              </Link> */}
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
                        </Button>{" "}
                        <i
                          onClick={() => {
                            dispatch(DeleteCart(m));
                          }}
                          className="fa-solid fa-trash"
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
          <Button
            className="carPage-proceed"
            onClick={() => {
              sendCart();
            }}
          >
            Proceed Checkout
          </Button>
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
    "INVALID USER"
  );
}

export default CartPage;
