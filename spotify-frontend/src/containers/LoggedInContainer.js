import React, { useEffect, useLayoutEffect, useRef } from "react";
import spotify_logo from "../assets/images/spotify-logo-light-green.svg";
import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react";
import TextWithHover from "../components/shared/TextWithHover";
import { useState } from "react";
import { Howl, Howler } from "howler";
import { useContext } from "react";
import songContext from "../contexts/songContext";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
  makeAuthenticatedPUTRequest,
} from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";
import userContext from "../contexts/userContext";

const LoggedInContainer = ({ children, currentActiveScreen }) => {
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
  const { isPaused, soundPlayed, setSoundPlayed, setIsPaused } =
    useContext(songContext);
  const { user, setUser } = useContext(userContext);
  const firstUpdate = useRef(true);
  const navigate = useNavigate();

  const { currentSong, setCurrentSong } = useContext(songContext);

  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;
    const payload = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      payload
    );
    if (response.playlist._id) {
      setAddToPlaylistModalOpen(false);
    }
  };
  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  const changeSound = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!currentSong) return;
    changeSound(currentSong.track);
  }, [currentSong && currentSong.track]);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      e.preventDefault();
      if (e.key === " ") {
        if (!soundPlayed) return;
        else {
          if (isPaused) {
            soundPlayed.play();
            setIsPaused(false);
          } else {
            soundPlayed.pause();
            setIsPaused(true);
          }
        }
      }
    });
  }, [soundPlayed, isPaused, setIsPaused]);

  return (
    <div className="h-full w-full bg-app-black">
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeModal={() => {
            setCreatePlaylistModalOpen(false);
          }}
        />
      )}
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}
      <div className={`w-full ${currentSong ? "h-9/10" : "h-full"} flex`}>
        <div className="h-full w-1/6 bg-black flex flex-col justify-between pb-10">
          <div>
            <div className="logoDiv p-6">
              <img src={spotify_logo} alt="spotify_logo" width={125} />
            </div>
            <div className="py-5">
              <IconText
                iconName="material-symbols:home"
                displayText="Home"
                active={currentActiveScreen === "home"}
                targetLink="/home"
              />
              <IconText
                iconName="material-symbols:search-rounded"
                displayText="Search"
                active={currentActiveScreen === "search"}
                targetLink="/search"
              />
              <IconText
                iconName="icomoon-free:books"
                displayText="Your Library"
                active={currentActiveScreen === "library"}
                targetLink="/library"
              />
              <IconText
                iconName="material-symbols:library-music-sharp"
                displayText="My Music"
                targetLink="/mymusic"
                active={currentActiveScreen === "mymusic"}
              />
            </div>
            <div className="pt-5">
              <IconText
                iconName="material-symbols:upload"
                displayText="Upload Song"
                targetLink="/uploadsong"
                active={currentActiveScreen === "Upload Song"}
              />
              <IconText
                iconName="material-symbols:add-box"
                displayText="Create Playlist"
                onClick={() => {
                  setCreatePlaylistModalOpen(true);
                }}
              />
              <IconText iconName="mdi:cards-heart" displayText="Liked Songs" />
            </div>
          </div>
          <div className="px-5">
            <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
              <Icon icon="carbon:earth-europe-africa" />
              <div className="ml-2 text-sm font-semibold">English</div>
            </div>
          </div>
        </div>

        {/* This second div will be the right part(main content) */}
        <div className="h-full w-5/6 bg-app-black overflow-auto">
          <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
            <div className="w-1/2 h-full flex">
              <div className="w-2/3 flex justify-around items-center">
                <TextWithHover displayText="Premium" />
                <TextWithHover displayText="Support" />
                <TextWithHover displayText="Download" />
              </div>
              <div className="w-1/3 flex justify-around h-full items-center">
                <TextWithHover
                  displayText="Upload Song"
                  onClick={() => {
                    navigate("/uploadsong");
                  }}
                />
                <div
                  className="bg-white w-10 h-10 mx-5 rounded-full font-semibold cursor-pointer flex items-center justify-center"
                  onClick={() => {}}
                >
                  VS
                </div>
              </div>
            </div>
          </div>
          <div className="content px-8 overflow-auto">{children}</div>
        </div>
      </div>

      {/* This div contains the information of the current playing song */}
      {currentSong && (
        <div className="w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4">
          <div className="w-1/4 flex items-center">
            <img
              src={currentSong.thumbnail}
              alt="currentSongThumbnail"
              className="h-14 w-14 rounded"
            />
            <div className="pl-4">
              <div className="text-sm hover:underline cursor-pointer">
                {currentSong.name}
              </div>
              <div className="text-xs text-gray-500 hover:underline cursor-pointer">
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist.lastName}
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center h-full flex-col items-center">
            <div className="flex w-1/3 justify-between items-center">
              {/* controls for the playing song goes here */}
              <Icon
                className="cursor-pointer text-gray-500 hover:text-white"
                fontSize={30}
                icon="jam:shuffle"
              />
              <Icon
                className="cursor-pointer text-gray-500 hover:text-white"
                fontSize={30}
                icon="mingcute:skip-previous-fill"
              />
              <Icon
                className="cursor-pointer text-gray-500 hover:text-white"
                fontSize={50}
                icon={
                  isPaused
                    ? "ic:baseline-play-circle"
                    : "ic:baseline-pause-circle"
                }
                onClick={togglePlayPause}
              />
              <Icon
                className="cursor-pointer text-gray-500 hover:text-white"
                fontSize={30}
                icon="fluent:next-24-filled"
              />
              <Icon
                className="cursor-pointer text-gray-500 hover:text-white"
                fontSize={30}
                icon="mi:repeat"
              />
            </div>
            {/* <div></div> */}
          </div>
          <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
            <Icon
              icon="ic:round-playlist-add"
              className="cursor-pointer text-gray-500 hover:text-white"
              fontSize={30}
              onClick={() => {
                setAddToPlaylistModalOpen(true);
              }}
            />
            {
              // console.log(user.likedSongs)
              console.log(currentSong._id)
            }
            <Icon
              icon={
                user.likedSongs.includes(currentSong._id)
                  ? "mdi:heart"
                  : "ph:heart-bold"
              }
              color="#1ed760"
              fontSize={25}
              className="cursor-pointer text-gray-500 hover:text-white"
              onClick={async () => {
                await makeAuthenticatedPUTRequest(
                  `/song/like/${currentSong._id}`
                );
                const response = await makeAuthenticatedGETRequest("/get/user");
                setUser(response);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedInContainer;
