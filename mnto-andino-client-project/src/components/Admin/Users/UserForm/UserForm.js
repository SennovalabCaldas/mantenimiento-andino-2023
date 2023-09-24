import React, { useCallback, useEffect, useState } from "react";
import { Formik } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  FormHelperText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { User } from "../../../../api";
import { image } from "../../../../assets";
import { initialValues, validationSchema } from "./UserForm.form";
import "./UserForm.scss";

const userController = new User();

const UserForm = (props) => {
  const { close, onReload, user, sedes } = props;
  const [showPassword, setShowPassword] = useState(false);
    

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onFileChange = (event, formik) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("avatar", URL.createObjectURL(file));
      formik.setFieldValue("fileAvatar", file);
    }
  };

  const onAvatarClick = () => {
    // Trigger input click programmatically
    const inputElement = document.getElementById("avatar-input");
    inputElement.click();
  };

  const roleOptions = [
    { key: "user", text: "Técnico", value: "user" },
    { key: "admin", text: "Administrador", value: "admin" },
  ];

  return (
    <Formik
      initialValues={initialValues(user)}
      validationSchema={validationSchema(user)}
      validateOnChange={false}
      onSubmit={async (formValue) => {
        try {
          if (!user) {
            await userController.createUser(formValue);
            onReload();
            close();
          } else {
              
            await userController.updateUser(user._id, formValue);
            onReload();
            close();
          }
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {(formik) => (
        <form className="user-form-register" onSubmit={formik.handleSubmit}>
          <div className="user-form-register__avatar">
            <div className="avatar-image">
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={(event) => onFileChange(event, formik)}
                style={{ display: "none" }}
              />
              <img
                alt="Avatar"
                src={formik.values.avatar || image.logomn}
                onClick={onAvatarClick}
                className="avatar-img"
              />
            </div>
          </div>

          <div className="personal-details-section">
            <TextField
              className="input-register-field"
              name="firstname"
              label="Nombre"
              onChange={formik.handleChange}
              value={formik.values.firstname}
              error={
                formik.touched.firstname && Boolean(formik.errors.firstname)
              }
              helperText={formik.touched.firstname && formik.errors.firstname}
            />
            <TextField
              className="input-register-field"
              name="lastname"
              label="Apellidos"
              onChange={formik.handleChange}
              value={formik.values.lastname}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
            />
          </div>

          <TextField
            name="email"
            className="input-email-field"
            label="Correo electrónico"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <div className="dropdowns-section">
            <FormControl className="select-sede">
              <InputLabel id="sede-select-label">
                Selecciona una sede
              </InputLabel>
              <Select
                labelId="sede-select-label"
                id="sede-select"
                name="sede"
                value={formik.values.sede}
                label="Selecciona una sede"
                onChange={formik.handleChange}
              >
                {sedes &&
                  sedes.map((sede) => (
                    <MenuItem key={sede.nombre} value={sede.nombre}>
                      {sede.nombre}
                    </MenuItem>
                  ))}
              </Select>

              <FormHelperText
                error={formik.touched.sede && Boolean(formik.errors.sede)}
              >
                {formik.touched.sede && formik.errors.sede}
              </FormHelperText>
            </FormControl>

            <FormControl className="select-role">
              <InputLabel id="role-select-label">Selecciona un rol</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                
                name="role"
                value={formik.values.rol}
                label="Selecciona un rol"
                onChange={formik.handleChange}
              >
                {roleOptions.map((option) => (
                  <MenuItem key={option.key} value={option.value}>
                    {option.text}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText
                error={formik.touched.role && Boolean(formik.errors.role)}
              >
                {formik.touched.role && formik.errors.role}
              </FormHelperText>
            </FormControl>
          </div>
          <div className="inline-fields">
            <TextField
              type={showPassword ? "text" : "password"}
              name="current_password"
              label="Contraseña"
              onChange={formik.handleChange}
              value={formik.values.current_password}
              error={
                formik.touched.current_password &&
                Boolean(formik.errors.current_password)
              }
              helperText={
                formik.touched.current_password &&
                formik.errors.current_password
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      style={{ alignItems: "center" }}
                    >
                      {showPassword ? (
                        <VisibilityIcon className="password-icon" />
                      ) : (
                        <VisibilityOffIcon className="password-icon" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                style: { background: "none" },
              }}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={
              formik.isSubmitting ||
              formik.values.sede === null || // O cualquier condición de validación que consideres
              (formik.touched.sede && Boolean(formik.errors.sede))
            }
          >
            {user ? "Actualizar usuario" : "Crear usuario"}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default UserForm;
