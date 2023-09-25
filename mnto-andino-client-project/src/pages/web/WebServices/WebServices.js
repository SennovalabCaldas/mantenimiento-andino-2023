import "./WebServices.scss";
import { useRef, useState } from "react";
import { ENV } from "../../../utils/constants";
const basePath = ENV.BASE_PATH;

export const WebServices = ({ categoryServices, services }) => {
  console.log(basePath);
  console.log("services", services);
  const [mostrarServiciosAdicionales, setMostrarServiciosAdicionales] =
    useState(false);
  const [serviciosRelacionados, setServiciosRelacionados] = useState([]);

  const categoryMap = categoryServices.reduce((map, category) => {
    map[category._id] = category.nameCategoryService;
    return map;
  }, {});

  const toggleMostrarServicios = (categoryId) => {
    const serviciosFiltrados = services.filter(
      (servicio) => servicio.categoryService === categoryId
    );
    setServiciosRelacionados(serviciosFiltrados);
    setMostrarServiciosAdicionales(true);
  };

  return (
    <>
      <div className="content-section-services">
        <h2>Servicios</h2>
        <div className="column">
          {categoryServices.map((categoryService) => (
            <div
              className="card"
              key={categoryService._id}
              onClick={() => toggleMostrarServicios(categoryService._id)}
            >
              <img
                src={`${basePath}/${categoryService.avatar}`}
                alt={categoryService.nameCategoryService}
              />
              <h3>{categoryService.nameCategoryService}</h3>
              <p>Descripción de la categoría.</p>
            </div>
          ))}
        </div>
        {mostrarServiciosAdicionales && (
          <div className="column">
            {serviciosRelacionados.map((servicioRelacionado) => (
              <div className="big-card" key={servicioRelacionado._id}>
                <div className="card">
                  {servicioRelacionado.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={`${basePath}/${photo}`}
                      alt={photo.alt}
                    />
                  ))}
                  <h3>{servicioRelacionado.name}</h3>
                  <p>{servicioRelacionado.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
