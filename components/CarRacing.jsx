import React, { useEffect, useState } from "react";

const CarRacing = () => {
  const [player, setPlayer] = useState({
    speed: 7,
    score: 0,
    x: 0,
    y: 0,
    start: false,
  });

  const [keys, setKeys] = useState({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  const [roadLines, setRoadLines] = useState([]);
  const [enemyCars, setEnemyCars] = useState([]);

  useEffect(() => {
    setRoadLines(Array.from({ length: 5 }, (_, i) => ({ y: i * 150 })));
  }, []);

  const handleLevelClick = (speed) => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      speed: speed,
    }));
  };

  const startGame = () => {
    const startScreen = document.querySelector(".startScreen");
    const gameArea = document.querySelector(".gameArea");

    startScreen.classList.add("hide");
    gameArea.innerHTML = "";

    setPlayer({
      speed: 7,
      score: 0,
      x: 0,
      y: 0,
      start: true,
    });

    window.requestAnimationFrame(gamePlay);

    for (let i = 0; i < 5; i++) {
      let roadLineElement = document.createElement("div");
      roadLineElement.setAttribute("class", "roadLines");
      roadLineElement.y = i * 150;
      roadLineElement.style.top = roadLineElement.y + "px";
      gameArea.appendChild(roadLineElement);
    }

    let carElement = document.createElement("div");
    carElement.setAttribute("class", "car");
    gameArea.appendChild(carElement);

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      x: carElement.offsetLeft,
      y: carElement.offsetTop,
    }));

    setEnemyCars(Array.from({ length: 3 }, (_, i) => createEnemyCar()));
  };

  const createEnemyCar = () => ({
    y: (Math.random() + 1) * -350,
    color: randomColor(),
    x: Math.floor(Math.random() * 350),
  });

  const randomColor = () => {
    function c() {
      let hex = Math.floor(Math.random() * 256).toString(16);
      return ("0" + String(hex)).substr(-2);
    }
    return "#" + c() + c() + c();
  };

  const onCollision = (a, b) => {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    return !(
      aRect.top > bRect.bottom ||
      aRect.bottom < bRect.top ||
      aRect.right < bRect.left ||
      aRect.left > bRect.right
    );
  };

  const onGameOver = () => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      start: false,
    }));

    const gameStart = new Audio();
    const gameOver = new Audio();
    gameOver.src = "assets/audio/gameOver_theme.mp3";
    gameStart.pause();
    gameOver.play();

    const startScreen = document.querySelector(".startScreen");
    startScreen.classList.remove("hide");
    startScreen.innerHTML = (
      <div>
        Game Over <br />
        Your final score is {player.score} <br />
        Press here to restart the game.
      </div>
    );
  };

  const moveRoadLines = () => {
    setRoadLines((prevRoadLines) =>
      prevRoadLines.map((item) => ({
        ...item,
        y: item.y >= 700 ? item.y - 750 : item.y + player.speed,
      }))
    );

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      y: prevPlayer.y + player.speed,
    }));
  };
  const moveEnemyCars = () => {
    setEnemyCars((prevEnemyCars) =>
      prevEnemyCars.map((item) => {
        if (onCollision(item, document.querySelector(".car"))) {
          onGameOver();
        }
        if (item.y >= 750) {
          return createEnemyCar();
        }
        item.y += player.speed;
        return item;
      })
    );
  };

  const gamePlay = () => {
    const road = document.querySelector(".gameArea").getBoundingClientRect();
    const carElement = document.querySelector(".car");

    if (player.start) {
      moveRoadLines();
      moveEnemyCars();

      if (keys.ArrowUp && player.y > road.top + 70) player.y -= player.speed;
      if (keys.ArrowDown && player.y < road.bottom - 85)
        player.y += player.speed;
      if (keys.ArrowLeft && player.x > 0) player.x -= player.speed;
      if (keys.ArrowRight && player.x < road.width - 70)
        player.x += player.speed;

      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        score: prevPlayer.score + 1,
      }));

      window.requestAnimationFrame(gamePlay);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      setKeys((prevKeys) => ({
        ...prevKeys,
        [e.key]: true,
      }));
    };

    const handleKeyUp = (e) => {
      e.preventDefault();
      setKeys((prevKeys) => ({
        ...prevKeys,
        [e.key]: false,
      }));
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [player, keys]);

  return (
    <div className="carGame">
      <div className="score">Score: {player.score}</div>
      <div
        className={`startScreen ${player.start ? "hide" : ""}`}
        onClick={startGame}
      >
        <p>
          Press here to start. Use Arrow keys to move. If you hit another car,
          you will lose.
        </p>
        <div>
          Select Level
          <span className="level">
            <button id="easy" onClick={() => handleLevelClick(7)}>
              Easy
            </button>
            <button id="moderate" onClick={() => handleLevelClick(10)}>
              Moderate
            </button>
            <button id="difficult" onClick={() => handleLevelClick(14)}>
              Difficult
            </button>
          </span>
        </div>
      </div>
      <div className="gameArea">
        {roadLines.map((element, index) => (
          <div
            key={index}
            className="roadLines"
            style={{ top: element.y + "px" }}
          />
        ))}
        <div
          className="car"
          style={{ top: player.y + "px", left: player.x + "px" }}
        ></div>
        {enemyCars.map((element, index) => (
          <div
            key={index}
            className="enemyCar"
            style={{
              top: element.y + "px",
              backgroundColor: element.color,
              left: element.x + "px",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CarRacing;
