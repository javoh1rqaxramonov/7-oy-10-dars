import React, { useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import axios from "axios";
import eye from "../assets/Eye.svg";
import Pagination from "@mui/material/Pagination";

function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`
      )
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  return (
    <div className="max-w-[1920px]">
      <div className="hero">
        <div>
          <div className="mb-[39px] pt-[59px]">
            <h3 className="text-[#87CEEB] font-montserrat font-bold text-[60px] leading-[72px] tracking-[-0.5px] text-center">
              CRYPTOFOLIO WATCH LIST
            </h3>
            <p className="font-montserrat font-medium text-[14px] leading-[21.98px] tracking-[0.1px] text-center text-[#A9A9A9]">
              Get all the Info regarding your favorite Crypto Currency
            </p>
          </div>
        </div>
        <Carousel />
      </div>
      <div className="bg-[#14161A]">
        <div className="mx-auto max-w-[1232px] pb-5">
          <h3 className="text-white pb-3 font-montserrat font-normal text-[34px] leading-[41.99px] tracking-[0.25px] text-center">
            Cryptocurrency Prices by Market Cap
          </h3>
          <input
            type="text"
            className="w-full pt-[25px] pb-5 pl-[14px] border border-white text-white rounded-md text-opacity-70"
            placeholder="Search For a Crypto Currency..."
          />
        </div>
        <div className="mx-auto bg-[#87ceeb] p-[19px] rounded-md max-w-[1232px] flex">
          <h3>Coin</h3>
          <div className="flex justify-between w-[780px]">
            <h3>Price</h3>
            <h3>24h Change</h3>
            <h3>Market Cap</h3>
          </div>
        </div>
        <div className="mx-auto max-w-[1232px]">
          {data.map((value, index) => (
            <div key={index} className="bg-div rounded-b flex">
              <div className="max-w-[445px] w-full p-4 flex items-center gap-x-4 border-b border-[#515151]">
                <img src={value.image} alt="" className="w-[50px]" />
                <div className="flex flex-col">
                  <strong className="uppercase text-white">{value.symbol}</strong>
                  <small className="text-text">{value.name}</small>
                </div>
              </div>
              <div className="max-w-[264px] w-full flex justify-end items-center border-b border-[#515151]">
                <strong className="text-white">
                  ₹{value.atl_change_percentage.toFixed(2)}
                </strong>
              </div>
              <div className="max-w-[260px] w-full flex justify-end pr-10 items-center gap-x-4 border-b border-[#515151]">
                <img src={eye} alt="" />
                <strong
                  className={
                    value.market_cap_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"
                  }
                >
                  {value.market_cap_change_percentage_24h < 0
                    ? value.market_cap_change_percentage_24h.toFixed(2)
                    : `+${value.market_cap_change_percentage_24h.toFixed(2)}`}
                </strong>
              </div>
              <div className="max-w-[263px] w-full flex justify-end items-center px-4 border-b border-[#515151]">
                <strong className="text-white">₹{value.market_cap}M</strong>
              </div>
            </div>
          ))}
            <Pagination
              count={10}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
              className="flex text-blue-600 justify-center mt-5 pb-5"
            />
        </div>
      </div>
    </div>
  );
}

export default Home;
