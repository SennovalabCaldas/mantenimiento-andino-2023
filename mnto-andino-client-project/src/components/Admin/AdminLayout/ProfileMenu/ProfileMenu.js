import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, connect, useSelector } from "react-redux";
import { Image, Dropdown, Icon } from "semantic-ui-react";
import { image } from "../../../../assets";
import "./ProfileMenu.scss";
import { EditProfileModal } from "../EditProfileModal";

import { BasicModal } from "../../../Shared";
import { ENV } from "../../../../utils";
import { logoutUser } from "../../../../actions/authActions";

const ProfileMenu = connect()(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.auth.user);

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

  const openUpdateUser = () => {
    if (userState && userState.firstname && userState.lastname) {
      setTitleModal(`Actualizar ${userState.firstname} ${userState.lastname}`);
      onOpenCloseModal();
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");

  };

  const dropdownOptions = [
    {
      key: "profile",
      text: (
        <div className="profile-option">
          <Image
            className="user-item__image"
            avatar
            src={
              userState?.avatar
                ? `${ENV.BASE_PATH}/${userState.avatar}`
                : image.noAvatar
            }
          />
          <div className="name-email">
            <div className="name">
              {userState?.firstname || "Nombre"}{" "}
              {userState?.lastname || "Apellido"}
            </div>
            <div className="email">{userState?.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "edit",
      text: (
        <span>
          <Icon name="user circle" />
          Editar perfil
        </span>
      ),
      onClick: openUpdateUser,
    },
    {
      key: "logout",
      text: (
        <span>
          <Icon name="sign out" />
          Cerrar sesión
        </span>
      ),
      onClick: handleLogout,
    },
  ];

  return (
    <div className="profile-menu-container">
      <Dropdown
        trigger={
          <div className="avatar-container">
            <Image
              className="user-item__image"
              avatar
              src={
                userState?.avatar
                  ? `${ENV.BASE_PATH}/${userState.avatar}`
                  : image.noAvatar
              }
            />
          </div>
        }
        options={dropdownOptions}
        pointing="top right"
        className="dropdown-menu"
        icon={<></>}
      />

      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title={"Editar perfil"}
      >
        <EditProfileModal close={onOpenCloseModal} user={userState} />
      </BasicModal>
    </div>
  );
});

export default ProfileMenu;
