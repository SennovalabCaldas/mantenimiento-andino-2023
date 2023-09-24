import React, { useEffect, useState } from "react";
import { image } from "../../../../assets";
import { User } from "../../../../api";
import { BasicModal } from "../../../Shared";
import { ENV } from "../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import "./UserItem.scss";
import UserForm from "../UserForm/UserForm";
import { getAllSedes } from "../../../../actions/sedesActions";
import {
  Button,
  Dialog,
  Icon,
  IconButton,
  ListItemAvatar,
} from "@mui/material";

const userController = new User();

const UserItem = ({ user, onReload, handleSelectedUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();
  const sedes = useSelector((state) => state.sede.allSedes.sedes);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

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

  const openUpdateUser = () => {
    setTitleModal(`Actualizar ${user.firstname} ${user.lastname}`);
    onOpenCloseModal();
  };

  const handleItemClick = () => {
    handleSelectedUser(user._id); // Llama a la función con el ID del usuario
  };

  const openDesactivateActivateConfim = () => {
    setIsDelete(false);
    setConfirmMessage(
      user.active
        ? `Desactivar usuario ${user.firstname} ${user.lastname}`
        : `Activar usuario ${user.firstname} ${user.lastname}`
    );
    onOpenCloseConfirm();
  };

  const onActivateDesactivate = async () => {
    try {
      await userController.updateUser(user._id, {
        active: !user.active,
      });
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  const openDeleteConfirm = () => {
    setIsDelete(true);
    setConfirmMessage(`Eliminar usuario ${user.firstname} ${user.lastname}`);
    onOpenCloseConfirm();
  };

  const onDelete = async () => {
    try {
      await userController.deleteUser(user._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  const userItemClass = user.active ? "user-item active" : "user-item inactive";

  // const UserAvatar = ({ imageUrl, isActive }) => {
  //   const avatarClassName = isActive ? "active" : "inactive";

  //   return (
  //     <div className={`user-item__image ${avatarClassName}`}>
  //       <Image avatar src={imageUrl} />
  //     </div>
  //   );
  // };

  const UserAvatar = ({ imageUrl, isActive }) => {
    return (
      <div className="user-avatar">
        <img src={imageUrl} alt="Avatar" className="avatar-image" />
        {isActive && <span className="active-indicator">Activo</span>}
      </div>
    );
  };

  return (
    <>
      <div className={userItemClass} onClick={handleItemClick}>
        <ListItemAvatar className="user-item__info">
          <UserAvatar
            className="user-basic-avatar"
            imageUrl={
              user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar
            }
            isActive={user.active}
          />
          <div className="user-basic-info">
            <p className="user-name">
              {user.firstname} {user.lastname}
            </p>
            <div className="user-item__details">
              <p className="user-email">{user.email}</p>
              <p className="user-sede">
                {user.sede}- {user.role}
              </p>
            </div>
          </div>

          <div className="user-item__buttons">
            <Button icon onClick={openUpdateUser}>
              <IconButton
                className="icon-user-item"
                name="pencil"
                style={{
                  fontSize: "24px", // Tamaño del icono
                  color: "#007bff", // Color del icono
                  // Otros estilos personalizados si los deseas
                }}
              />
            </Button>
            <Button icon onClick={openDesactivateActivateConfim}>
              <IconButton
                className="icon-user-item"
                name={user.active ? "eye slash outline" : "eye"}
                style={{
                  fontSize: "24px", // Tamaño del icono
                  color: "#007bff", // Color del icono
                  // Otros estilos personalizados si los deseas
                }}
              />
            </Button>
            <Button icon onClick={openDeleteConfirm}>
              <IconButton
                className="icon-user-item"
                name="trash"
                style={{
                  fontSize: "24px", // Tamaño del icono
                  color: "#007bff", // Color del icono
                  // Otros estilos personalizados si los deseas
                }}
              />
            </Button>
          </div>
        </ListItemAvatar>
      </div>
      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <UserForm
          close={onOpenCloseModal}
          onReload={onReload}
          user={user}
          sedes={sedes}
        />
      </BasicModal>
      <Dialog
        open={showConfirm}
        onClose={onOpenCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="dialog-confirm">
          <h2 id="alert-dialog-title">{confirmMessage}</h2>
          <div className="dialog-confirm__buttons">
            <Button onClick={onOpenCloseConfirm}>Cancelar</Button>
            <Button
              onClick={isDelete ? onDelete : onActivateDesactivate}
              autoFocus
            >
              {isDelete ? "Eliminar" : "Aceptar"}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default UserItem;
