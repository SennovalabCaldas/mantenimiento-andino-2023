import React from "react";
import { Form, Dropdown, Input, Modal, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./MenuForm.form";
import { createMenu, updateMenu } from "../../../../actions/menuActions";
import { getMe } from "../../../../actions/authActions";
import { useDispatch } from "react-redux";
import "./MenuForm.scss";

export function MenuForm(props) {
  const { onClose, onReload, menu } = props;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues(menu),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const data = {
          title: formValue.title,
          path: `${formValue.protocol}${formValue.path}`,
          order: formValue.order,
          active: formValue.active,
        };

        if (menu) {
          data.path = formValue.path;
          await dispatch(createMenu(data));
        } else {
          await dispatch(updateMenu(data));
        }

        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Modal open={true} onClose={onClose}>
      <Modal.Header>{menu ? "Actualizar menú" : "Crear menú"}</Modal.Header>
      <Modal.Content>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              name="title"
              placeholder="Titulo"
              onChange={formik.handleChange}
              value={formik.values.title}
              error={formik.errors.title}
            />
            <Form.Input
              name="order"
              type="number"
              placeholder="order"
              onChange={formik.handleChange}
              value={formik.values.order}
              error={formik.errors.order}
            />
          </Form.Group>
          <Input
            name="path"
            placeholder="URL"
            fluid
            onChange={formik.handleChange}
            value={formik.values.path}
            error={formik.errors.path}
            label={
              !menu ? (
                <Dropdown
                  options={options}
                  onChange={(_, data) =>
                    formik.setFieldValue("protocol", data.value)
                  }
                  value={formik.values.protocol}
                  error={formik.errors.protocol}
                />
              ) : null
            }
          />
          <Form.Group />
          <Form.Button
            type="submit"
            primary
            fluid
            loading={formik.isSubmitting}
          >
            {menu ? "Actualizar menú" : "Crear menú"}
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

const options = [
  { key: "https://", text: "https://", value: "https://" },
  { key: "http://", text: "http://", value: "http://" },
  { key: "/", text: "/", value: "/" },
];
