import { useEffect } from "react";
import "./WebNewsletter.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../../actions/postActions";
import { Caseth, SocialCard } from "../../../components/Client";

export const WebNewsletter = () => {
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
    <div>
      <Caseth></Caseth>
      <SocialCard></SocialCard>
    </div>
  );
};
