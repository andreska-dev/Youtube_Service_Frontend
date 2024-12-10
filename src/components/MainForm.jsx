import { useState } from "react";
import { Loader } from "./Loader";

// service url
const apiUrl = "https://youtube-x5xf.onrender.com/playlist-duration";
// example link
const exampleLink =
  "https://www.youtube.com/watch?v=&list=PLiqawIDqV1hJ1N2XfxMw5Zq0am2wIvZAk";

//function to extract playlist id from url
const extractPlaylistId = (url) => {
  const urlParams = new URLSearchParams(url);
  const playlistId = urlParams.get("list");
  return playlistId;
};

// fetch function
const fetchPlaylistDuration = async (id) => {
  const response = await fetch(`${apiUrl}?playlistId=${id}`);
  const data = await response.json();
  return data;
};

export const MainForm = () => {
  //console.log("MainForm component mounted");
  //url hook
  const [playlistUrl, setPlaylistUrl] = useState(exampleLink);
  //duration hook
  const [duration, setDuration] = useState(null);
  //is loading hook
  const [isLoading, setIsLoading] = useState(false);
  // Error state
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    // prevent default form submission
    e.preventDefault();
    // set loading to true
    setIsLoading(true);
    // extract playlist id
    const playlistId = extractPlaylistId(playlistUrl);
    console.log(playlistId);
    // fetch playlist duration
    try {
      const data = await fetchPlaylistDuration(playlistId);
      setDuration(data.duration);
      console.log(data);
    } catch (error) {
      setError(err.message);
    } finally {
      // set loading to false
      setIsLoading(false);
    }
  };

  return (
    <section className="flex w-full items-center justify-center pt-8">
      <article className="w-auto p-4 m-4 bg-gray-700 items-center justify-center flex rounded-md">
        <div className="flex flex-col items-center justify-center gap-y-4">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex-row py-2">
              <label
                htmlFor="playlistUrl"
                className="px-2 font-mono mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Playlist Url:
              </label>
              <input
                className="md:w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                id="playlistUrl"
                name="playlistUrl"
                placeholder="https://www.youtube.com/watch?v=&list=PLiqawIDqV1hJ1N2XfxMw5Zq0am2wIvZAk"
                value={playlistUrl !== exampleLink ? playlistUrl : ""}
                onChange={(e) => setPlaylistUrl(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="font-mono focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Submit
            </button>
          </form>
          {/* Loader */}
          {isLoading && <Loader />}
          {/* Error Message */}
          {error && <p className="text-red-500 font-mono">Error: {error}</p>}
          {/* Duration */}
          {duration && (
            <p className="text-white font-mono">
              Playlist Duration: {duration}
            </p>
          )}
        </div>
      </article>
    </section>
  );
};
