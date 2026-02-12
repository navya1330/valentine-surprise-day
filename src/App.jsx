import Confetti from "react-confetti";
import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const musicRef = useRef(null);

const playMusic = () => {
  if (musicRef.current) {
    musicRef.current.src =
      "https://www.youtube.com/embed/GxldQ9eX2wo?autoplay=1&loop=1&playlist=GxldQ9eX2wo";
  }
};

  const [page, setPage] = useState(1);
  const [fill, setFill] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [stage, setStage] = useState("normal");
  const [showBalloons, setShowBalloons] = useState(false);

  // normal → dudu → bubu → accept → hug → dance → live

  const startFilling = () => {
  if (intervalId || stage !== "normal") return;

  const id = setInterval(() => {
    setFill((prev) => {
      if (prev >= 100) {
        clearInterval(id);
        setStage("bubu");   // important: not live
        return 100;
      } else {
        return prev + 2;
      }
    });
  }, 50);

  setIntervalId(id);
};


  const stopFilling = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  // Stage transitions
  useEffect(() => {
    if (stage === "dudu") {
      setTimeout(() => setStage("bubu"), 2500);
    }

    if (stage === "bubu") {
      setTimeout(() => setStage("accept"), 2500);
    }

    if (stage === "accept") {
      setTimeout(() => setStage("hug"), 3000);
    }

    if (stage === "hug") {
      setTimeout(() => setStage("dance"), 3000);
    }

    if (stage === "dance") {
      setTimeout(() => setStage("live"), 3000);
    }
    if (stage === "live") {
  playMusic();
}

  }, [stage]);

 return (
  <>
  {showBalloons && (
  <div className="balloons">
    {Array.from({ length: 30 }).map((_, i) => {
      const emojis = ["🎈", "💖"];
      return (
        <span
          key={i}
          className="emojiBalloon"
          style={{
            left: Math.random() * 100 + "vw",
            animationDuration: 6 + Math.random() * 6 + "s",
            fontSize: 20 + Math.random() * 20 + "px"
          }}
        >
          {emojis[Math.floor(Math.random() * emojis.length)]}
        </span>
      );
    })}
  </div>
)}


     <iframe
  ref={musicRef}
  width="0"
  height="0"
  style={{ display: "none" }}
  allow="autoplay"
/>


    <div className="container">
      {page === 1 && (
        <>
          <h1 className="title">Will you be my Valentine? ❤️</h1>
          <div className="buttons">
            <button
  className="yes"
  onClick={() => {
    setPage(2);
    setShowBalloons(true);
  }}
>
  Yes 💖
</button>

            <button className="no">No 🙈</button>
          </div>
        </>
      )}

      {page === 2 && (
        <>
          {stage === "live" && (
            <div className="balloonContainer">
              <span className="balloon">🎈</span>
              <span className="balloon">🎈</span>
              <span className="balloon">🎈</span>
              <span className="balloon">🎈</span>
              <span className="balloon">🎈</span>
            </div>
          )}

          {stage !== "normal" && <Confetti />}

         {stage === "normal" && (
  <>
    <img src="/dudu.png" className="mainImg" />

    <h2 className="holdText">Then hold my heart 💗</h2>

    <div
      className="heart"
      onPointerDown={startFilling}
      onPointerUp={stopFilling}
      onPointerLeave={stopFilling}
    >
      ❤️
    </div>

    <div className="box">
      <div
        className="fill"
        style={{ height: `${fill}%` }}
      ></div>
    </div>
  </>
)}



          {stage === "bubu" && (
            <img src="/bubu.png" className="mainImg" />
          )}

          {(stage === "accept" ||
            stage === "hug" ||
            stage === "dance" ||
            stage === "live") && (
            <>
              {stage === "accept" && (
                <img src="/accept.gif" className="mainImg" />
              )}
              {stage === "hug" && (
                <img src="/hug.gif" className="mainImg" />
              )}
              {stage === "dance" && (
                <img src="/dance.gif" className="mainImg" />
              )}
              {stage === "live" && (
                <img src="/live.gif" className="mainImg" />
              )}

              <div className="loveText">
                <h2>You’ve had my heart forever ❤️</h2>
                <h3>
                  Happy Valentine’s Day My Love #kannalu Forever 💖
                </h3>
              </div>
            </>
          )}
        </>
      )}
    </div>
  </>
);

}

export default App;








