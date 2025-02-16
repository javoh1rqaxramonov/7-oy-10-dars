import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Chart from "react-apexcharts";

function Details() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => setCoin(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: "7",
          interval: "daily",
        },
      })
      .then((response) => {
        const data = response.data.prices.map((price) => ({
          x: new Date(price[0]),
          y: price[1],
        }));

        setSeries([{ name: "Price", data }]);
      })
      .catch((error) => console.error("Error fetching chart data:", error));
  }, [id]);

  if (!coin) return <p className="text-center text-white">Loading...</p>;

  const options = {
    chart: {
      type: "line",
      height: 350,
      background: "#14161A",
    },
    title: {
      text: `${coin.name} Price Chart`,
      align: "center",
      style: { color: "#fff" },
    },
    xaxis: {
      type: "datetime",
      labels: { style: { colors: "#fff" } },
    },
    yaxis: {
      labels: { style: { colors: "#fff" } },
    },
    tooltip: {
      theme: "dark",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#87CEEB"],
  };

  return (
    <div className="max-w-[1920px] bg-[#14161A] text-white min-h-screen flex justify-center items-start p-10">
      <div className="w-1/3 flex flex-col items-center text-center border-r-2 border-gray-600 pr-10">
        <img src={coin.image.large} alt={coin.name} className="w-[150px] h-[150px]" />
        <h1 className="text-4xl font-bold mt-4">{coin.name}</h1>
        <p className="text-gray-400 mt-4">{coin.description.en?.split(".")[0]}.</p>
        <div className="mt-6 text-left w-full">
          <p className="text-xl flex text-start">
            <strong>Rank:</strong> {coin.market_cap_rank}
          </p>
          <p className="text-2xl mt-2">
            <strong>Current Price:</strong> ${coin.market_data.current_price.usd}
          </p>
          <p className="text-xl mt-2">
            <strong>Market Cap:</strong> ${coin.market_data.market_cap.usd}M
          </p>
        </div>
      </div>

      <div className="w-2/3 flex flex-col pl-3 items-center">
        <div className="w-full p-5 bg-[#1e2128] rounded-lg shadow-lg">
          <Chart options={options} series={series} type="line" height={400} />
        </div>

        <div className="flex gap-4 mt-6">
          <button className="bg-[#87CEEB] text-black px-6 py-2 rounded-md">24 Hours</button>
          <button className="border border-[#87CEEB] text-white px-6 py-2 rounded-md">30 Days</button>
          <button className="border border-[#87CEEB] text-white px-6 py-2 rounded-md">3 Months</button>
          <button className="border border-[#87CEEB] text-white px-6 py-2 rounded-md">1 Year</button>
        </div>
      </div>
    </div>
  );
}

export default Details;
