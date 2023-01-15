import React, { useEffect, useState } from "react";
import "./product.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { env } from "../environment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddCart } from "../Redux/cartSystem";
import { toast } from "react-toastify";
import Loading from "../Loading";
function ProductPage() {
  const [data, setData] = useState();
  const loadData = async () => {
    const display = await axios(`${env.apiurl}/add-product/display`);
    if (display.data.statusCode === 200) {
      setData(display.data.myList);

      console.log("displaying product list");
    } else {
      toast.error(display.data.message);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  console.log(data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((item) => item.user);
  return (
    <div className="container">
      <div className="product-list">
        {data ? (
          data.map((m, i) => (
            <>
              <Card key={i} style={{ width: "18rem" }}>
                <Card.Img className="product-image" variant="top" src={m.img} />
                <Card.Body>
                  <Card.Title>{m.name}</Card.Title>
                  <Card.Text>
                    {m.ram}GB RAM / {m.rom}GB ROM
                  </Card.Text>
                  <Button
                    variant="primary"
                    disabled={cart.some((obj) => obj._id === m._id)}
                    onClick={() => {
                      dispatch(AddCart(m));
                    }}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default ProductPage;
