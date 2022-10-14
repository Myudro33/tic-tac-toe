import React, { useState } from "react";
import "../App.css";
import logo from "../assets/logo.svg";
import oSilver from "../assets/o-silver.svg";
import xSilver from "../assets/x-silver.svg";
import xBlack from "../assets/x-black.svg";
import oBlack from "../assets/o-black.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const Main = () => {
  const [mark, setmark] = useState("");
  useEffect(() => {
    localStorage.setItem("mark", mark);
  }, [mark]);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <img className="m-10" src={logo} alt="img" />
      <div className="md:w-[450px] xs:w-[90%] md:h-[210px] flex flex-col items-center bg-[#1F3641] shad rounded-lg mb-7">
        <h1 className="text-[#A8BFC9] font-[outfit] font-bold tracking-widest m-5">
          PICK PLAYER 1'S MARK
        </h1>
        <div className="bg-[#1A2A33] w-[90%] h-16 rounded-lg flex justify-between p-2 items-center mt-2">
          <button
            onClick={() => setmark("x")}
            className={`w-[49%] h-full hover:bg-[#A8BFC940] rounded-md flex items-center justify-center ${
              mark === "x" ? "bg-[#A8BFC9] hover:bg-[#a8bfc9]" : "bg-[#1A2A33]"
            } `}
          >
            {mark === "x" ? (
              <img className="w-8" src={xBlack} alt="img" />
            ) : (
              <img className="w-8" src={xSilver} alt="img" />
            )}
          </button>
          <button
            onClick={() => setmark("o")}
            className={`w-[49%] h-full hover:bg-[#A8BFC940] rounded-md flex items-center justify-center ${
              mark === "o" ? "bg-[#a8bfc9] hover:bg-[#a8bfc9]" : "bg-[#1a2a33]"
            }`}
          >
            {mark === "o" ? (
              <img className="w-8" src={oBlack} alt="img" />
            ) : (
              <img className="w-8" src={oSilver} alt="img" />
            )}
          </button>
        </div>
        <h1 className="text-[#6e828b] font-[outfit] tracking-wide text-sm m-5">
          REMEMBER : X GOES FIRST
        </h1>
      </div>
      {mark !== "" ? (
        <>
          <Link
            className="md:w-[450px] xs:w-[90%] h-14 m-2 rounded-lg flex justify-center items-center text-xl font-[outfit] font-bold tracking-widest bg-[#F2B137] buttonShad2 text-[#1A2A33]"
            to={"/playervsai"}
          >
            NEW GAME (VS CPU)
          </Link>
          <Link
            className="md:w-[450px] xs:w-[90%] h-14 m-2 rounded-lg flex justify-center items-center text-xl font-[outfit] font-bold tracking-widest bg-[#31C3BD] buttonShad text-[#1A2A33]"
            to={"/playervsplayer"}
          >
            NEW GAME (VS PLAYER)
          </Link>
        </>
      ) : (
        <>
          <button
            className="md:w-[450px] xs:w-[90%] h-14 m-2 rounded-lg flex justify-center items-center text-xl font-[outfit] font-bold tracking-widest bg-[#F2B137] buttonShad2 text-[#1A2A33]"
            to={"/playervsai"}
          >
            NEW GAME (VS CPU)
          </button>
          <button
            className="md:w-[450px] xs:w-[90%] h-14 m-2 rounded-lg flex justify-center items-center text-xl font-[outfit] font-bold tracking-widest bg-[#31C3BD] buttonShad text-[#1A2A33]"
            to={"/playervsplayer"}
          >
            NEW GAME (VS PLAYER)
          </button>
        </>
      )}
    </div>
  );
};

export default Main;
