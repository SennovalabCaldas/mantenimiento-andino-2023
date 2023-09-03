import React, { useState, useEffect } from "react";
import { Auth } from "../../../../api";
import { Form, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterForm.form";
import "./RegisterForm.scss";
import DepartmentsForm from "../../../GeneralLayout/DepartmentsForm/DepartmentsForm";
import { TermsModal } from "../../../GeneralLayout/TermsModal/TermsModal";
import { Sede } from "../../../../api";

const authController = new Auth();

export const RegisterForm = (props) => {
  const { openLogin } = props;
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptanceState, setAcceptanceState] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sedeOptions, setSedeOptions] = useState([]);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("");
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("");
  const [isSedeOptionsVisible, setIsSedeOptionsVisible] = useState(false);

  const [isSedeDropdownVisible, setIsSedeDropdownVisible] = useState(false);

  const sedeController = new Sede();

  const handleDepartamentoChange = (departamento) => {
    setDepartamentoSeleccionado(departamento);
  };

  const handleMunicipioChange = (municipio) => {
    setMunicipioSeleccionado(municipio);
  };

  const onSelectionChange = () => {
    console.log("Departamento seleccionado:", departamentoSeleccionado);
    console.log("Municipio seleccionado:", municipioSeleccionado);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const fetchSedes = async () => {
    try {
      if (municipioSeleccionado) {
        const response = await sedeController.filterSedesPerMunicipio(
          `?municipio=${municipioSeleccionado}`
        );
        const sedes = response.sedes;
        const options = sedes
          .filter((sede, index, self) => {
            return index === self.findIndex((s) => s.nombre === sede.nombre);
          })
          .map((sede) => ({
            key: sede._id,
            text: sede.nombre,
            value: sede._id,
          }));

        setIsSedeDropdownVisible(options.length > 0);
        setSedeOptions(options);
      } else {
        setIsSedeDropdownVisible(false);
        setSedeOptions([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSedes();
  }, [departamentoSeleccionado, municipioSeleccionado]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async (formValue) => {
      console.log(acceptanceState);
      if (acceptanceState) {
        try {
          setErrorMessage("");
          setIsSubmitting(true);
          // Aquí agregamos una validación adicional
          if (!formik.isValidating) {
            await authController.register(formValue);
            setSuccessMessage("Usuario creado correctamente.");
            openLogin(true); // Establecer la variable de redirección a true
          }
        } catch (error) {
          console.log(error);
          formik.setErrors({
            // Establecer errores específicos en los campos correspondientes
            email:
              "Ya existe un usuario registrado con este correo electrónico. Por favor, intenta con otro correo.",
          });
          setIsSubmitting(false);
        }
      } else {
        setErrorMessage(
          <>
            <strong>No fue posible crear el usuario.</strong>
            <br />
            Debes aceptar los términos y condiciones para registrarte.
          </>
        );
        window.scrollTo(0, 0); // Desplazarse al inicio de la página para mostrar el mensaje de error
        return;
      }
    },
  });

  return (
    <>
      {formik.errors._error && (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{formik.errors._error}</p>
        </Message>
      )}

      {successMessage && (
        <Message positive>
          <Message.Header>Éxito</Message.Header>
          <p>{successMessage}</p>
        </Message>
      )}

      {successMessage && (
        <Message
          positive
          content={successMessage}
          className="register-form__success"
        />
      )}
      {errorMessage && (
        <Message
          negative
          content={errorMessage}
          className="register-form__error"
        />
      )}
      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            size="mini"
            icon="user"
            iconPosition="left"
            fluid
            name="firstname"
            placeholder="Nombre(s)"
            autoComplete="firstname"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.firstname}
            error={formik.errors.firstname}
          />
          <Form.Input
            size="mini"
            icon="user"
            iconPosition="left"
            fluid
            name="lastname"
            placeholder="Apellido(s)"
            autoComplete="lastname"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.errors.lastname}
          />
        </Form.Group>

        <Form.Input
          size="mini"
          icon="envelope"
          iconPosition="left"
          name="email"
          placeholder="Correo electrónico"
          autoComplete="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Group widths="equal">
          <Form.Input
            size="mini"
            name="current_password"
            type={showCurrentPassword ? "text" : "password"}
            autoComplete="current_password"
            placeholder="Contraseña"
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
          <Form.Input
            size="mini"
            name="confirm_password"
            type={showCurrentPassword ? "text" : "password"}
            autoComplete="confirm_password"
            placeholder="Repetir contraseña"
            onChange={formik.handleChange}
            value={formik.values.confirm_password}
            error={formik.errors.confirm_password}
            icon={{
              name: showCurrentPassword ? "eye" : "eye slash",
              link: true,
              onClick: toggleCurrentPasswordVisibility,
            }}
            iconPosition="left"
            className="password-input"
          />
        </Form.Group>

        <div className="terms-checkbox">
          <button onClick={handleOpenModal} className="terms-button hover">
            He leído y acepto los Términos y Condiciones y Política de
            privacidad de SENNOVALAB
          </button>
        </div>
        {showModal && (
          <TermsModal
            show={showModal}
            close={handleCloseModal}
            title={
              <>
                Términos y Condiciones <br /> SENNOVALAB
              </>
            }
            acceptanceState={acceptanceState}
            setAcceptanceState={setAcceptanceState}
            size="small" // Tamaño del modal, puedes ajustarlo según tus necesidades
            closeIcon // Agrega el prop closeIcon para mostrar el icono de cerrar
          />
        )}
        <div>
          <Form.Button
            type="submit"
            primary
            fluid
            content={isSubmitting ? "Enviando..." : "Registrarse"}
            loading={isSubmitting}
            disabled={isSubmitting}
          />
        </div>
      </Form>
    </>
  );
};

export default RegisterForm;
