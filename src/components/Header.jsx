import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-[#14161A] py-3 ">
      <div className="max-w-[1270px] mx-auto flex items-center justify-between text-white">
        <Link to="/" className="text-[#87CEEB] text-xl">CRYPTOFOLIO</Link>
        <div className="flex gap-4 cursor-pointer">
          <select>
            <option>USD</option>
            <option>EUR</option>
            <option>RUB</option>
          </select>

          <button className="cursor-pointer py-2 px-[18px] bg-[#87CEEB] rounded-md text-black ">WATCH LIST</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
