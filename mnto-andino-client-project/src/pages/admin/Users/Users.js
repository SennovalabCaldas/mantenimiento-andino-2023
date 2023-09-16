import { Tab, Button } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import "./Users.scss";
import { BasicModal } from "../../../components/Shared";
import ListUsers from "../../../components/Admin/Users/ListUsers/ListUsers";
import UserForm from "../../../components/Admin/Users/UserForm/UserForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllSedes } from "../../../actions/sedesActions";

export const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();
  const sedes = useSelector((state) => state.sede.allSedes.sedes);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllSedes());
      } catch (error) {
        console.error("Error al obtener las sedes:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  // console.log(sedes);
  const handleOpenModal = () => {
    setShowModal(true);
    setReload(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onReload = () => {
    setReload((prevState) => !prevState);
  };

  const panes = [
    {
      menuItem: "Activos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers
            usersActive={true}
            sedes={sedes}
            reload={reload}
            onReload={onReload}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Inactivos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers
            usersActive={false}
            sedes={sedes}
            reload={reload}
            onReload={onReload}
          />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <h2>Usuarios</h2>
      <div className="users-page">
        <div className="title-section">
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Nuevo usuario
          </Button>
        </div>
        <div className="list-users-table">
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </div>
      </div>
      <BasicModal
        show={showModal}
        close={handleCloseModal}
        title="Crear nuevo usuario"
      >
        <UserForm sedes={sedes} close={handleCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
};
