import React, { useEffect, useRef } from "react";
import { image } from "../../../assets";
import "./WebCertifications.scss";
import { ENV } from "../../../utils";

export const WebCertifications = ({ certifications }) => {
  console.log("certifications", certifications);
  const baseApi = ENV.BASE_PATH;
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

  return (
    <div className="web-certifications">
      <div className="gallery gallery-cards">
        <div className="content panel">
          <div className="video-container">
            <video
              ref={videoRef}
              controls // Muestra los controles del reproductor (play, pausa, volumen, etc.)
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

      <div className="slide-photos">
        <div className="container">
          <div className="main-img">
            <img src={image.img1services} id="current" />
          </div>

          <div className="imgs">
            {certifications.map((cert, index) => (
              <div key={index}>
                {cert.photos.map((photo, photoIndex) => (
                  <img
                    key={photoIndex}
                    src={`${baseApi}/${photo}`}
                    alt={`${cert.name} - Foto ${photoIndex + 1}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="slide" data-order="1">
          <h1>
            {" "}
            <span className="no-select-g">construimos</span>
          </h1>
          <h2
            style={{
              color: "#F5A623",
            }}
          >
            <span>felicidad, sueños y experiencias.</span>
          </h2>
        </div>
      </div>
    </div>
  );
};
