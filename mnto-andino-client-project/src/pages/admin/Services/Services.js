import React, { useEffect, useState } from "react";
import { Tab } from "semantic-ui-react";
import {
  CategoryManagement,
  ServiceCategoryList,
} from "../../../components/Admin/Servicios";
import ServiceList from "../../../components/Admin/Servicios/ServicioList/ServiciosList";
import { useSelector } from "react-redux";
import { getServices } from "../../../actions/serviceActions";
import { useDispatch } from "react-redux";

export const Services = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const panes = [
    {
      menuItem: "Categorías",
      render: () => (
        <Tab.Pane>
          <CategoryManagement />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Servicios",
      render: () => (
        <Tab.Pane>
          <ServiceList />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Servicios por categoría",
      render: () => (
        <Tab.Pane>
          <ServiceCategoryList />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div>
      <h2>Servicios</h2>
      <div className="users-page">
        <Tab
          panes={panes}
          activeIndex={activeTab}
          onTabChange={(_, data) => setActiveTab(data.activeIndex)}
          className="custom-tab"
        />
      </div>
    </div>
  );
};
