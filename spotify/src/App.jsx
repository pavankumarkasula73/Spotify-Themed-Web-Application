import React from "react";
import { FaSpotify } from "react-icons/fa6";
import axios from "axios";
import { useState } from "react";

function App() {
  const [URL, setURL] = useState("");
  const handleURL = (e) => {
    e.preventDefault();
    setURL(e.target.value);
  };

  const downloadsong = async () => {
    setURL("");
    const options = {
      method: "GET",
      url: "https://spotify-downloader9.p.rapidapi.com/downloadSong",
      params: {
        songId: URL,
      },
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
        "x-rapidapi-host": "spotify-downloader9.p.rapidapi.com",
      },
    };
    try {
      const rspn = await axios.request(options);
      console.log(rspn.data.data.downloadLink);
      window.location.href = rspn.data.data.downloadLink;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 flex items-center justify-center flex-col gap-y-5">
      <div className="flex items-center justify-center gap-x-2 text-3xl font-extrabold text-green-400">
        <FaSpotify size={50} />
        <p>Spotify Downloader</p>
      </div>
      <div className="flex gap-x-2">
        <input
          type="url"
          className="h-12 w-[450px] border-none outline-none px-5 rounded-lg text-black"
          placeholder="Enter Spotify Song URL"
          onChange={handleURL}
          value={URL}
        />
        <button
          className="bg-green-500 h-12 px-5 rounded-lg font-bold text-white hover:bg-green-400 active:bg-green-600 transition duration-300"
          onClick={downloadsong}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default App;
