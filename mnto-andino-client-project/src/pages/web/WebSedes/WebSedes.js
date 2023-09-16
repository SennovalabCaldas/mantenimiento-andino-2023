import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mapa } from "../../../components/GeneralLayout";
import "./WebSedes.scss";
import { getAllSedes } from "../../../actions/sedesActions";
import { Loading } from "../../../components/Shared";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 300,
    margin: theme.spacing(2),
    boxShadow: theme.shadows[3],
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: theme.shadows[8],
    },
  },
  media: {
    height: 200,
  },
  iconButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
}));

export const WebSedes = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const sedesData = useSelector((state) => state.sede.allSedes);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getAllSedes());
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // Verificar si sedesData contiene el array de sedes
  if (!sedesData || !sedesData.sedes || !Array.isArray(sedesData.sedes)) {
    return <Loading />; // Puedes mostrar un indicador de carga o mensaje de error mientras se obtienen los datos
  }

  // Filtrar los nombres de los departamentos sin duplicados
  const departamentosSinDuplicados = Array.from(
    new Set(sedesData.sedes.map((sede) => sede.direccion.departamento))
  );

  return (
    <div className="content-section-websedes">
      <Mapa departamentos={departamentosSinDuplicados} />
    </div>
  );
};
