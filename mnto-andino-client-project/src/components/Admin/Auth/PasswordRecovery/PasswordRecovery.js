import React, { useState, useEffect } from "react";
import { Button, Modal, Message, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "../../../../api";
import { initialValues, validationSchema } from "./PasswordRecovery.form";
import "./PasswordRecovery.scss";

const authController = new Auth();

export const PasswordRecovery = (props) => {
  const { show, close, title, size } = props;
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (formValues) => {
      try {
        setErrorMessage("");
        const response = await authController.passwordRecovery(formValues);
        setSuccessMessage(
          "Se ha enviado un enlace de recuperación de contraseña a tu dirección de correo electrónico."
        );
        setTimeout(() => {
          close();
        }, 2000);
          
      } catch (error) {
        setErrorMessage(
          "El correo electrónico no se encuentra registrado en nuestras bases de datos"
        );
        setTimeout(() => {
          close();
        }, 2000);
        console.error(error);
      }
    },
  });

  useEffect(() => {
    // Restablecer los mensajes y el valor del campo de correo cuando el modal se abre nuevamente
    if (show) {
      setSuccessMessage("");
      setErrorMessage("");
      formik.resetForm();
    }
  }, [show]);

  return (
    <>
      <Modal open={show} onClose={close} size={size}>
        {title && <Modal.Header>{title}</Modal.Header>}
        <Modal.Content>
          {successMessage && (
            <Message
              positive
              content={successMessage}
              className="recovery-form__success"
            />
          )}
          {errorMessage && (
            <Message
              negative
              content={errorMessage}
              className="recovery-form__error"
            />
          )}
          <div className="modalBodyRecovery">
            <Form className="recovery-form" onSubmit={formik.handleSubmit}>
              <Form.Field>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <Message negative content={formik.errors.email} />
                )}
              </Form.Field>
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color="teal"
            type="submit"
            content="Aceptar"
            loading={formik.isSubmitting}
            onClick={formik.handleSubmit}
          />
          <Button
            basic
            color="teal"
            type="button"
            content="Cancelar"
            onClick={close}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
};
