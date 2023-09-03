import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../../actions/postActions";
import Carousel from "react-material-ui-carousel";
import "./WebHome.scss";

export const WebHome = ({ posts }) => {
  const dispatch = useDispatch();
  const [colorIndex, setColorIndex] = useState(0);
  const [imagePreviews, setImagePreviews] = useState([]);

  const backgroundColors = [
    "rgba(95, 161, 222, 0.3)",
    "rgba(222, 95, 161, 0.3)",
    "rgba(161, 222, 95, 0.3)",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllPosts());
      } catch (error) {
        console.error("Error al obtener las sedes:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const previews = posts.map((post) => ({
      postId: post._id,
      previewUrl: "http://localhost:4000/" + post.avatar,
    }));
    console.log(previews);
    setImagePreviews(previews);
  }, [posts]);

  const handleNext = () => {
    setColorIndex((colorIndex + 1) % backgroundColors.length);
  };

  const handlePrev = () => {
    setColorIndex(
      colorIndex === 0 ? backgroundColors.length - 1 : colorIndex - 1
    );
  };

  const Slide = ({ post }) => (
    <div
      className="slide-container"
      style={{ backgroundColor: backgroundColors[colorIndex] }}
    >
      <img
        src={
          imagePreviews.find((preview) => preview.postId === post._id)
            ?.previewUrl
        }
        alt="imagen"
        className="slide-image"
      />
      <div className="post-info">
        <h3 className="title">{post.titulo}</h3>
        <p className="subtitle">{post.subtitulo}</p>
        <p className="description">{post.descripcion}</p>
        <p>{post.creador}</p>
        <p>{post.fecha_creacion}</p>
      </div>
    </div>
  );
  return (
    <div className="web-home">
      <Carousel
        animation="slide"
        indicators={false}
        onNext={handleNext}
        onPrev={handlePrev}
      >
        {posts.map((post, index) => (
          <Slide
            key={index}
            post={post}
            colorIndex={colorIndex}
            handleNext={handleNext}
            handlePrev={handlePrev}
            backgroundColors={backgroundColors}
          />
        ))}
      </Carousel>
    </div>
  );
};
