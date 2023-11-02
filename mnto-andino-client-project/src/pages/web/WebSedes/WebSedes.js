import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./WebSedes.scss";
import { getAllSedes } from "../../../actions/sedesActions";
import { Loading } from "../../../components/Shared";
import { BackToMntoAndino } from "../../../components/Client/BackToMntoAndino/BackToMntoAndino";
import { image } from "../../../assets";
import { Card, CardContent } from "@mui/material";
import Footer from "../../../components/Shared/Footer/Footer";

export const WebSedes = () => {
  const dispatch = useDispatch();
  const sedesData = useSelector((state) => state.sede.allSedes);
  const [sedes, setSedes] = useState([]);

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
  useEffect(() => {
    if (sedesData && sedesData.sedes && Array.isArray(sedesData.sedes)) {
      setSedes(sedesData.sedes);
    }
  }, [sedesData]);

  console.log("sedes", sedes);
  return (
    <>
      <div className="back-to-mnto">
        <BackToMntoAndino
          thumbnailSrc={image.logomnbg}
          fullSrc={image.logoSennovalabNoC}
        />
      </div>
      <div className="sedes-container-card">
        <h1>
          <strong>CONOCE NUESTRAS SEDES EN COLOMBIA</strong>
        </h1>
        <Card>
          <CardContent>
            <div className="content-web-section">
              {sedes.length === 0 ? (
                <Loading />
              ) : (
                <div className="sedes-container">
                  {sedes.map((sede) => (
                    <div key={sede._id} className="sede-card">
                      <h2>{sede.nombre}</h2>
                      <p>
                        <strong>Dirección: </strong>
                        {`${sede.direccion.nomenclature} ${sede.direccion.selectedStreet}, ${sede.direccion.municipio}, ${sede.direccion.departamento}, ${sede.direccion.country}`}
                      </p>
                      <p>
                        <strong>Contacto: </strong>
                        {sede.nombre_contacto}
                      </p>
                      <a
                        href={`https://www.google.com/maps?q=${sede.direccion.latitude},${sede.direccion.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Obtener direcciones en Google Maps
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer></Footer>
    </>
  );
};
