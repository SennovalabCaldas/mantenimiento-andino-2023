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
  const phoneNumber = "+573103833591";

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

  const getDepartmentImage = (department) => {
    switch (department) {
      case "Amazonas":
        return image.amazonas;
      case "Antioquia":
        return image.antioquia;
      case "Arauca":
        return image.arauca;
      case "Atlántico":
        return image.atlantico;
      case "Bocaya":
        return image.bocaya;
      case "Bolívar":
        return image.bolivar;
      case "Caldas":
        return image.caldas;
      case "Caquetá":
        return image.caqueta;
      case "Casanare":
        return image.casanare;
      case "Cauca":
        return image.cauca;
      case "Cesar":
        return image.cesar;
      case "Chocó":
        return image.choco;
      case "Córdoba":
        return image.cordoba;
      case "Cundinamarca":
        return image.cundinamarca;
      case "Guainía":
        return image.guainia;
      case "Guaviare":
        return image.guaviare;
      case "Huila":
        return image.huila;
      case "La Guajira":
        return image.guajira;
      case "Magdalena":
        return image.magdalena;
      case "Meta":
        return image.meta;
      case "Nariño":
        return image.narino;
      case "Norte de Santander":
        return image.norteSantander;
      case "Putumayo":
        return image.putumayo;
      case "Quindío":
        return image.quindio;
      case "Risaralda":
        return image.risaralda;
      case "Santander":
        return image.santander;
      case "Sucre":
        return image.sucre;
      case "Tolima":
        return image.tolima;
      case "Valle del Cauca":
        return image.valleDelCauca;
      case "Vaupés":
        return image.vaupes;
      case "Vichada":
        return image.vichada;
      default:
        return image.mapa;
    }
  };

  console.log("sedes", sedes);
  return (
    <>
      <div className="back-to-mnto">
        <BackToMntoAndino
          thumbnailSrc={image.logomnbg} // Ruta de la miniatura de la imagen
          fullSrc={image.logoSennovalabNoC} // Ruta de la imagen completa
        />
      </div>
      <div
        className="sedes-e-card"
        style={{
          backgroundImage: `url(${image.mapa})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        {sedes ? (
          <div className="sedes-e-card__container">
            <div className="sedes-e-card__container__card">
              {sedes.map((sede) => (
                <Card
                  key={sede._id}
                  className="sedes-e-card__container__card__card"
                >
                  <div
                    style={{
                      backgroundColor: "rgb(171 163 163 / 16%)",
                      padding: "10px",
                      margin: "10px",
                    }}
                  >
                    <CardContent>
                      <div className="sedes-e-card__container__card__card__img">
                        <img
                          src={getDepartmentImage(sede.direccion.departamento)}
                          alt="department"
                        />
                      </div>
                      <div className="sedes-e-card__container__card__card__info">
                        <h3>{sede.nombre}</h3>
                        <p>
                          {sede.direccion.municipio},{" "}
                          {sede.direccion.departamento}.{" "}
                          {sede.direccion.country}
                        </p>

                        <p>
                          {sede.direccion.selectedStreet}{" "}
                          {sede.direccion.numero1}
                        </p>
                        <p>{sede.nombre_contacto}</p>
                      </div>
                    </CardContent>
                    <div className="sedes-contact-buttons">
                      <a
                        href={`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
                          `¡Hola! Estás en contacto con Mantenimiento Andino S.A.S. 
                  Estamos encantados de que estés interesado en conocernos. 
                  Si deseas conocer más acerca de Mantenimiento Andino, por favor, no dudes en comunicarte con nosotros. 
                  Estamos aquí para ayudarte en lo que necesites. 
                  
                  ¡Esperamos tu mensaje!`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="whatsapp-button">
                          <img src={image.whatsApp} alt="whatsapp" />
                        </button>
                      </a>
                      <a href={`tel:${phoneNumber}`}>
                        <button className="call-button">
                          <img src={image.call} alt="call" />
                        </button>
                      </a>
                      <a
                        href={`mailto:gerenciamantenimientoandino@gmail.com,mantenimientoandino@gmail.com?subject=Consulta de sedes Mantenimiento Andino&body=${encodeURIComponent(
                          `¡Hola! 
                        
Estás en contacto con Mantenimiento Andino S.A.S. 
Estamos encantados de que estés interesado en conocernos. 

Si deseas conocer más acerca de Mantenimiento Andino, por favor, no dudes en comunicarte con nosotros. 
Estamos aquí para ayudarte en lo que necesites. Una vez recibamos tu correo nos pondremos en contacto contigo. 

¡Esperamos tu mensaje!`
                        )}`}
                      >
                        <button className="email-button">
                          <img src={image.email} alt="email" />
                        </button>
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
      <Footer />
    </>
  );
};
