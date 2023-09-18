import React from "react";
import { useSelector } from "react-redux";

// Función para agrupar los servicios por categoría
function groupServicesByCategory(services) {
  const groupedServices = {};

  services.forEach((service) => {
    const categoryId = service.categoryService || "Otros";

    if (!groupedServices[categoryId]) {
      groupedServices[categoryId] = [];
    }

    groupedServices[categoryId].push(service);
  });

  return groupedServices;
}

export const ServiceCategoryList = () => {
  const services = useSelector((state) => state.service.services);
  const categories = useSelector(
    (state) => state.categoryService.allCategoriesService
  );
  categories.forEach((category) => {
      
  });
  console.log(
    "categories",
    categories.forEach((category) => {
        
    })
  );

  // Mapea los IDs de categoría a sus nombres correspondientes
  const categoryNames = {}

  services.forEach((service) => {
    const categoryId = service.categoryService;
      
    const matchingCategory = categories.find(
      (category) => category._id === categoryId
    );

      
    if (matchingCategory) {
      categoryNames[categoryId] = matchingCategory.nameCategoryService;
    } else {
      categoryNames[categoryId] = "Categoría Desconocida"; // O un valor predeterminado en caso de que no haya coincidencia
    }
  });

    

  // Agrupa los servicios por categoría
  const groupedServices = groupServicesByCategory(services);

  return (
    <>
      {Object.keys(groupedServices).map((categoryId) => {
        const categoryName = categoryNames[categoryId] || categoryId;

        return (
          <div key={categoryId}>
            <h2>Categoría: {categoryName}</h2>
            <div
              style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}
            >
              {groupedServices[categoryId].map((service) => (
                <div
                  key={service._id}
                  style={{ margin: "10px", minWidth: "200px" }}
                >
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  {/* Aquí puedes mostrar imágenes en miniatura */}
                  <div>
                    {service.photos &&
                      service.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Foto ${index}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            margin: "2px",
                          }}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};
