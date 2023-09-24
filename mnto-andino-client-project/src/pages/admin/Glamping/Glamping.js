import React, { useEffect, useState } from "react";
import { Tab } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GlampingAdmin } from "../../../components/Admin/GlampingAdmin";

export const Glamping = () => {
  const [activeTab, setActiveTab] = useState(0);
  const makinaAndinaMiamiServices = useSelector(
    (state) => state.glamping.glampingServices
  );
  console.log(makinaAndinaMiamiServices);

  const panes = [
    {
      menuItem: "Servicios",
      render: () => (
        <Tab.Pane>
          <GlampingAdmin makinaAndinaMiamiServices={makinaAndinaMiamiServices}/>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div>
      <h2>Makina Andina Miami</h2>
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
