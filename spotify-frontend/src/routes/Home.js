import React, { useEffect, useState } from "react";
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react";
import TextWithHover from "../components/shared/TextWithHover";
import { makeUnauthenticatedGETRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";

const focusCardsData = [
  {
    title: "Peaceful Piano",
    description: "Relax and indulge with beautiful piano pieces",
    imgUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
    key: 1,
  },
  {
    title: "Deep Focus",
    description: "Keep calm and focus with this music",
    imgUrl:
      "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
    key: 2,
  },
  {
    title: "Instrumental Study",
    description: "Focus with soft study music in the background.",
    imgUrl:
      "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    key: 3,
  },
  {
    title: "Focus Flow",
    description: "Up tempo instrumental hip hop beats",
    imgUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    key: 4,
  },
  {
    title: "Beats to think to",
    description: "Focus with deep techno and tech house",
    imgUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    key: 5,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await makeUnauthenticatedGETRequest(
        "/playlist/get/playlists"
      );
      setCardsData(response);
    };

    getData();
  }, []);

  return (
    <div className="h-full w-full flex">
      <div className="h-full w-1/6 bg-black flex flex-col justify-between pb-10">
        <div>
          <div className="logoDiv p-6">
            <img src={spotify_logo} alt="spotify_logo" width={125} />
          </div>
          <div className="py-5">
            <IconText
              iconName="material-symbols:home"
              displayText="Home"
              targetLink="/home"
              active
            />
            <IconText
              iconName="material-symbols:search-rounded"
              displayText="Search"
              targetLink="/search"
            />
            <IconText
              iconName="icomoon-free:books"
              displayText="Your Library"
              targetLink="/login"
            />
          </div>
          <div className="pt-5">
            <IconText
              iconName="material-symbols:add-box"
              displayText="Create Playlist"
              targetLink="/login"
            />
            <IconText
              iconName="mdi:cards-heart"
              displayText="Liked Songs"
              targetLink="/login"
            />
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
            <div className="w-3/5 flex justify-around items-center">
              <TextWithHover displayText="Premium" />
              <TextWithHover displayText="Support" />
              <TextWithHover displayText="Download" />
              <div className="h-1/2 border-right border-white"></div>
            </div>
            <div className="w-2/5 flex justify-around h-full items-center">
              <TextWithHover
                onClick={() => {
                  navigate("/signup");
                }}
                displayText="Sign up"
              />
              <div
                onClick={() => {
                  navigate("/login");
                }}
                className="bg-white h-2/3 px-8 rounded-full font-semibold cursor-pointer flex items-center justify-center"
              >
                Log in
              </div>
            </div>
          </div>
        </div>
        <div className="content px-8 overflow-auto">
          {/* <PlaylistView titleText="Focus" cardsData={focusCardsData} />
          <PlaylistView
            titleText="Spotify Playlist"
            cardsData={focusCardsData}
          />
          <PlaylistView titleText="Sound of India" cardsData={focusCardsData} /> */}
          {cardsData.map((playlist, index) => (
            <PlaylistView
              key={index}
              titleText={playlist.name}
              cardsData={playlist.songs}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div className="text-white mt-8">
      <div className="text-2xl font-semibold mb-5">{titleText}</div>
      <div
        className={`w-full flex ${
          cardsData.length >= 5 ? "justify-between" : ""
        } space-x-4`}
      >
        {
          // cards data will be an array containing data of different cards
          cardsData.map((item) => {
            return (
              <Card
                key={item.key}
                title={item.name}
                description={item.description}
                imgUrl={item.thumbnail}
              />
            );
          })
        }
      </div>
    </div>
  );
};

const Card = ({ title, description, imgUrl }) => {
  return (
    <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg cursor-pointer">
      <div className="pb-4 pt-2">
        <img
          className="w-full rounded-md h-52 object-cover"
          src={imgUrl}
          alt="label"
        />
      </div>
      <div className="text-white font-semibold py-3">{title}</div>
      {/* <div className="text-gray-500 text-sm">{description}</div> */}{" "}
      {/*I am leaving this for now but i have to correct this later on , The above description part */}
    </div>
  );
};

export default Home;
