import React from "react";
import { Button, Modal, Icon } from "semantic-ui-react";
import "./BasicModal.scss";

export const BasicModal = (props) => {
  const { show, close, title, size, children } = props;

  return (
    <Modal open={show} onClose={close} size={size}>
      <Modal.Header>
        {title}
        <Button icon onClick={close} className="modal-close-button">
          <Icon name="close" />
        </Button>
      </Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};

BasicModal.defaultProps = {
  size: "tiny",
};
