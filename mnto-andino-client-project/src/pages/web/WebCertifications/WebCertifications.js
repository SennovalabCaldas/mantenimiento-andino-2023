import React, { useEffect, useRef, useState } from "react";
import { image } from "../../../assets";
import "./WebCertifications.scss";
import { Photos } from "./Photos";
import { ENV } from "../../../utils";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export const WebCertifications = ({ foundations, allies, clients }) => {
  console.log("foundations", foundations);
  const theme = useTheme();
  console.log("allies", allies);
  const videoRef = useRef(null);
  const baseApi = ENV.BASE_PATH;
  const [currentPage, setCurrentPage] = useState(1);

  const videosPerPage = 5;

  const paginatedVideos = foundations
    .filter((foundation) => foundation.videos && foundation.videos.length > 0)
    .slice((currentPage - 1) * videosPerPage, currentPage * videosPerPage)
    .flatMap((foundation) =>
      foundation.videos.map((video) => ({ foundation, video }))
    );
  const totalVideos = paginatedVideos.length;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const remainingVideos = totalVideos - currentVideoIndex - 1;

  const updateVideoSource = (index) => {
    const { foundation, video } = paginatedVideos[index];
    videoRef.current.src = `${baseApi}/${video}`;
    videoRef.current.play();
  };

  useEffect(() => {
    const [current, imgs] = [
      document.querySelector("#current"),
      document.querySelectorAll(".imgs img"),
    ];
    const opacity = 0.6;
    imgs.forEach((img) => img.addEventListener("click", imgClick));

    function imgClick(e) {
      imgs.forEach((img) => (img.style.opacity = 1));
      current.src = e.target.src;
      current.classList.add("fade-in");
      setTimeout(() => current.classList.remove("fade-in"), 500);
      e.target.style.opacity = opacity;

      const clickedVideoIndex = Array.from(imgs).indexOf(e.target);
      setCurrentVideoIndex(clickedVideoIndex);
      updateVideoSource(clickedVideoIndex);
    }
  }, [paginatedVideos, currentVideoIndex]);

  const handleVideoClick = (videoSrc) => {
    videoRef.current.src = videoSrc;
    videoRef.current.play();
  };

  const handlePreviousClick = () => {
    let newIndex = currentVideoIndex - 1;
    if (newIndex < 0) {
      newIndex = paginatedVideos.length - 1;
    }
    setCurrentVideoIndex(newIndex);
    updateVideoSource(newIndex);
  };

  const handleNextClick = () => {
    let newIndex = currentVideoIndex + 1;
    if (newIndex >= paginatedVideos.length) {
      // Reset index to 0 when reaching the end of the list
      newIndex = 0;
    }
    setCurrentVideoIndex(newIndex);
    updateVideoSource(newIndex);
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
      <div className="slide-text" data-order="1">
        <h2>
          <span className="no-select">MOMENTOS</span>
        </h2>
        <h1>
          {" "}
          <span className="no-select-g">Mantenimiento andino</span>
        </h1>
      </div>
      <div className="decoration-line"></div>
      {foundations.images && foundations.images.length > 0 && (
        <div className="imgs">
          {foundations.images.map((image, index) => (
            <>
              <h2>{`${baseApi}/${image}`}</h2>
              <img
                key={index}
                src={`${baseApi}/${image}`}
                alt="img"
                {...srcset({ img: `${baseApi}/${image}`, size: 200 })}
              />
            </>
          ))}
        </div>
      )}
      <div className="gallery gallery-cards">
        <div className="content panel-certifications">
          <div className="video-container">
            <video
              ref={videoRef}
              controls
              preload="metadata"
              poster={image.videoPoster}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
                margin: "auto",
              }}
            >
              <source src={image.contact1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="card-videos-container">
            {paginatedVideos.map(
              ({ foundation, video }, index) =>
                index === currentVideoIndex && (
                  <Card
                    key={index}
                    sx={{ display: "flex", marginBottom: "10px" }}
                    className="card-videos"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                      }}
                    >
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#000000",
                            opacity: "0.5",
                            textAlign:"center"

                          }}
                          color="text.secondary"
                          component="div"
                        >
                          <strong>Fecha publicación: </strong>{" "}
                          {new Date(foundation.createdAt).toLocaleDateString()}
                        </Typography>
                      </CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          pl: 1,
                          pb: 1,
                        }}
                      >
                        <IconButton aria-label="previous">
                          {theme.direction === "rtl" ? (
                            <SkipNextIcon onClick={handlePreviousClick} />
                          ) : (
                            <SkipPreviousIcon onClick={handleNextClick} />
                          )}
                        </IconButton>
                        <IconButton aria-label="play/pause">
                          <PlayArrowIcon
                            sx={{ height: 30, width: 30 }}
                            onClick={() =>
                              handleVideoClick(`${baseApi}/${video}`)
                            }
                          />
                        </IconButton>
                        <IconButton aria-label="next">
                          {theme.direction === "rtl" ? (
                            <SkipNextIcon onClick={handlePreviousClick} />
                          ) : (
                            <SkipNextIcon onClick={handleNextClick} />
                          )}
                        </IconButton>
                      </Box>
                    </Box>
                    <CardMedia
                      component="video"
                      sx={{
                        width: "45%",
                        objectFit: "cover",
                        objectPosition: "center",
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                      image={`${baseApi}/${video}`}
                      alt="Live from space album cover"
                    />
                  </Card>
                )
            )}
            <div
              style={{
                marginTop: "10px",
                textAlign: "center",
                fontSize: "12px",
              }}
            >
              <p>
                <strong>Total Videos:</strong> {totalVideos} |{" "}
                <strong>Videos por ver:</strong> {remainingVideos}
              </p>
            </div>
            {foundations.images && foundations.images.length > 0 && (
              <div className="pagination">
                {Array.from(
                  {
                    length: Math.ceil(paginatedVideos.length / videosPerPage),
                  },
                  (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={currentPage === i + 1 ? "active" : ""}
                    >
                      {i + 1}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Photos foundations={foundations} allies={allies} clients={clients} />
    </div>
  );
};
