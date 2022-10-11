import React from "react";
import "../App.css";
import { useState } from "react";
import logo from "../assets/logo.svg";
import oSilver from "../assets/o-silver.svg";
import xSilver from "../assets/x-silver.svg";
import reset from "../assets/icon-restart.svg";
import xIcon from "../assets/icon-x.svg";
import oIcon from "../assets/icon-o.svg";
import outlineXIcon from "../assets/icon-x-outline.svg";
import outlineOIcon from "../assets/icon-o-outline.svg";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const PlayerVsPlayer = () => {
  const [turn, setturn] = useState(true);
  const mark = localStorage.getItem("mark");
  const [counter, setCounter] = useState(0);
  const [tie, settie] = useState(0);
  const [x,setX] = useState(0)
  const [o,setO] = useState(0)
  const [restart,setRestart] = useState(false)
  const [tieDetector,setTieDetector] = useState(false)
  const [winner, setWinner] = useState("");
  const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

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
      setCounter(prevcounter=>prevcounter+1)
        setturn((prevTurn) => !prevTurn);
        setarr([
          ...arr,
          ((obj.value = turn ? "x" : "o"), (obj.hoverValue = "")),
        ]);
        for (const method of winningCombinations) {
          if (method.includes(obj.id)) {
            if (
              arr[0][method[0] - 1].value === arr[0][method[1] - 1].value &&
              arr[0][method[2] - 1].value === arr[0][method[1] - 1].value
            ) {
              setCounter(0)
              setWinner(arr[0][method[0] - 1].value);
            }
          }
        }
      }
    }
  };
  useEffect(()=>{
    if(counter===9&&winner===''){
      settie(prevtie=>prevtie+1)
      setTieDetector(true)
    }    
  },[winner,counter])
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
useEffect(()=>{
  if(winner==='x'){
    setX((prevx)=>prevx+1)
  }else if(winner==='o'){
    setO((prevO)=>prevO+1)
  }
},[winner])
const nextRound = () =>{
  setWinner('')
  setturn(true)
  setTieDetector(false)
  setCounter(0)
  for(const obj of arr[0]){
      setarr([...arr,obj.value=''])
  }
}
console.log('winner:',winner,'counter: ',counter,'tie:',tie);
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
          <div onClick={()=>setRestart(true)} className="w-14 h-14 cursor-pointer bg-[#A8BFC9] flex justify-center items-center resetButShad rounded-md">
            <img  src={reset} alt="restart" />
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
              X{mark === "x" ? "(P1)" : "(P2)"}
            </p>
            <h1 className="font-[outfit] font-bold text-[#1A2A33] text-2xl">
              {x}
            </h1>
          </div>
          <div className="justify-center w-[30%] h-[72px] flex flex-col mx-2 items-center rounded-lg bg-[#A8BFC9]">
            <p className="font-[outfit] font-semibold tracking-widest text-sm">
              Ties
            </p>
            <h1 className="font-[outfit] font-bold text-[#1A2A33] text-2xl">
              {tie}
            </h1>
          </div>
          <div className="justify-center w-[30%] h-[72px] flex flex-col mx-2 items-center rounded-lg bg-[#F2B137]">
            <p className="font-[outfit] font-semibold tracking-widest text-sm">
              O{mark === "o" ? "(P1)" : "(P2)"}
            </p>
            <h1 className="font-[outfit] font-bold text-[#1A2A33] text-2xl">
              {o}
            </h1>
          </div>
        </div>
      </div>
      {winner==='x'&&(
      <div className="absolute w-full h-screen flex items-center">
        <div className="h-[266px] w-full flex flex-col items-center bg-[#1f3641] p-10 justify-between">
          <h2 className="font[outfit] font-bold text-[#a8bfc9]">{mark==='x'?'PLAYER 1 WINS!':'PLAYER 2 WINS!'}</h2>
          <div className="flex items-center">
            <img src={xIcon} /> <h1 className="text-[#31c3bd] font-[outfit] font-semibold ml-5 text-5xl">TAKES THE ROUND</h1>
          </div>
          <div>
            <button className="w-[76px] h-[52px] bg-[#a8bfc9] resetButShad rounded-xl font-[outfit] font-semibold text-[#1a2a33]">QUIT</button>
            <button onClick={nextRound} className=" ml-4 w-[152px] h-[52px] bg-[#f2b137] buttonShad2  rounded-xl font-[outfit] font-semibold text-[#1a2a33]" >NEXT ROUND</button>
          </div>
        </div>
      </div>
      )}
      {winner==='o'&&(
      <div className="absolute w-full h-screen flex items-center">
        <div className="h-[266px] w-full flex flex-col items-center bg-[#1f3641] p-10 justify-between">
          <h2 className="font[outfit] font-bold text-[#a8bfc9]">{mark==='o'?'PLAYER 1 WINS!':'PLAYER 2 WINS!'}</h2>
          <div className="flex items-center">
            <img src={oIcon} /> <h1 className="text-[#31c3bd] font-[outfit] font-semibold ml-5 text-5xl">TAKES THE ROUND</h1>
          </div>
          <div>
            <button className="w-[76px] h-[52px] bg-[#a8bfc9] resetButShad rounded-xl font-[outfit] font-semibold text-[#1a2a33]">QUIT</button>
            <button onClick={nextRound} className=" ml-4 w-[152px] h-[52px] bg-[#f2b137] buttonShad2  rounded-xl font-[outfit] font-semibold text-[#1a2a33]" >NEXT ROUND</button>
          </div>
        </div>
      </div>
      )}
      {tieDetector&&(
      <div className="absolute w-full h-screen flex items-center">
        <div className="h-[266px] w-full flex flex-col items-center bg-[#1f3641] p-16">
          <div className="flex items-center">
            <h1 className="text-[#a8bfc9] font-[outfit] font-semibold ml-5 text-5xl">ROUND TIED</h1>
          </div>
          <div className="mt-5">
            <button className="w-[76px] h-[52px] bg-[#a8bfc9] resetButShad rounded-xl font-[outfit] font-semibold text-[#1a2a33]">QUIT</button>
            <button onClick={nextRound} className=" ml-4 w-[152px] h-[52px] bg-[#f2b137] buttonShad2  rounded-xl font-[outfit] font-semibold text-[#1a2a33]" >NEXT ROUND</button>
          </div>
        </div>
      </div>
      )}
      {restart&&(
      <div className="absolute w-full h-screen flex items-center">
        <div className="h-[266px] w-full flex flex-col items-center bg-[#1f3641] p-16">
          <div className="flex items-center">
            <h1 className="text-[#a8bfc9] font-[outfit] font-semibold ml-5 text-5xl">RESTART GAME?</h1>
          </div>
          <div className="mt-5">
            <button onClick={()=>setRestart(false)} className="w-[139px] h-[52px] bg-[#a8bfc9] resetButShad rounded-xl font-[outfit] font-semibold text-[#1a2a33]">NO, CANCEL</button>
            <Link to={'/'} >
            <button  className=" ml-4 w-[152px] h-[52px] bg-[#f2b137] buttonShad2  rounded-xl font-[outfit] font-semibold text-[#1a2a33]">
            YES, RESTART
            </button>
            </Link>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default PlayerVsPlayer;
