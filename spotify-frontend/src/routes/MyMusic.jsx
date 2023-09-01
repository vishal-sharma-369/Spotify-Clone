import React from "react";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import { useState, useEffect } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";

const MyMusic = () => {
  const [songData, setSongData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
      setSongData(response.data);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer currentActiveScreen="mymusic">
      <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
        My Songs
      </div>
      <div className="space-y-3 overflow-auto">
        {songData.map((item) => {
          return <SingleSongCard info={item} playSound={() => {}} />;
        })}
      </div>
    </LoggedInContainer>
  );
};

// const MyMusic = () => {

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

//   useEffect(() => {
//     const getData = async () => {
//       const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
//       setSongData(response.data);
//     };
//     getData();
//   }, []);

//   return (
//     <div className="h-full w-full flex">
//       <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
//         <div>
//           <div className="logoDiv p-6">
//             <img src={spotify_logo} alt="spotify_logo" width={125} />
//           </div>
//           <div className="py-5">
//             <IconText iconName="material-symbols:home" displayText="Home" />
//             <IconText
//               iconName="material-symbols:search-rounded"
//               displayText="Search"
//             />
//             <IconText
//               iconName="icomoon-free:books"
//               displayText="Your Library"
//             />
//             <IconText
//               iconName="material-symbols:library-music-sharp"
//               displayText="My Music"
//               active
//             />
//           </div>
//           <div className="pt-5">
//             <IconText
//               iconName="material-symbols:add-box"
//               displayText="Create Playlist"
//             />
//             <IconText iconName="mdi:cards-heart" displayText="Liked Songs" />
//           </div>
//         </div>
//         <div className="px-5">
//           <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
//             <Icon icon="carbon:earth-europe-africa" />
//             <div className="ml-2 text-sm font-semibold">English</div>
//           </div>
//         </div>
//       </div>

//       {/* This second div will be the right part(main content) */}
//       <div className="h-full w-4/5 bg-app-black overflow-auto">
//         <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
//           <div className="w-1/2 h-full flex">
//             <div className="w-2/3 flex justify-around items-center">
//               <TextWithHover displayText="Premium" />
//               <TextWithHover displayText="Support" />
//               <TextWithHover displayText="Download" />
//               <div className="h-1/2 border-right border-white"></div>
//             </div>
//             <div className="w-1/3 flex justify-around h-full items-center">
//               <TextWithHover displayText="Sign up" />
//               <div className="bg-white w-10 h-10 rounded-full font-semibold cursor-pointer flex items-center justify-center">
//                 VS
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="content p-8  overflow-auto">
//           <div className="text-white text-xl font-semibold pb-4 pl-2">
//             My Songs
//           </div>
//           <div className="space-y-3 overflow-auto">
//             {songData.map((item) => {
//               return <SingleSongCard info={item} playSound={playSound} />;
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default MyMusic;
