import React from "react";
import { ProductList } from "./ProductList";
import { image } from "../../../assets";
import "./WebServices.scss";

export const WebServices = ({ categoryServices, services }) => {
  console.log(services);
  const uniqueCategoryNames = new Set();
  console.log(categoryServices);
  const defaultCategories = [
    {
      _id: "default1",
      nameCategoryService: "Obra civil y mantenimiento",
      descriptionCategoryService: "Descripción del Servicio Predeterminado 1",
      active: true,
      avatar: image.service1,
    },
    {
      _id: "default2",
      nameCategoryService: "Construcción y adecuación",
      descriptionCategoryService: "Descripción del Servicio Predeterminado 2",
      active: true,
      avatar: image.service1,
    },
    {
      _id: "default3",
      nameCategoryService: "Suministro e instalación",
      descriptionCategoryService: "Descripción del Servicio Predeterminado 3",
      active: true,
      avatar: image.service1,
    },
    {
      _id: "default4",
      nameCategoryService: "Redes de frio y refrigeración",
      descriptionCategoryService: "Descripción del Servicio Predeterminado 4",
      active: true,
      avatar: image.service1,
    },
  ];
  
  const filteredDefaultCategories = defaultCategories.filter((category) => {
    if (!uniqueCategoryNames.has(category.nameCategoryService)) {
      uniqueCategoryNames.add(category.nameCategoryService);
      return true;
    }
    return false;
  });

  const filteredCategoryServices = categoryServices
    ? categoryServices.filter((category) => {
        if (!uniqueCategoryNames.has(category.nameCategoryService)) {
          uniqueCategoryNames.add(category.nameCategoryService);
          return true;
        }
        return false;
      })
    : [];

  const mergedCategories = [...filteredCategoryServices, ...filteredDefaultCategories];
  console.log(mergedCategories);
  

  return (
    <div className="content-section-services">
      <div className="division">

      <ProductList categoryServices={mergedCategories} services={services}/>
    </div>
    </div>
  );
};
