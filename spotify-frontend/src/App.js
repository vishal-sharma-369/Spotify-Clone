import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Home from "./routes/Home";
import LoggedInHome from "./routes/LoggedInHome";
import UploadSong from "./routes/UploadSong";
import MyMusic from "./routes/MyMusic";
import { useCookies } from "react-cookie";
import songContext from "./contexts/songContext";
import userContext from "./contexts/userContext";
import { useEffect, useState } from "react";
import Search from "./routes/Search";
import Library from "./routes/Library";
import SinglePlaylist from "./routes/SinglePlaylist";
import { makeAuthenticatedGETRequest } from "./utils/serverHelpers";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [user, setUser] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [cookie, setCookie] = useCookies(["token"]);

  useEffect(() => {
    const getUser = async () => {
      const response = await makeAuthenticatedGETRequest("/get/user");
      setUser(response);
    };
    if (cookie.token)
    getUser();
  }, []);

  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token ? (
          <userContext.Provider value={{ user, setUser }}>
            <songContext.Provider
              value={{
                currentSong,
                setCurrentSong,
                soundPlayed,
                setSoundPlayed,
                isPaused,
                setIsPaused,
              }}
            >
              <Routes>
                <Route path="/home" element={<LoggedInHome />} />
                <Route path="/uploadsong" element={<UploadSong />} />
                <Route path="/mymusic" element={<MyMusic />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
                <Route
                  path="/playlist/:playlistId"
                  element={<SinglePlaylist />}
                />
                <Route path="*" element={<Navigate to="/home" />} />
              </Routes>
            </songContext.Provider>
          </userContext.Provider>
        ) : (
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
