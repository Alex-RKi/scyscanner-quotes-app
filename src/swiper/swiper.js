import React from "react";
import Swiper from "react-id-swiper";
import "swiper/swiper.scss";

import pic from "./1.png";
import pic2 from "./2.png";
import pic3 from "./3.png";
import pic4 from "./4.png";

const SwiperUnfixed = () => {
  const params = {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: false,
    },
  };
  return (
    <Swiper {...params}>
      <div>
        <img src={pic} alt="Destination pic" />
      </div>
      <div>
        <img src={pic2} alt="Destination pic" />
      </div>
      <div>
        <img src={pic3} alt="Destination pic" />
      </div>
      <div>
        <img src={pic4} alt="Destination pic" />
      </div>
      <div>
        <img src={pic4} alt="Destination pic" />
      </div>
      <div>
        <img src={pic4} alt="Destination pic" />
      </div>
    </Swiper>
  );
};
export default SwiperUnfixed;
