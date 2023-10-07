import React, { Component } from "react";
import {
  cloudinary_cloud_name,
  cloudinary_upload_preset,
} from "../../config.js";

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudinary_cloud_name,
        uploadPreset: cloudinary_upload_preset,
        sources: ["local"],
        multiple: false,
        folder: "My_Music",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const url = result.info.secure_url;
          this.props.setUrl(url);
          this.props.setName(result.info.original_filename);
        } else {
          if (error) {
            alert("cound not upload");
            console.log(error);
          }
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <button
        id="upload_widget"
        className="text-black bg-white rounded-full p-4 font-semibold"
      >
        Select Track
      </button>
    );
  }
}

export default CloudinaryUploadWidget;
