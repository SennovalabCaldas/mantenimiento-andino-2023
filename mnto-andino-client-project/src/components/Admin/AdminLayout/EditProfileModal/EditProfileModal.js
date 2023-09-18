import React, { useCallback, useState, useEffect, useContext } from "react";
import { Form, Image, Message } from "semantic-ui-react";
import { useDispatch, connect, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { User } from "../../../../api";
import { image } from "../../../../assets";
import { ENV } from "../../../../utils";
import { initialValues, validationSchema } from "./EditProfileModalForm.form";
import { Sede } from "../../../../api";
import { useFormik } from "formik";
import DepartmentsForm from "../../../GeneralLayout/DepartmentsForm/DepartmentsForm";
import "./EditProfileModal.scss";
import { updateAdmin } from "../../../../actions/userActions";

const userController = new User();

export const EditProfileModal = connect()((props) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [sedeOptions, setSedeOptions] = useState([]);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("");
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("");
  const [isSedeDropdownVisible, setIsSedeDropdownVisible] = useState(false);
  const sedeController = new Sede();

  const handleDepartamentoChange = (departamento) => {
    setDepartamentoSeleccionado(departamento);
  };

  const handleMunicipioChange = (municipio) => {
    setMunicipioSeleccionado(municipio);
  };

  const onSelectionChange = () => {
      
      
  };

  const roleOptions = [
    {
      key: "user",
      text: "Usuario",
      value: "user",
    },
    {
      key: "admin",
      text: "Administrador",
      value: "admin",
    },
  ];

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

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    formik.setFieldValue("avatar", URL.createObjectURL(file));
    formik.setFieldValue("fileAvatar", file);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg",
    onDrop,
  });

  const getAvatar = () => {
    if (formik.values.fileAvatar) {
      return formik.values.avatar;
    } else if (formik.values.avatar) {
      return `${ENV.BASE_PATH}/${formik.values.avatar}`;
    }
    return image.noAvatar;
  };

  const handleSubmit = async (formValue) => {
    try {
      await dispatch(updateAdmin(formValue));
      props.close();
    } catch (error) {
      // Resto del código
    }
  };

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: validationSchema(user),
    validateOnChange: false,
    onSubmit: handleSubmit,

  });

  return (
    <Form className="user-form" onSubmit={formik.handleSubmit}>
      <div className="user-form__avatar" {...getRootProps()}>
        <input {...getInputProps()} name="avatar" />
        <Image avatar size="small" src={getAvatar()} />
      </div>
      <Form.Group widths="equal">
        <Form.Input
          name="firstname"
          placeholder="Nombre"
          onChange={formik.handleChange}
          value={formik.values.firstname}
          error={formik.errors.firstname}
        />
        <Form.Input
          name="lastname"
          placeholder="Apellidos"
          onChange={formik.handleChange}
          value={formik.values.lastname}
          error={formik.errors.lastname}
        />
      </Form.Group>
      <DepartmentsForm
        handleDepartamentoChange={handleDepartamentoChange}
        handleMunicipioChange={handleMunicipioChange}
        onSelectionChange={onSelectionChange}
      />
      {municipioSeleccionado && isSedeDropdownVisible ? (
        <Form.Dropdown
          placeholder="Selecciona una sede"
          options={sedeOptions}
          selection
          onChange={(_, data) => formik.setFieldValue("sede", data.value)}
          value={formik.values.sede}
          error={formik.errors.sede}
        />
      ) : municipioSeleccionado && sedeOptions.length === 0 ? (
        <Message info className="custom-message">
          <Message.Header>
            No se encontraron sedes asociadas al municipio seleccionado.
          </Message.Header>
        </Message>
      ) : null}

      <Form.Group widths="equal">
        <Form.Input
          name="email"
          placeholder="Correo electronico"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Dropdown
          placeholder="Seleccióna un rol"
          options={roleOptions}
          selection
          onChange={(_, data) => formik.setFieldValue("role", data.value)}
          value={formik.values.role}
          error={formik.errors.role}
        />
      </Form.Group>
      <Form.Input
        type="password"
        name="current_password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        value={formik.values.current_password}
        error={formik.errors.current_password}
      />
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Actualizar usuario
      </Form.Button>
    </Form>
  );
});
