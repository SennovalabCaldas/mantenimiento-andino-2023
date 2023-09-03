import React, { useEffect, useState } from "react";
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { image } from "../../../../assets";
import { User } from "../../../../api";
import { BasicModal } from "../../../Shared";
import { ENV } from "../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import "./UserItem.scss";
import UserForm from "../UserForm/UserForm";
import { getAllSedes } from "../../../../actions/sedesActions";

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
    setConfirmMessage(`Eliminar usuario ${user.email}`);
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

  const UserAvatar = ({ imageUrl, isActive }) => {
    const avatarClassName = isActive ? "active" : "inactive";

    return (
      <div className={`user-item__image ${avatarClassName}`}>
        <Image
          avatar
          src={imageUrl}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover", // Ajustar la imagen proporcionalmente
            padding: "2px",
            border: "2px solid rgb(8, 163, 60)",
            borderWidth: "2px",
            borderStyle: "solid",
          }}
        />
      </div>
    );
  };

  return (
    <>
      <div className={userItemClass} onClick={handleItemClick}>
        <div className="user-item__info">
          <UserAvatar
            imageUrl={
              user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar
            }
            isActive={user.active}
          />
          <div className="user-basic-info">
            <p className="user-item__name">
              {user.firstname} {user.lastname}
            </p>
            <div className="user-item__details">
              <p className="user-item__info">{user.email}</p>
              <p className="user-item__info">{user.sede}- {user.role}</p>
            </div>
          </div>
        </div>

        <div className="user-item__buttons">
          <Button icon onClick={openUpdateUser}>
            <Icon name="pencil" />
          </Button>
          <Button icon onClick={openDesactivateActivateConfim}>
            <Icon name={user.active ? "eye slash outline" : "eye"} />
          </Button>
          <Button icon onClick={openDeleteConfirm}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <UserForm close={onOpenCloseModal} onReload={onReload} user={user} sedes={sedes}/>
      </BasicModal>

      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={isDelete ? onDelete : onActivateDesactivate}
        content={confirmMessage}
        size="mini"
      />
    </>
  );
};

export default UserItem;
