import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { env } from "../environment";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Context } from "../Context";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import SidebarDashboard from "../Bars/SidebarDashboard";
import "./ShopSidePage.css";
function AdminDashboard() {
  // let [data, setData] = useState([]);
  let [orders, SetOrders] = useState([]);
  let [particularOrders, setParticularOrders] = useState([]);
  let [showMainTable, setShowMainTable] = useState(true);
  let [showSubTable, setShowSubTable] = useState(false);

  let [primaryId, setPrimaryId] = useState("");
  let [id, setId] = useState("");
  const changeStatus = async (myId, status) => {
    console.log(orders);
    particularOrders.map((e) => {
      if (e._id === myId) {
        e.action = status;
      }
    });
    let updateStatus = await axios.put(
      `${env.apiurl}/order-details/update-status/${primaryId}`,
      {
        orderedProducts: particularOrders,
      }
    );
    if (updateStatus.data.statusCode === 200) {
      toast.success(updateStatus.data.message);
      setShowMainTable(true);
      setShowSubTable(false);
      loadData();
    } else {
      toast.error(updateStatus.data.message);
    }
  };
  const changeDate = async (myId, date) => {
    console.log(orders);
    particularOrders.map((e) => {
      if (e._id === myId) {
        e.action = date;
      }
    });
    console.log(date);

    let updateStatus = await axios.put(
      `${env.apiurl}/order-details/update-status/${primaryId}`,
      {
        orderedProducts: particularOrders,
      }
    );
    if (updateStatus.data.statusCode === 200) {
      toast.success(updateStatus.data.message);
      setShowMainTable(true);
      setShowSubTable(false);
      loadData();
    } else {
      toast.error(updateStatus.data.message);
    }
  };
  const updateProductDetails = async (products, ids) => {
    setParticularOrders(products);
    setPrimaryId(ids);
  };
  useEffect(() => {
    console.log(primaryId);
    console.log(particularOrders);
  }, [primaryId, particularOrders]);
  let name = "Dashboard";
  const [sideShow, setSideShow] = useContext(Context);

  const [show1, setShow1] = useState(false);
  // const [show2, setShow2] = useState(false);

  const handleClose1 = () => {
    setShow1(false);
  };
  // const handleShow1 = () => {
  //   setShow1(true);
  // };
  // const handleClose2 = () => {
  //   setShow2(false);
  // };
  // const handleShow2 = () => {
  //   setShow2(true);
  // };
  // const [show0, setShow0] = useState(false);
  // const handleShow = () => {
  //   setShow0(true);
  // };

  let navigate = useNavigate();
  // async function setting({ e }) {
  //   await setId(e._id);
  //   await setEmailN(e.email);
  //   await setRole(e.role);
  //   await setFirstN(e.firstName);
  //   await setLastN(e.lastName);
  //   await setMainRole(e.role);
  // }

  let loadData = async () => {
    let token = sessionStorage.getItem("token");
    async function purchaseDetails() {
      let orderDetails = await axios.get(
        `${env.apiurl}/order-details/details`,
        {}
      );

      handleClose1();
      loadData();
    }
    if (token) {
      let orderDetails = await axios.get(
        `${env.apiurl}/order-details/details`,
        {}
      );
      if (orderDetails.data.statusCode === 200) {
        SetOrders(orderDetails.data.users);
      } else {
        toast.error(orderDetails.data.message);
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

  return (
    <main className={sideShow ? "space-toggle" : null}>
      <SidebarDashboard name={name} role={"admin"} />
      <div className="dash-cont">
        <div className="dashboard-main">
          <Table
            style={{ display: showMainTable ? "block" : "none" }}
            striped
            bordered
            hover
          >
            <thead>
              <tr>
                <th
                  style={{ textAlign: "center", fontSize: "25px" }}
                  colSpan="6"
                >
                  Order-Details
                </th>
              </tr>
            </thead>

            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Product Name</th>
                <th>Ordered Date</th>
                <th>Total price</th>
                <th>Order Id</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((e, i) => {
                return (
                  <tr key={i}>
                    {/* {console.log(e)} */}
                    <td>{i + 1}</td>
                    <td>
                      <Link
                        className="orders-link"
                        onClick={() => {
                          updateProductDetails(e.orderedProducts, e._id);
                          console.log(particularOrders);
                          console.log(primaryId);
                          setShowSubTable(true);
                          setShowMainTable(false);
                        }}
                      >
                        {e.Name}
                      </Link>
                    </td>
                    <td>{e.orderedProducts.map((e) => "/" + e.name)}</td>
                    <td>{e.created}</td>
                    <td>
                      Rs.
                      {e.orderedProducts.reduce(
                        (e, acc) => e + acc.price * acc.quantity,
                        0
                      )}
                      .00
                    </td>
                    <td>{e.OrderId}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Table
            className="Sub-Table"
            responsive
            style={{
              display: showSubTable ? "block" : "none",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th></th>
                <th>Product Id</th>
                <th>Price/qty</th>
                <th>Qty</th>
                <th>Specification</th>
                <th>Price</th>
                <th>Status</th>
                <th>Expected-Delivery</th>
              </tr>
            </thead>
            <tbody>
              {particularOrders
                ? particularOrders.map((e, i) => {
                    return (
                      <tr key={i}>
                        {/* {console.log(e)} */}
                        {/* <td>{console.log(e)}</td> */}
                        <td>{i + 1}</td>
                        <td>{e.name}</td>
                        <td>
                          <img
                            className="orders-table"
                            src={e.img}
                            alr={e.name}
                          />
                        </td>
                        <td>{e.productId}</td>
                        <td>
                          <i class="fa fa-inr"></i>
                          {e.price}
                        </td>
                        <td>{e.quantity}</td>
                        <td>
                          ({e.ram}gb RAM) <br /> ({e.rom}gb ROM)
                        </td>
                        <td>Rs.{e.price * e.quantity}.00</td>
                        <td>
                          {e.action}
                          <hr />
                          <DropdownButton
                            disabled={e.action === "Closed" ? true : false}
                            id="dropdown-item-button"
                            title="Status"
                          >
                            {/* <Dropdown.ItemText>
                          Dropdown item text
                        </Dropdown.ItemText> */}
                            <Dropdown.Item
                              as="button"
                              onClick={() => {
                                console.log(e._id);
                                changeStatus(e._id, "Packed");
                              }}
                            >
                              Packed
                            </Dropdown.Item>
                            <Dropdown.Item
                              as="button"
                              onClick={() => {
                                changeStatus(e._id, "Shipped");
                              }}
                            >
                              Shipped
                            </Dropdown.Item>
                            <Dropdown.Item
                              as="button"
                              onClick={() => {
                                changeStatus(e._id, "Out-for-delivery");
                              }}
                            >
                              Out-for-Delivery
                            </Dropdown.Item>
                            <Dropdown.Item
                              as="button"
                              onClick={() => {
                                console.log(e._id);
                                changeStatus(e._id, "Closed");
                              }}
                            >
                              Closed
                            </Dropdown.Item>
                          </DropdownButton>
                        </td>
                        <td>
                          {e.expected}
                          <hr />
                          {/* <Form.Group controlId="dob">
                            <Form.Control
                              type="date"
                              name="dob"
                              placeholder="Date of Birth"
                            />
                          </Form.Group> */}
                        </td>
                      </tr>
                    );
                  })
                : "NOT FOUND"}
              <tr>
                <td style={{ fontWeight: "bold" }}>Total Price</td>
                <td>
                  Rs.
                  {particularOrders.reduce(
                    (e, acc) => e + acc.price * acc.quantity,
                    0
                  )}
                  .00/-
                </td>
              </tr>
            </tbody>
            <Button
              onClick={() => {
                setShowSubTable(false);
                setShowMainTable(true);
              }}
            >
              Back
            </Button>
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
    </main>
  );
}

export default AdminDashboard;
