import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@mui/material";

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
  categories.forEach((category) => {});

  // Mapea los IDs de categoría a sus nombres correspondientes
  const categoryNames = {};

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
            <h2>{categoryName}</h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: "20px",
              }}
            >
              {groupedServices[categoryId].map((service) => (
                <Card
                  key={service._id}
                  style={{
                    margin: "10px",
                    minWidth: "280px",
                    maxWidth: "280px",
                  }}
                >
                  <CardContent>
                    <div
                      class="image"
                      style={{
                        margin: "10px",
                        minHeight: "280px",
                        maxHeight: "280px",
                        display: "flex",
                        "object-fit": "cover",
                        alignItems: "center",
                        borderRadius: "4px",
                        background: " rgba(0,0,0,0.01)",
                      }}
                    >
                      {service.photos && service.photos.length > 0 && (
                        <img
                          src={service.photos[0]} 
                          alt={`Foto principal`}
                          style={{ width: "100%", height: "auto" }}
                        />
                      )}
                    </div>
                    <Typography variant="h6">{service.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {service.description}
                    </Typography>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {service.photos &&
                        service.photos.map((photo, index) => (
                          <img
                            key={index}
                            src={photo} // Use the stored URL directly
                            alt={`Foto ${index}`}
                            style={{
                              width: "40px",
                              height: "40px",
                              margin: "2px",
                            }}
                          />
                        ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "10px",
                      }}
                    ></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};
