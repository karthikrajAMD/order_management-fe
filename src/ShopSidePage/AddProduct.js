import React, { useContext, useEffect, useState } from "react";
import SidebarDashboard from "../Bars/SidebarDashboard";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
// import * as Yup from "yup";
import { env } from "../environment";
import axios from "axios";
// import { useFormik } from "formik";
import { Context } from "../Context";
function AddProduct() {
  const submit = async (values) => {
    let res = await axios.post(`${env.apiurl}/dailyrecord`, {});
  };
  const [sideShow, setSideShow] = useContext(Context);
  // const [load,setLoad]=useState(())
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [ram, setRam] = useState();
  const [rom, setRom] = useState();
  const PageName = "Add Product";

  const addProducts = async (e) => {
    let x = Math.floor(Math.random() * 1000000 + 1);
    let addProduct = await axios.post(`${env.apiurl}/add-product/add`, {
      name: name,
      img: image,
      brand: brand,
      model: model,
      price: price,
      ram: ram,
      rom: rom,
      productId: model + x,
    });

    if (addProduct.data.statusCode === 200) {
      toast.success(addProduct.data.message);
      setTimeout(() => {
        setName("");
        setImage("");
        setBrand("");
        setModel("");
        setPrice("");
        setQuantity("");
        setRam("");
        setRom("");
      }, 2000);
    } else {
      toast.error(addProduct.data.message);
    }
  };
  return (
    <main className={sideShow ? "space-toggle" : null}>
      <SidebarDashboard name={PageName} role={"admin"} />
      <div className="container">
        <Form className="add-product-form">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Mobile Name "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicBrand">
            <Form.Label>Brand </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Mobile Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicModel">
            <Form.Label>Model No.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Model Number"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price/qty"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRam">
            <Form.Label>RAM</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter RAM"
              value={ram}
              onChange={(e) => setRam(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRom">
            <Form.Label>ROM</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter ROM"
              value={rom}
              onChange={(e) => setRom(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              addProducts();
            }}
          >
            Submit
          </Button>
        </Form>
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
    </main>
  );
}

export default AddProduct;
