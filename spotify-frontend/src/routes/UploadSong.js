import { useCallback, useMemo, useState } from "react";
import React from "react";
import TextInput from "../components/shared/TextInput";
import CloudinaryUploadWidget from "../components/shared/CloudinaryUploadWidget";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";

const UploadSong = () => {
  const [name, setName] = useState("tvari-hawaii");
  const [thumbnail, setThumbnail] = useState("https://source.unsplash.com/tvari-hawaii");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState("");
  const navigate = useNavigate();

  const submitSong = useCallback(async () => {
    const data = { name, thumbnail, track: playlistUrl };

    const response = await makeAuthenticatedPOSTRequest("/song/create", data);
    if (response.err) {
      alert("Cound not create song");
      return;
    } else {
      alert("Success");
      navigate("/home");
    }
  },[name , thumbnail,playlistUrl]);

  const cloudinaryWidget = useMemo(()=>
  {
    return (
      <div className="py-5">
        {uploadedSongFileName ? (
          <div className="bg-white rounded-full p-3 w-1/3">
            {uploadedSongFileName.substring(0, 35)}...
          </div>
        ) : (
          <CloudinaryUploadWidget
            setUrl={setPlaylistUrl}
            setName={setUploadedSongFileName}
          />
        )}
      </div>
    )
  },[playlistUrl , uploadedSongFileName])

  return (
      <LoggedInContainer currentActiveScreen="Upload Song">
        <div className="content p-8 overflow-auto">
          <div className="text-2xl font-semibold mb-5 text-white mt-8">
            Upload Your Music
          </div>
          <div className="w-2/3 flex space-x-3">
            <div className="w-1/2">
              <TextInput
                label="Name"
                placeholder="Name"
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                label="Thumbnail"
                placeholder="Thumbnail"
                value={thumbnail}
                setValue={setThumbnail}
              />
            </div>
          </div>
          {cloudinaryWidget}
          <div
            className="bg-white w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold"
            onClick={submitSong}
          >
            Submit Song
          </div>
      </div>
    </LoggedInContainer>
  );
};

export default UploadSong;
