const SERVER_IP = "http://mantenimientoandino.co:2077";
const API_VERSION = "v1";

export const ENV = {
  BASE_PATH: SERVER_IP,
  BASE_API: `${SERVER_IP}/api/${API_VERSION}`,
  API_ROUTES: {
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    RESET_PASSWORD: "auth/change-password",
    PASSWORD_RECOVERY: "auth/password-recovery",
    REFRESH_TOKEN: "auth/refresh-access-token",
    USER_ME: "user/me",
    UPDATE_ME: "user/edit-profile",
    USER: "user",
    GET_USER: "get-user",
    USERS: "users",
    SEDE: "sedes/sede",
    SEARCH_SEDES: "sedes/buscar",
    SEDES: "sedes",
    ADDRESS: "addresses",
    SEDESPERMUNICIPIO: "sedes/municipio",
    ALL_SEDES: "sedes",
    POST_ROUTE: "admin/posts",
    CATEGORY_ROUTE: "admin/categories",
    MENU: "admin/menus",
    SERVICE: "admin/services",
    CLIENT: "admin/clients",
  },
  JWT: {
    ACCESS: "access",
    REFRESH: "refresh",
  },
};
