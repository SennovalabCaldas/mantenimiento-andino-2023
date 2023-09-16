import React, { useEffect } from "react";
import { Caseth, SocialCard } from "../../../components/Client";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllPosts } from "../../../actions/postActions";
import "./WebFundation.scss";

export const WebFundation = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.allPosts);

  // Se ejecutará cada vez que dispatch cambie
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

  // Verifica si sedes es undefined antes de mapear
  if (posts === undefined) {
    return <div>Cargando</div>; // Muestra un mensaje de carga mientras esperas los datos
  }
  return (
    <div className="fundation-section">
      <div className="left-news-section">
        <Caseth></Caseth>
      </div>
      <div className="content-news-section">
        <div className="card-container">
          <SocialCard></SocialCard>
        </div>
      </div>
    </div>
  );
};
