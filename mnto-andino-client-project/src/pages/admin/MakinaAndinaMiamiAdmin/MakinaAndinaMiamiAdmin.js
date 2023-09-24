import React, { useEffect, useState } from "react";
import { Tab } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { MakinaAndinaMiami } from "../../../components";
import { getServicesMiami } from "../../../actions/makinaAndinaMiamiActions";

export const MakinaAndinaMiamiAdmin = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();

  const makinaAndinaMiamiServices = useSelector(
    (state) => state.makinaAndinaMiami.makinaAndinaMiamiServices
  );

  useEffect(() => {
    dispatch(getServicesMiami());
  }, [dispatch]);


  const panes = [
    {
      menuItem: "Servicios",
      render: () => (
        <Tab.Pane>
          <MakinaAndinaMiami makinaAndinaMiamiServices={makinaAndinaMiamiServices}/>
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
