import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mapa } from "../../../components/GeneralLayout";
import "./WebSedes.scss";
import { getAllSedes } from "../../../actions/sedesActions";
import { Loading } from "../../../components/Shared";
import { makeStyles } from "@material-ui/core/styles";

export const WebSedes = () => {
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
    <div className="content-web-section">
      <Mapa departamentos={departamentosSinDuplicados} />
    </div>
  );
};
