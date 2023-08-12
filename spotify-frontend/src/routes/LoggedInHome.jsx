import React from "react";
import LoggedInContainer from "../containers/LoggedInContainer";

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

const LoggedInHome = () => {
  return (
    <LoggedInContainer currentActiveScreen="home">
      <PlaylistView titleText="Focus" cardsData={focusCardsData} />
      <PlaylistView titleText="Spotify Playlist" cardsData={focusCardsData} />
      <PlaylistView titleText="Sound of India" cardsData={focusCardsData} />
    </LoggedInContainer>
  );
};

// const LoggedInHome = () => {
//   const [soundPlayed, setSoundPlayed] = useState(null);
//   const [isPaused, setIsPaused] = useState(false);

//   const playSound = (songSrc) => {
//     if (soundPlayed) {
//       soundPlayed.stop();
//     }
//     let sound = new Howl({
//       src: [songSrc],
//       html5: true,
//     });
//     setSoundPlayed(sound);
//     sound.play();
//   };

//   const pauseSound = () => {
//     soundPlayed.pause();
//   };

//   const togglePlayPause = () => {
//     if (isPaused) {
//       playSound("songurl");
//       setIsPaused(false);
//     } else {
//       pauseSound();
//       setIsPaused(true);
//     }
//   };

//   return (
//     <div className="h-full w-full bg-app-black">
//       <div className="w-full h-9/10 flex">
//         <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
//           <div>
//             <div className="logoDiv p-6">
//               <img src={spotify_logo} alt="spotify_logo" width={125} />
//             </div>
//             <div className="py-5">
//               <IconText
//                 iconName="material-symbols:home"
//                 displayText="Home"
//                 active
//               />
//               <IconText
//                 iconName="material-symbols:search-rounded"
//                 displayText="Search"
//               />
//               <IconText
//                 iconName="icomoon-free:books"
//                 displayText="Your Library"
//               />
//               <IconText
//                 iconName="material-symbols:library-music-sharp"
//                 displayText="My Music"
//               />
//             </div>
//             <div className="pt-5">
//               <IconText
//                 iconName="material-symbols:add-box"
//                 displayText="Create Playlist"
//               />
//               <IconText iconName="mdi:cards-heart" displayText="Liked Songs" />
//             </div>
//           </div>
//           <div className="px-5">
//             <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
//               <Icon icon="carbon:earth-europe-africa" />
//               <div className="ml-2 text-sm font-semibold">English</div>
//             </div>
//           </div>
//         </div>

//         {/* This second div will be the right part(main content) */}
//         <div className="h-full w-4/5 bg-app-black overflow-auto">
//           <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
//             <div className="w-1/2 h-full flex">
//               <div className="w-2/3 flex justify-around items-center">
//                 <TextWithHover displayText="Premium" />
//                 <TextWithHover displayText="Support" />
//                 <TextWithHover displayText="Download" />
//                 <div className="h-1/2 border-right border-white"></div>
//               </div>
//               <div className="w-1/3 flex justify-around h-full items-center">
//                 <TextWithHover displayText="Upload Song" />
//                 <div className="bg-white w-10 h-10 rounded-full font-semibold cursor-pointer flex items-center justify-center">
//                   VS
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="content px-8 overflow-auto">
//             <PlaylistView titleText="Focus" cardsData={focusCardsData} />
//             <PlaylistView
//               titleText="Spotify Playlist"
//               cardsData={focusCardsData}
//             />
//             <PlaylistView
//               titleText="Sound of India"
//               cardsData={focusCardsData}
//             />
//           </div>
//         </div>
//       </div>

//       {/* This div contains the information of the current playing song */}
//       <div className="w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4">
//         <div className="w-1/4 flex items-center">
//           <img
//             src="https://source.unsplash.com/random"
//             alt="currentSongThumbnail"
//             className="h-14 w-14 rounded"
//           />
//           <div className="pl-4">
//             <div className="text-sm hover:underline cursor-pointer">
//               Curtains
//             </div>
//             <div className="text-xs text-gray-500 hover:underline cursor-pointer">
//               Ed Sheeran
//             </div>
//           </div>
//         </div>
//         <div className="w-1/2 flex justify-center h-full flex-col items-center">
//           <div className="flex w-1/3 justify-between items-center">
//             {/* controls for the playing song goes here */}
//             <Icon
//               className="cursor-pointer text-gray-500 hover:text-white"
//               fontSize={30}
//               icon="jam:shuffle"
//             />
//             <Icon
//               className="cursor-pointer text-gray-500 hover:text-white"
//               fontSize={30}
//               icon="mingcute:skip-previous-fill"
//             />
//             <Icon
//               className="cursor-pointer text-gray-500 hover:text-white"
//               fontSize={50}
//               icon={
//                 isPaused
//                   ? "ic:baseline-play-circle"
//                   : "ic:baseline-pause-circle"
//               }
//               onClick={togglePlayPause}
//             />
//             <Icon
//               className="cursor-pointer text-gray-500 hover:text-white"
//               fontSize={30}
//               icon="mingcute:skip-next-fill"
//             />
//             <Icon
//               className="cursor-pointer text-gray-500 hover:text-white"
//               fontSize={30}
//               icon="mi:repeat"
//             />
//           </div>
//           {/* <div></div> */}
//         </div>
//         <div className="w-1/4 flex justify-end"></div>
//       </div>
//     </div>
//   );
// };

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div className="text-white mt-8">
      <div className="text-2xl font-semibold mb-5">{titleText}</div>
      <div className="w-full flex justify-between space-x-4">
        {
          // cards data will be an array containing data of different cards
          cardsData.map((item) => {
            return (
              <Card
                title={item.title}
                description={item.description}
                imgUrl={item.imgUrl}
                key={item.key}
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
    <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg">
      <div className="pb-4 pt-2">
        <img className="w-full rounded-md h-52" src={imgUrl} alt="label" />
      </div>
      <div className="text-white font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

export default LoggedInHome;
