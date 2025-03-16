import React, { useState } from "react";

function App() {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [flip, setFlip] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const fetchJoke = async () => {
    if (loading) return; // Prevent spam clicking

    setLoading(true);
    setFlip(true); // Start flip animation

    try {
      const res = await fetch("https://jokestream-server.vercel.app/joke");
      const data = await res.json();
      setJoke(data.joke);
    } catch (error) {
      setJoke("Sorry, something went wrong!");
    } finally {
      setTimeout(() => {
        setFlip(false); // End flip animation
        setLoading(false);
      }, 600); // Matches animation duration for smooth effect
    }
  };

  const handleInfoClick = () => {
    setShowInfo(true);
    setTimeout(() => {
      setShowInfo(false);
    }, 3000); // Show tooltip for 2 seconds
  };

  // Dynamically adjust card height based on joke length
  const cardHeight =
    joke.length > 100 ? "min-h-64 p-6" : joke.length > 50 ? "min-h-56 p-5" : "min-h-48 p-4";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-4 relative">
      {/* Instruction Button */}
      <div className="absolute top-4 right-4">
        <button
          className="bg-white text-indigo-700 font-bold rounded-md px-4 py-2 shadow-md hover:bg-gray-200 transition"
          onClick={handleInfoClick}
        >
          ?
        </button>
        {/* Tooltip */}
        <div
          className={`absolute right-0 mt-2 w-56 p-3 bg-white text-gray-700 text-sm rounded-md shadow-lg transition-opacity duration-300 ${
            showInfo ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <p>Click "Get a Joke!" to fetch a random joke.</p>
          <p className="mt-1">Visit the server:</p>
          <a
            href="https://jokestream-server.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Joke API Server
          </a>
        </div>
      </div>

      <h1 className="text-5xl font-extrabold text-center text-white drop-shadow-lg">
        JokeStream
      </h1>
      <p className="text-lg font-light mb-6 text-center text-gray-200 italic">
        Real-Time Joke Fetcher
      </p>

      {/* Button with loading spinner */}
      <button
        className="px-6 py-3 bg-white text-indigo-700 font-bold rounded-md hover:bg-gray-200 transition duration-300 flex items-center justify-center gap-2 shadow-lg"
        onClick={fetchJoke}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="animate-spin h-5 w-5 border-2 border-indigo-700 border-t-transparent rounded-full"></span>
            Loading...
          </>
        ) : (
          "Get a Joke!"
        )}
      </button>

      {/* Card Container */}
      <div className="mt-8">
        <div
          className={`card-container min-w-72 max-w-lg bg-white shadow-lg rounded-lg relative transform-gpu transition-transform duration-500 ${cardHeight} ${
            flip ? "flip" : ""
          }`}
        >
          {/* Front Face */}
          <div
            className={`absolute inset-0 flex items-center justify-center text-center text-gray-800 break-words transition-opacity ${
              flip ? "opacity-0" : "opacity-100"
            }`}
          >
            <p className="text-xl">{joke || 'Press "Get a Joke!"'}</p>
          </div>

          {/* Back Face (Pure White) */}
          <div
            className={`absolute inset-0 bg-white rounded-lg transition-opacity ${
              flip ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
