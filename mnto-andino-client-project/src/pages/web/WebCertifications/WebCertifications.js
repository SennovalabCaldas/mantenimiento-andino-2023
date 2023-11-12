import React, { useEffect, useRef } from "react";
import { image } from "../../../assets";
import "./WebCertifications.scss";
import { ENV } from "../../../utils";
import { ImageListItem } from "@mui/material";
import { Photos } from "./Photos";

export const WebCertifications = ({ foundations }) => {
  console.log("foundations", foundations);
  const videoRef = useRef(null);
  const videoSrc1 = image.contact;
  const videoSrc2 = image.contact2;
  const videoSrc3 = image.portafolio_video;

  useEffect(() => {
    const [current, imgs] = [
      document.querySelector("#current"),
      document.querySelectorAll(".imgs img"),
    ];
    const opacity = 0.6;
    imgs.forEach((img) => img.addEventListener("click", imgClick));

    function imgClick(e) {
      imgs.forEach((img) => img.classList.remove("selected"));
      e.target.classList.add("selected");
      current.src = e.target.src;
      current.classList.add("fade-in");
      setTimeout(() => current.classList.remove("fade-in"), 500);
      e.target.style.opacity = opacity;
    }
  }, []);

  const handleVideoClick = (videoSrc) => {
    videoRef.current.src = videoSrc;
    videoRef.current.play();
  };

  function srcset(item) {
    const { img, size, rows = 1, cols = 1 } = item;
    return {
      src: `${img}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${img}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  return (
    <div className="web-certifications">
      <div className="gallery gallery-cards">
        <div className="content panel">
          <div className="video-container">
            <video
              ref={videoRef}
              controls
              preload="metadata" // Precarga solo la información del video (no la reproducción)
              poster={image.videoPoster} // Póster que se muestra antes de que se reproduzca el video
            >
              <source src={image.contact1} type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
            <div className="video-container-imgs">
              <img
                src={image.verVideo1}
                onClick={() => handleVideoClick(videoSrc1)}
              />
              <img
                src={image.verVideo2}
                onClick={() => handleVideoClick(videoSrc2)}
              />
              <img
                src={image.verVideo3}
                onClick={() => handleVideoClick(videoSrc3)}
              />
            </div>
          </div>
        </div>
      </div>

      <Photos foundations={foundations} />
    </div>
  );
};
