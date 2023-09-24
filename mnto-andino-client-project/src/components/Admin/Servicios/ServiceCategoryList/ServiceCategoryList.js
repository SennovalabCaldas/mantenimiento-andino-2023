import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, Typography } from "@mui/material";
export const ServiceCategoryList = ({ categories, services }) => {
  const dispatch = useDispatch();
  console.log(categories);
  console.log(services);

  // Obtener un mapa que asocie los IDs de categoría con sus nombres correspondientes
  const categoryMap = categories.reduce((map, category) => {
    map[category._id] = category.nameCategoryService;
    return map;
  }, {});

  console.log(categoryMap);

  const categorizedServices = services.reduce((acc, service) => {
    const { categoryService } = service;
    console.log(categoryService);
    if (!acc[categoryService]) {
      acc[categoryService] = [];
    }
    acc[categoryService].push(service);
    return acc;
  }, {});

  console.log(categorizedServices);

  return (
    <>
      {Object.entries(categorizedServices).map(
        ([categoryId, categoryServices]) => (
          <div key={categoryId}>
            <h2>
              Categoría: {categoryMap[categoryId]}
            </h2>
            {categoryServices.map((service) => (
              <Card key={service._id}>
                <CardContent>
                  <Typography variant="h6">{service.name}</Typography>
                  <Typography variant="body1">{service.description}</Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      )}
    </>
  );
};
