import logo from "./logo.svg";
import "./App.css";

import React, { useState, useEffect, useRef } from "react";
import BuyMeACoffee from "./components/BuyMeACoffee";

function App() {
  const [intervalTime, setIntervalTime] = useState(60); // 60 seconds default
  const [sessionTime, setSessionTime] = useState(300); // 5 minutes default (300 seconds)
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const audioRef = React.useRef(new Audio("/single-bell.wav"));

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (elapsedTime > 0 && elapsedTime % intervalTime === 0) {
      playBell();
    }
    if (elapsedTime >= sessionTime) {
      playEndSessionBells();
      setIsRunning(false);
    }
  }, [elapsedTime, intervalTime, sessionTime]);

  const initializeAudio = () => {
    audioRef.current
      .play()
      .then(() => {
        setAudioInitialized(true); // Update state if playback starts successfully
        console.log("Audio initialized successfully.");
      })
      .catch((error) => {
        console.error("Failed to initialize audio:", error);
        alert(
          "Unable to play audio. Please check your settings or ensure you've interacted with the page."
        );
      });
  };

  const playBell = () => {
    if (audioInitialized) {
      audioRef.current.play().catch((error) => {
        console.error("Failed to play bell:", error);
        alert("Unable to play bell sound.");
      });
    } else {
      alert("Please initialize the audio first by clicking the button.");
    }
  };

  const playEndSessionBells = () => {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const audio = new Audio("/end-bell.wav"); // Add your end bell sound file to the public folder
        audio.play();
        if (navigator.vibrate) {
          navigator.vibrate([200, 100, 200]); // Vibrate pattern
        }
      }, i * 1000);
    }
  };

  const resetTimer = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  return (
    <div className="App">
      <h1>Interval Timer</h1>
      <div>
        <label>Interval Time (seconds): </label>
        <input
          type="number"
          value={intervalTime}
          onChange={(e) => setIntervalTime(Number(e.target.value))}
          min="10"
          max="300"
        />
      </div>
      <div>
        <label>Session Time (minutes): </label>
        <select
          value={sessionTime}
          onChange={(e) => setSessionTime(Number(e.target.value) * 60)}
        >
          <option value="300">5</option>
          <option value="600">10</option>
          <option value="900">15</option>
        </select>
      </div>
      <div>
        <button onClick={initializeAudio}>Initialize Audio</button>
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div>
        <h2>
          Elapsed Time: {Math.floor(elapsedTime / 60)}m {elapsedTime % 60}s
        </h2>
      </div>
      <div>
        Found this useful? Consider buying me a coffee for more microsites like
        this:
        <br /> <BuyMeACoffee />
      </div>
    </div>
  );
}

export default App;
