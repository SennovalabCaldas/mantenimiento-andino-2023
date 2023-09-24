/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { Form, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./LoginForm.form";
import { ResetPassword } from "../ResetPassword";
import { PasswordRecovery } from "../PasswordRecovery";
import { useDispatch, connect } from "react-redux";
import { loginUser } from "../../../../actions/authActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LoginForm = connect()(({ onRegisterClick }) => {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showModalReset, setShowModalReset] = useState(false);

  const navigate = useNavigate();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpenModalReset = () => {
    setShowModalReset(true);
  };

  const handleCloseModalReset = () => {
    setShowModalReset(false);
  };

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleSubmit = async (formValue) => {
    await dispatch(loginUser(formValue));
    toast.success("Bienvenido");
    navigate("/admin/dashboard");

  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  return (
    <>
      {successMessage && (
        <Message
          positive
          content={successMessage}
          className="login-form__success"
        />
      )}
      {errorMessage && (
        <Message
          negative
          content={errorMessage}
          className="login-form__error"
        />
      )}
      <Form className="login-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          size="mini"
          icon="user"
          iconPosition="left"
          name="email"
          placeholder="Correo electrónico"
          autoComplete="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Input
          size="mini"
          name="current_password"
          type={showCurrentPassword ? "text" : "password"}
          autoComplete="current_password"
          placeholder="Contraseña actual"
          onChange={formik.handleChange}
          value={formik.values.current_password}
          error={formik.errors.current_password}
          icon={{
            name: showCurrentPassword ? "eye" : "eye slash",
            link: true,
            onClick: toggleCurrentPasswordVisibility,
          }}
          iconPosition="left"
          className="password-input"
        />

        <Form.Button
          type="submit"
          primary
          fluid
          content="Iniciar sesión"
          loading={formik.isSubmitting}
        />
      </Form>
      <div
        className="button-group"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form.Button
          className="custom-button"
          secondary
          onClick={handleOpenModal}
          style={{ fontWeight: "normal" }}
          content="Restablecer contraseña"
        />
        <Form.Button
          className="custom-button"
          secondary
          onClick={handleOpenModalReset}
          style={{ fontWeight: "normal" }}
          content="Cambiar contraseña"
        />
      </div>
      <div
        style={{
          display: "flex",
          paddingTop: "10px",
          justifyContent: "center",
        }}
      >
        <p style={{ marginRight: "10px", color: "#a4c7e2" }}>
          ¿No tienes cuenta?{" "}
        </p>
        <a
          style={{
            textDecoration: "underline",
            color: "#a4c7e2",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={onRegisterClick}
        >
          Regístrate
        </a>
      </div>
      <PasswordRecovery
        show={showModal}
        close={handleCloseModal}
        title="Recuperar contraseña"
      ></PasswordRecovery>

      {handleOpenModal && (
        <ResetPassword
          show={showModalReset}
          close={handleCloseModalReset}
          title="My Modal"
        />
      )}
    </>
  );
});
