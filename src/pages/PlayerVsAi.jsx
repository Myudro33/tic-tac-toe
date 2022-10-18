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

const PlayerVsAi = () => {
  const mark = localStorage.getItem("mark");
  const [counter, setCounter] = useState(0);
  const [tie, settie] = useState(0);
  const [x, setX] = useState(0);
  const [o, setO] = useState(0);
  const [restart, setRestart] = useState(false);
  const [tieDetector, setTieDetector] = useState(false);
  const [winner, setWinner] = useState("");
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
  const [squares, setSquares] = useState([boxes]);

  const lines = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  useEffect(() => {
    if (mark === "x") {
      const isComputerTurn =
        squares[0].filter((square) => square.value !== "").length % 2 === 1;

      const emptyIndexes = squares[0]
        .map((square, index) => (square.value === "" ? index + 1 : ""))
        .filter((val) => val !== "");

      const putComputerAt = (index) => {
        for (const obj of squares[0]) {
          if (obj.id === index && obj.value === "" && winner === "") {
            setSquares([
              ...squares,
              (obj.value = mark === "x" ? "o" : "x"),
              (obj.hoverValue = ""),
            ]);
            setCounter((prevCounter) => prevCounter + 1);
            for (const method of lines) {
              if (method.includes(obj.id)) {
                if (
                  squares[0][method[0] - 1].value ===
                    squares[0][method[1] - 1].value &&
                  squares[0][method[2] - 1].value ===
                    squares[0][method[1] - 1].value
                ) {
                  setCounter(0);
                  setWinner(squares[0][method[0] - 1].value);
                }
              }
            }
          }
        }
      };
      if (isComputerTurn && winner === "") {
        const randomIndex =
          emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];
        if (randomIndex !== undefined) {
          putComputerAt(randomIndex);
          return;
        } else {
          const randomIndex =
            emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];
          putComputerAt(randomIndex ? randomIndex : emptyIndexes[0]);
          return;
        }
      }
    } else if (mark === "o") {
      const isComputerTurn =
        squares[0].filter((square) => square.value !== "").length % 2 === 0;

      const emptyIndexes = squares[0]
        .map((square, index) => (square.value === "" ? index + 1 : ""))
        .filter((val) => val !== "");

      const putComputerAt = (index) => {
        for (const obj of squares[0]) {
          if (obj.id === index && obj.value === "" && winner === "") {
            setSquares([
              ...squares,
              (obj.value = mark === "x" ? "o" : "x"),
              (obj.hoverValue = ""),
            ]);
            setCounter((prevCounter) => prevCounter + 1);

            for (const method of lines) {
              if (method.includes(obj.id)) {
                if (
                  squares[0][method[0] - 1].value ===
                    squares[0][method[1] - 1].value &&
                  squares[0][method[2] - 1].value ===
                    squares[0][method[1] - 1].value
                ) {
                  setCounter(0);
                  setWinner(squares[0][method[0] - 1].value);
                }
              }
            }
          }
        }
      };
      if (isComputerTurn && winner === "") {
        const randomIndex =
          emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];
        if (randomIndex !== undefined) {
          putComputerAt(randomIndex);
          return;
        } else {
          const randomIndex =
            emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];
          putComputerAt(randomIndex ? randomIndex : emptyIndexes[0]);

          return;
        }
      }
    }
  }, [squares]);

  const handleSquareClick = (index) => {
    const putComputerAt = (ind) => {
      for (const obj of squares[0]) {
        if (obj.id === ind && obj.value === "" && winner === "") {
          setSquares([
            ...squares,
            (obj.value = mark === "x" ? "o" : "x"),
            (obj.hoverValue = ""),
          ]);
          setCounter((prevCounter) => prevCounter + 1);

          for (const method of lines) {
            if (method.includes(obj.id)) {
              if (
                squares[0][method[0] - 1].value ===
                  squares[0][method[1] - 1].value &&
                squares[0][method[2] - 1].value ===
                  squares[0][method[1] - 1].value
              ) {
                setCounter(0);
                setWinner(squares[0][method[0] - 1].value);
              }
            }
          }
        }
      }
    };
    const isPLayerTurn =
      squares[0].filter((square) => square.value !== "").length % 2 === 0;
    if (mark === "x" ? isPLayerTurn : !isPLayerTurn) {
      for (const obj of squares[0]) {
        if (obj.id === index + 1 && obj.value === "") {
          setSquares([
            ...squares,
            (obj.value = mark === "x" ? "x" : "o"),
            (obj.hoverValue = ""),
          ]);
          setCounter((prevCounter) => prevCounter + 1);

          if (winner === "") {
            for (const method of lines) {
              if (method.includes(obj.id) && winner === "") {
                if (
                  // bolo ujra
                  squares[0][method[0] - 1].value === mark &&
                  squares[0][method[1] - 1].value === mark &&
                  squares[0][method[2] - 1].value === ""
                ) {
                  putComputerAt(squares[0][method[2] - 1].id);

                  return;
                } else if (
                  // pirveli ujra
                  squares[0][method[2] - 1].value === mark &&
                  squares[0][method[1] - 1].value === mark &&
                  squares[0][method[0] - 1].value === ""
                ) {
                  putComputerAt(squares[0][method[0] - 1].id);

                  return;
                } else if (
                  // shua ujra
                  squares[0][method[0] - 1].value === mark &&
                  squares[0][method[2] - 1].value === mark &&
                  squares[0][method[1] - 1].value === ""
                ) {
                  putComputerAt(squares[0][method[1] - 1].id);
                  return;
                }
              }

              if (method.includes(obj.id && winner === "")) {
                if (
                  squares[0][method[0] - 1].value ===
                    squares[0][method[1] - 1].value &&
                  squares[0][method[2] - 1].value ===
                    squares[0][method[1] - 1].value
                ) {
                  setCounter(0);
                  setWinner(squares[0][method[0] - 1].value);
                }
              }
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    if (winner === "" && counter !== 9) {
      for (const obj of squares[0]) {
        for (const method of lines) {
          if (method.includes(obj.id) && winner === "") {
            if (
              squares[0][method[0] - 1].value ===
                squares[0][method[1] - 1].value &&
              squares[0][method[2] - 1].value ===
                squares[0][method[1] - 1].value
            ) {
              setWinner(squares[0][method[0] - 1].value);
            }
          }
        }
      }
    }
    if (counter === 9 && winner === "") {
      settie((prevtie) => prevtie + 1);
      setTieDetector(true);
    }
  }, [counter]);

  useEffect(() => {
    if (counter === 9 && winner === "") {
      settie((prevtie) => prevtie + 1);
      setTieDetector(true);
    }
  }, [winner, counter]);
  const hoverMark = (square) => {
    for (const obj of squares[0]) {
      if (square.value === "" && square.id === obj.id) {
        setSquares([...squares, (obj.hoverValue = mark === "x" ? "x" : "o")]);
      }
    }
  };
  const mouseLeaveMark = (square) => {
    for (const obj of squares[0]) {
      if (square.value === "" && square.id === obj.id) {
        setSquares([...squares, (obj.hoverValue = "")]);
      }
    }
  };
  useEffect(() => {
    if (winner === "x") {
      setX((prevx) => prevx + 1);
    } else if (winner === "o") {
      setO((prevO) => prevO + 1);
    }
  }, [winner]);
  const nextRound = () => {
    setWinner("");
    setTieDetector(false);
    setCounter(0);
    setSquares([boxes]);
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[480px] h-[620px] md:p-0 xs:p-4">
        <div className="w-full h-16 flex justify-between items-center px-2">
          <img src={logo} alt="logo" />
          <div className="md:w-[140px] xs:w-[110px] shad md:h-12 mr-4 rounded-md bg-[#1F3641] text-[#A8BFC9] flex justify-center items-center font-[outfit] font-bold">
            {mark === "x" ? (
              <img className="w-5 m-3" src={xSilver} alt="img" />
            ) : (
              <img className="w-5 m-3" src={oSilver} alt="img" />
            )}{" "}
            TURN
          </div>
          <div
            onClick={() => setRestart(true)}
            className="md:w-14 xs:w-10 xs:h-10 md:h-14 cursor-pointer bg-[#A8BFC9] flex justify-center items-center resetButShad rounded-md"
          >
            <img src={reset} alt="restart" />
          </div>
        </div>
        <div className="flex flex-wrap justify-between w-full md:mt-0 xs:mt-7">
          {squares[0].map((square, index) => (
            <div
              onMouseEnter={() => hoverMark(square)}
              onMouseLeave={() => mouseLeaveMark(square)}
              onClick={() => handleSquareClick(index)}
              key={square.id}
              className="md:w-[140px] md:h-[140px] xs:w-24 xs:h-24 rounded-xl bg-[#1F3641] m-2 shad flex justify-center items-center cursor-pointer"
            >
              {square.value === "x" && (
                <img
                  className="md:w-16 md:h-16 xs:w-10 xs:h-10"
                  src={xIcon}
                  alt="img"
                />
              )}
              {square.value === "o" && (
                <img
                  className="md:w-16 md:h-16 xs:w-10 xs:h-10"
                  src={oIcon}
                  alt="imgg"
                />
              )}
              {square.hoverValue === "x" && (
                <img
                  className="md:w-16 md:h-16 xs:w-10 xs:h-10"
                  src={outlineXIcon}
                  alt=""
                />
              )}
              {square.hoverValue === "o" && (
                <img
                  className="md:w-16 md:h-16 xs:w-10 xs:h-10"
                  src={outlineOIcon}
                  alt=""
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex w-full justify-between mt-4">
          <div className="justify-center w-[30%] h-[72px] flex flex-col mx-2 items-center rounded-lg bg-[#31C3BD]">
            <p className="font-[outfit] font-semibold tracking-widest text-sm">
              X{mark === "x" ? "(Player)" : "(CPU)"}
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
              O{mark === "o" ? "(Player)" : "(CPU)"}
            </p>
            <h1 className="font-[outfit] font-bold text-[#1A2A33] text-2xl">
              {o}
            </h1>
          </div>
        </div>
      </div>
      {winner === "x" && (
        <div className="absolute w-full h-screen flex items-center">
          <div className="md:h-[266px] xs:h-[200px] w-full flex flex-col items-center bg-[#1f3641] p-10 justify-between">
            <h2 className="font[outfit] font-bold text-[#a8bfc9]">
              {mark === "x" ? "PLAYER WINS!" : "CPU WINS!"}
            </h2>
            <div className="flex items-center">
              <img
                className="md:w-16 md:h-16 xs:w-10 xs:h-10"
                src={xIcon}
                alt="img"
              />{" "}
              <h1 className="text-[#31c3bd] font-[outfit] font-semibold ml-5 md:text-5xl xs:text-2xl">
                TAKES THE ROUND
              </h1>
            </div>
            <div className="md:mt-0 xs:mt-4">
              <Link to={"/"}>
                <button className="w-[76px] h-[52px] bg-[#a8bfc9] resetButShad rounded-xl font-[outfit] font-semibold text-[#1a2a33]">
                  QUIT
                </button>
              </Link>
              <button
                onClick={nextRound}
                className=" ml-4 w-[152px] h-[52px] bg-[#f2b137] buttonShad2  rounded-xl font-[outfit] font-semibold text-[#1a2a33]"
              >
                NEXT ROUND
              </button>
            </div>
          </div>
        </div>
      )}
      {winner === "o" && (
        <div className="absolute w-full h-screen flex items-center">
          <div className="md:h-[266px] xs:h-[200px] w-full flex flex-col items-center bg-[#1f3641] p-10 justify-between">
            <h2 className="font[outfit] font-bold text-[#a8bfc9]">
              {mark === "o" ? "PLAYER WINS!" : "CPU WINS!"}
            </h2>
            <div className="flex items-center">
              <img
                className="md:w-16 md:h-16 xs:w-10 xs:h-10"
                src={oIcon}
                alt="img"
              />{" "}
              <h1 className="text-[#31c3bd] font-[outfit] font-semibold ml-5 md:text-5xl xs:text-2xl">
                TAKES THE ROUND
              </h1>
            </div>
            <div className="md:mt-0 xs:mt-4">
              <Link to={"/"}>
                <button className="w-[76px] h-[52px] bg-[#a8bfc9] resetButShad rounded-xl font-[outfit] font-semibold text-[#1a2a33]">
                  QUIT
                </button>
              </Link>
              <button
                onClick={nextRound}
                className=" ml-4 w-[152px] h-[52px] bg-[#f2b137] buttonShad2  rounded-xl font-[outfit] font-semibold text-[#1a2a33]"
              >
                NEXT ROUND
              </button>
            </div>
          </div>
        </div>
      )}
      {tieDetector && (
        <div className="absolute w-full h-screen flex items-center">
          <div className="md:h-[266px] xs:h-[200px] w-full flex flex-col items-center bg-[#1f3641] p-16">
            <div className="flex items-center">
              <h1 className="text-[#a8bfc9] font-[outfit] font-semibold ml-5 md:text-5xl xs:text-2xl">
                ROUND TIED!
              </h1>
            </div>
            <div className="mt-5">
              <Link to={"/"}>
                <button className="w-[76px] h-[52px] bg-[#a8bfc9] resetButShad rounded-xl font-[outfit] font-semibold text-[#1a2a33]">
                  QUIT
                </button>
              </Link>
              <button
                onClick={nextRound}
                className=" ml-4 w-[152px] h-[52px] bg-[#f2b137] buttonShad2  rounded-xl font-[outfit] font-semibold text-[#1a2a33]"
              >
                NEXT ROUND
              </button>
            </div>
          </div>
        </div>
      )}
      {restart && (
        <div className="absolute w-full h-screen flex items-center">
          <div className="md:h-[266px] xs:h-[200px] w-full flex flex-col items-center bg-[#1f3641] p-16">
            <div className="flex items-center">
              <h1 className="text-[#a8bfc9] font-[outfit] font-semibold ml-5 md:text-5xl xs:text-2xl">
                RESTART GAME?
              </h1>
            </div>
            <div className="mt-5">
              <button
                onClick={() => setRestart(false)}
                className="md:w-[139px] xs:w-[110px] h-[52px] bg-[#a8bfc9] resetButShad rounded-xl font-[outfit] font-semibold text-[#1a2a33]"
              >
                NO, CANCEL
              </button>
              <Link to={"/"}>
                <button className=" ml-4 md:w-[152px] xs:w-[120px] h-[52px] bg-[#f2b137] buttonShad2  rounded-xl font-[outfit] font-semibold text-[#1a2a33]">
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

export default PlayerVsAi;
