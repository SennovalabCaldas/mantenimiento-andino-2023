import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../../actions/postActions";
import "./WebHome.scss";
import Slider from "react-slick";
import { image } from "../../../assets";
import { NextArrow } from "./NextArrow";
import { PrevArrow } from "./PrevArrow";

export const WebHome = ({ posts }) => {
  console.log(posts);

  const dispatch = useDispatch();
  const [colorIndex, setColorIndex] = useState(0);
  const [imagePreviews, setImagePreviews] = useState([]);

  const backgroundColors = [
    "rgba(95, 161, 222, 0.3)",
    "rgba(222, 95, 161, 0.3)",
    "rgba(161, 222, 95, 0.3)",
  ];

  const defaultVideo = (
    <video controls width="100%" height="auto">
      <source src={image.video1} type="video/mp4" />
    </video>
  );

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const postsConURLCompleta = posts.map((post) => ({
    ...post,
    // avatar: `http://localhost:3100/${post.avatar}`,
    avatar: `http://mantenimientoandino.co/${post.avatar}`,
  }));

  const handleNext = () => {
    setColorIndex((colorIndex + 1) % backgroundColors.length);
  };

  const handlePrev = () => {
    setColorIndex(
      colorIndex === 0 ? backgroundColors.length - 1 : colorIndex - 1
    );
  };

  const Slide = ({ post, nextPost }) => {
    // Convierte la cadena de fecha en un objeto Date
    const fechaCreacion = new Date(post.fecha_creacion);

    const dia = fechaCreacion.getDate();
    const mes = fechaCreacion.getMonth() + 1; // Suma 1 porque los meses comienzan en 0
    const anio = fechaCreacion.getFullYear();
    return (
      <div
        className="post-slide"
        style={{ backgroundImage: `url(http://localhost:3100/${post.avatar})` }}
        // style={{ backgroundImage: `url(http://mantenimientoandino.co/${post.avatar})` }}
        // <img
        //   src={`http://mantenimientoandino.co/${post.avatar}`}
        //   alt={post.titulo}
        // />
      >
        <div className="slide-content">
          <h2 className="slide-title">{post.titulo}</h2>
          <p className="slide-subtitle">{post.subtitulo}</p>
          <div
            className="slide-description"
            dangerouslySetInnerHTML={{ __html: post.descripcion }}
          />
          <p className="slide-creator">Creador: {post.creador}</p>
          <p className="slide-fecha">
            Fecha publicación: {dia}/{mes}/{anio}
          </p>
        </div>
        {post.avatar ? null : (
          <video controls width="100%" height="auto">
            <source src={image.video1} type="video/mp4" />
          </video>
        )}
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <div className="content-section-webhome">
        {posts.length === 0 ? (
          defaultVideo
        ) : (
          <Slider {...settings} className="sliderStyle">
            {posts.map((post, index) => (
              <Slide
                key={post._id}
                post={post}
                nextPost={posts[index + 1]} // Pasa el post siguiente
              />
            ))}
          </Slider>
        )}
      </div>
    </>
  );
};
