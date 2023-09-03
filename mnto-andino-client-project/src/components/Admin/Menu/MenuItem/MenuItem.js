import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { BasicModal } from "../../../Shared";
import { Menu } from "../../../../api";
import { MenuForm } from "../MenuForm";
import "./MenuItem.scss";
import { getMe } from "../../../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { updateMenu } from "../../../../actions/menuActions";


const menuController = new Menu();

export function MenuItem(props) {
  const { menu, onReload } = props;
  const useAuth = useSelector((state) => state);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const openUpdateMenu = () => {
    setTitleModal(`Actualizar menu: ${menu.title}`);
    onOpenCloseModal();
  };

  const openDesactivateActiveConfirm = () => {
    console.log("menu", menu._id);
    setIsDelete(false);
    setConfirmMessage(
      menu.active
        ? `Desactivar menu ${menu.title} `
        : `Activar menu ${menu.title} `
    );
    onOpenCloseConfirm();
  };

  const onActivateDesactivate = async () => {
    console.log("menu", menu._id);
    try {
      await dispatch(updateMenu(menu._id, {
        active: !menu.active,
      }));
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  const openDeleteConfirm = () => {
    setIsDelete(true);
    setConfirmMessage(`Eliminar el menu ${menu.title}`);
    onOpenCloseConfirm();
  };

  const onDelete = async () => {
    try {
      const accessToken = await dispatch(getMe());
      await menuController.deleteMenu(accessToken, menu._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="menu-item">
        <div className="menu-item__info">
          <span className="menu-item__info-title">{menu.title}</span>
          <span className="menu-item__info-path">{menu.path}</span>
        </div>

        <div>
          <Button
            icon
            className="menu-button update-button"
            color="red"
            onClick={openUpdateMenu}
            style={{ backgroundColor: "transparent" }}
          >
            <Icon name="pencil" />
          </Button>
          <Button
            icon
            className="menu-button update-button"
            color={menu.active ? "orange" : "orange"}
            style={{ backgroundColor: "transparent" }}
            onClick={openDesactivateActiveConfirm}
          >
            <Icon name={menu.active ? "ban" : "check"} />
          </Button>
          <Button
            icon
            className="menu-button delete-button"
            color="red"
            onClick={openDeleteConfirm}
            style={{ backgroundColor: "transparent" }}
          >
            <Icon name="trash" />
          </Button>
        </div>
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <MenuForm onClose={onOpenCloseModal} onReload={onReload} menu={menu} />
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
}
