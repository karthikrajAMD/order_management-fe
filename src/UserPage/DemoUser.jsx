import React, { useState } from "react";
import "./demo.css";
import { AddUser, AddEmail, DeleteCartComplete } from "../Redux/cartSystem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
function DemoUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector((item) => item.user.userName);
  const arr = [];
  return (
    <div className="card-user">
      <Card style={{ width: "18rem" }} bg={"info"}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>Name : User 1</Card.Title>
          <Card.Text>Email : user1@gmail.com</Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(AddUser("User 1"));
              dispatch(AddEmail("user1@gmail.com"));
              dispatch(DeleteCartComplete());
              navigate("/shoppage");
            }}
          >
            Select
          </Button>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }} bg={"info"}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>Name : User 2</Card.Title>
          <Card.Text>Email : user2@gmail.com</Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(AddUser("User 2"));
              dispatch(AddEmail("user2@gmail.com"));
              dispatch(DeleteCartComplete());
              navigate("/shoppage");
            }}
          >
            Select
          </Button>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }} bg={"info"}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>Name : User 3</Card.Title>
          <Card.Text>Email : user3@gmail.com</Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(AddUser("User 3"));
              dispatch(AddEmail("user3@gmail.com"));
              dispatch(DeleteCartComplete());
              navigate("/shoppage");
            }}
          >
            Select
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DemoUser;
