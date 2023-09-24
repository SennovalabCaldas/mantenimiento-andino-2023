import React, { useEffect, useState } from "react";
import { Services } from "../../../components/Admin/MakinaAndinaAdmin/Services/Services";
import { Tab } from "semantic-ui-react";
import { getServices } from "../../../actions/makinaAndinaActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const MakinaAndinaAdmin = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const makinaAndinaServices = useSelector(
    (state) => state.makinaAndina.makinaAndinaServices
  );

  const panes = [
    {
      menuItem: "Servicios",
      render: () => (
        <Tab.Pane>
          <Services />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div>
      <h2>Makina Andina</h2>
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
