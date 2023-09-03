import React, { useState } from "react";
import { Tab, Button, AppBar, Tabs } from "@mui/material";
import { BasicModal } from "../../../components/Shared";
import { ListMenu, MenuForm } from "../../../components/Admin/Menu";
import TabPanel from "./TabPanel"; // Importa el componente TabPanel
import "./Menu.scss";

export function Menu() {
  const [showModal, setShowModal] = useState(false); // Estado para la modal principal
  const [reload, setReload] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevStata) => !prevStata);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <h2>Menús</h2>
      <div className="menu-page">
        <Button
          className="menu-page__add"
          variant="contained"
          color="primary"
          onClick={onOpenCloseModal} // Abre la modal principal
        >
          {activeTab === 0 ? "Nuevo Menu" : "Nuevo menu"}
        </Button>
        <AppBar position="static" style={{ backgroundColor: "#fff" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#f50057",
              },
            }}
          >
            <Tab
              label="Menus activos"
              className={`custom-tab ${activeTab === 0 ? "active-tab" : ""}`}
            />
            <Tab
              label="Menus inactivos"
              className={`custom-tab ${activeTab === 1 ? "active-tab" : ""}`}
            />
          </Tabs>
        </AppBar>
        <div className="menu-list-container">
          <TabPanel value={activeTab} index={0}>
            <ListMenu menuActive={true} reload={reload} onReload={onReload} />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <ListMenu menuActive={false} reload={reload} onReload={onReload} />
          </TabPanel>
        </div>
        {showModal && ( // Renderiza la modal principal si showModal es true
          // <BasicModal
          //   show={showModal}
          //   close={onOpenCloseModal}
          //   title="Crear menu"
          // >
            <MenuForm onClose={onOpenCloseModal} onReload={onReload} />
          // </BasicModal>
        )}
      </div>
    </>
  );
}
