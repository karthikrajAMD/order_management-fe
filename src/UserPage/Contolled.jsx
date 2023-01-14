import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://wallpaperaccess.com/full/1282257.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Samsung Fold Mobiles</h3>
            <p>Win a chance for international tour!!!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://wallpaperaccess.com/full/1760835.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Vivo new color changing mobile</h3>
            <p>
              Vivo contest buy vivo mobile and win a chance for international
              tour!!!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://wallpaperaccess.com/full/1760852.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Oppo's 200 pixel crystal clear camera </h3>
            <p>win a chance for international tour!!!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
export default ControlledCarousel;
