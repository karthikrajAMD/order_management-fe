import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
function MainPage() {
  return (
    <>
      <Card style={{ width: "30rem" }}>
        <Card.Img
          variant="top"
          src="https://static.vecteezy.com/system/resources/previews/002/127/642/original/smart-phone-on-smooth-dark-blue-background-futuristic-technology-design-illustration-free-vector.jpg"
        />
        <Card.Body>
          <Card.Title>Mobile World</Card.Title>
          <Card.Text>Order Management</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default MainPage;
