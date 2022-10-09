import React from "react";
import "../App.css";
import { useState } from "react";
import logo from "../assets/logo.svg";
import oSilver from "../assets/o-silver.svg";
import xSilver from "../assets/x-silver.svg";
import restart from "../assets/icon-restart.svg";
import xIcon from "../assets/icon-x.svg";
import oIcon from "../assets/icon-o.svg";
import outlineXIcon from "../assets/icon-x-outline.svg";
import outlineOIcon from "../assets/icon-o-outline.svg";

const PlayerVsPlayer = () => {
  const mark = localStorage.getItem("mark");
  const [turn, setturn] = useState(true);

  const boxes = [
    {
      id: 1,
      value: "",
      hoverValue: "",
    },
    {
      id: 2,
      value: "",
      hoverValue: "",
    },
    {
      id: 3,
      value: "",
      hoverValue: "",
    },
    {
      id: 4,
      value: "",
      hoverValue: "",
    },
    {
      id: 5,
      value: "",
      hoverValue: "",
    },
    {
      id: 6,
      value: "",
      hoverValue: "",
    },
    {
      id: 7,
      value: "",
      hoverValue: "",
    },
    {
      id: 8,
      value: "",
      hoverValue: "",
    },
    {
      id: 9,
      value: "",
      hoverValue: "",
    },
  ];
  const [arr, setarr] = useState([boxes]);
  const enterMark = (box) => {
    for (const obj of arr[0]) {
      if (box.id === obj.id && box.value === "") {
        setturn((prevTurn) => !prevTurn);
        setarr([
          ...arr,
          ((obj.value = turn ? "x" : "o"), (obj.hoverValue = "")),
        ]);
      }
    }
  };

  const hoverMark = (box) => {
    for (const obj of arr[0]) {
      if (box.value === "" && box.id === obj.id) {
        setarr([...arr, (obj.hoverValue = turn ? "x" : "o")]);
      }
    }
  };
  const mouseLeaveMark = (box) => {
    for (const obj of arr[0]) {
      if (box.value === "" && box.id === obj.id) {
        setarr([...arr, (obj.hoverValue = "")]);
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[480px] h-[620px]">
        <div className="w-full h-16 flex justify-between items-center px-2">
          <img src={logo} alt="logo" />
          <div className="w-[140px] shad h-12 mr-4 rounded-md bg-[#1F3641] text-[#A8BFC9] flex justify-center items-center font-[outfit] font-bold">
            {turn ? (
              <img className="w-5 m-3" src={xSilver} alt="img" />
            ) : (
              <img className="w-5 m-3" src={oSilver} alt="img" />
            )}{" "}
            TURN
          </div>
          <div className="w-14 h-14 bg-[#A8BFC9] flex justify-center items-center resetButShad rounded-md">
            <img className="" src={restart} alt="restart" />
          </div>
        </div>
        <div className="flex flex-wrap justify-between w-full">
          {arr[0].map((box) => (
            <div
              onClick={() => enterMark(box)}
              onMouseEnter={() => hoverMark(box)}
              onMouseLeave={() => mouseLeaveMark(box)}
              key={box.id}
              className="w-[140px] h-[140px] rounded-xl bg-[#1F3641] m-2 shad flex justify-center items-center cursor-pointer"
            >
              {box.value === "x" && <img src={xIcon} alt="xicon" />}
              {box.value === "o" && <img src={oIcon} alt="oicon" />}
              {box.hoverValue === "x" && (
                <img src={outlineXIcon} alt="xoutline" />
              )}
              {box.hoverValue === "o" && (
                <img src={outlineOIcon} alt="xoutline" />
              )}
            </div>
          ))}
        </div>
        <div className="flex w-full justify-between mt-4">
          <div className="justify-center w-[30%] h-[72px] flex flex-col mx-2 items-center rounded-lg bg-[#31C3BD]">
            <p className="font-[outfit] font-semibold tracking-widest text-sm">
              X(P2)
            </p>
            <h1 className="font-[outfit] font-bold text-[#1A2A33] text-2xl">
              12
            </h1>
          </div>
          <div className="justify-center w-[30%] h-[72px] flex flex-col mx-2 items-center rounded-lg bg-[#A8BFC9]">
            <p className="font-[outfit] font-semibold tracking-widest text-sm">
              Ties
            </p>
            <h1 className="font-[outfit] font-bold text-[#1A2A33] text-2xl">
              10
            </h1>
          </div>
          <div className="justify-center w-[30%] h-[72px] flex flex-col mx-2 items-center rounded-lg bg-[#F2B137]">
            <p className="font-[outfit] font-semibold tracking-widest text-sm">
              O(P1)
            </p>
            <h1 className="font-[outfit] font-bold text-[#1A2A33] text-2xl">
              16
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerVsPlayer;
