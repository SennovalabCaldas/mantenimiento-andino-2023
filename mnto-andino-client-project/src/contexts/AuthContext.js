//Mover estado a nivel global de la aplicación
import { useState, useEffect, createContext } from "react";
import { User, Auth } from "../api";
import { hasExpiredToken } from "../utils";

const userController = new User();
const authController = new Auth();
export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  // La sgte variable intentara recuperar la sesión del usuario
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const relogin = async (refreshToken) => {
    try {
      const response = await authController.refreshAccessToken(refreshToken);
      setToken(response.access);
      await login(response.access);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkUserSession = async () => {
      const { getAccessToken, getRefreshToken } = authController;
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();
      console.log(
        `accessToken = ${accessToken}\nrefreshToken = ${refreshToken}`
      );

      if (!accessToken || !refreshToken) {
        logout();
        setLoading(false);
        return;
      }
      // Si ha caducado el accessToken
      if (hasExpiredToken(accessToken)) {
        if (hasExpiredToken(refreshToken)) {
          logout();
        } else {
          await relogin(refreshToken);
        }
      } else {
        //Si no ha caducado el accessToken
        await login(accessToken);
      }
      setLoading(false);
    };
    checkUserSession();
  }, []);

  const login = async (accessToken) => {
    try {
      const response = await userController.getMe(accessToken);
      delete response.current_password;
      // Ya se tienen los datos del usuario para utilizarlos en cualquier vista del frontend
      setUser(response);
      setToken(accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    authController.removeTokens();
  };

  const data = {
    accessToken: token,
    user,
    login,
    logout,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
