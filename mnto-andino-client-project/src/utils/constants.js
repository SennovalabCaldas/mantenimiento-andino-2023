// const SERVER_IP = "http://mantenimientoandino.co:3000";
const SERVER_IP = "http://localhost:3100";
const API_VERSION = "v1";

export const ENV = {
  BASE_PATH: SERVER_IP,
  BASE_API: `${SERVER_IP}/api/${API_VERSION}`,
  API_ROUTES: {
    USER_ME: "user/me",
    UPDATE_ME: "user/edit-profile",
    /* users */
    USER: "user",
    GET_USER: "get-user",

    REGISTER: "auth/register",
    LOGIN: "auth/login",
    RESET_PASSWORD: "auth/change-password",
    PASSWORD_RECOVERY: "auth/password-recovery",
    REFRESH_TOKEN: "auth/refresh-access-token",
    POST_ROUTE: "admin/posts",
    USERS: "admin/users",
    SEDE: "sedes/new-sede",
    SEARCH_SEDES: "sedes/buscar",
    SEDES: "admin/sedes",
    ADDRESS: "admin/addresses",
    SEDESPERDPTO: "sedes/departamento",
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
