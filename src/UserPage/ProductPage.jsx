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
// const data = [
//   {
//     id: "1",
//     name: "Samsung A71",
//     img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1662424294/Croma%20Assets/Communication/Mobiles/Images/224568_dak4bx.png/mxw_640,f_auto",
//     price: "₹34,999.00",
//     pricenum: 34999,
//     productId: 2851279,
//     detail: {
//       ram: "8",
//       storage: "128",
//     },
//   },
//   {
//     id: "2",
//     name: "Samsung A72",
//     img: "https://media.croma.com/image/upload/v1662419980/Croma%20Assets/Communication/Mobiles/Images/233630_bnspi3.png",
//     price: "₹37,999.00",
//     pricenum: 37999,
//     productId: 2851179,
//     detail: {
//       ram: "8",
//       storage: "128",
//     },
//   },
//   {
//     id: "3",
//     name: "Vivo T1 5G",
//     img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1662444951/Croma%20Assets/Communication/Mobiles/Images/248224_ib7nfr.png/mxw_640,f_auto",
//     price: "₹16,990.00",
//     pricenum: 16990,
//     productId: 2851459,
//     detail: {
//       ram: "6",
//       storage: "128",
//     },
//   },
//   {
//     id: "4",
//     name: "Xiaomi 12 pro",
//     img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1662438611/Croma%20Assets/Communication/Mobiles/Images/252192_alzwr6.png/mxw_640,f_auto",
//     price: "₹52,990.00",
//     pricenum: 52990,
//     productId: 2851421,
//     detail: {
//       ram: "8",
//       storage: "256",
//     },
//   },
//   {
//     id: "5",
//     name: "Samsung Galaxy Z Fold4",
//     img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1666100227/Croma%20Assets/Communication/Mobiles/Images/260533_0_vtjpea.png/mxw_640,f_auto",
//     price: "₹154,990.00",
//     pricenum: 154990,
//     productId: 2851409,
//     detail: {
//       ram: "8",
//       storage: "256",
//     },
//   },
//   {
//     id: "6",
//     name: "Realme 10 pro+",
//     img: "https://media.croma.com/image/upload/v1670572026/Croma%20Assets/Communication/Mobiles/Images/265966_10_z76gt6.png",
//     price: "₹25,990.00",
//     pricenum: 25990,
//     productId: 2851229,
//     detail: {
//       ram: "8",
//       storage: "128",
//     },
//   },
//   {
//     id: "7",
//     name: "Motorola Edge 30",
//     img: "https://media.croma.com/image/upload/v1670572026/Croma%20Assets/Communication/Mobiles/Images/265966_10_z76gt6.png",
//     price: "₹28,990.00",
//     pricenum: 28990,
//     productId: 2851679,
//     detail: {
//       ram: "8",
//       storage: "128",
//     },
//   },
//   {
//     id: "8",
//     name: "Realme C31",
//     img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1662437040/Croma%20Assets/Communication/Mobiles/Images/251114_ck8zlj.png/mxw_640,f_auto",
//     price: "₹9,299.00",
//     pricenum: 9299,
//     productId: 2851479,
//     detail: {
//       ram: "3",
//       storage: "32",
//     },
//   },
// ];

function ProductPage() {
  const [data, setData] = useState([]);
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
        {data.map((m, i) => (
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
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
