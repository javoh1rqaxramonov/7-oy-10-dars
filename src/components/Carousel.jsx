import React from "react";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import axios from "axios";

function Carousel() {
  let [sliderData, SetSliderData] = useState([]);

  useEffect(function () {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
      )
      .then((response) => {
        if (response.status == 200) {
          return SetSliderData(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={`w-[1270px] mx-auto `}>
      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        centeredSlides={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {sliderData.length > 0 &&
          sliderData.map((value, index) => {
            return (
              <SwiperSlide
                key={index}
                className=" flex justify-center items-center"
              >
                <div className="text-center w-full">
                  <img className="w-20 h-20 mx-auto" src={value.image} alt="" />
                  <div className="flex justify-center gap-1">
                    <p className="justify-center flex text-white">
                      {value.symbol.toUpperCase()}
                    </p>
                    <p className="text-[red]">
                      {value.ath_change_percentage.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-white text-xl">{value.price_change_24h}</p>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}

export default Carousel;
