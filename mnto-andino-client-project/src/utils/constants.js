const SERVER_IP =
  process.env.REACT_APP_ENVIROMENT === "prod"
    ? "http://mantenimientoandino.co:3000"
    : "http://localhost:3100";

const API_VERSION = "v1";

export const ENV = {
  BASE_PATH: SERVER_IP,
  BASE_API: `${SERVER_IP}/api/${API_VERSION}`,
  API_ROUTES: {
    UPDATE_ME: "user/edit-profile",
    SUPPLIER: "admin/suppliers",
    USER: "admin/users/user",
    CATEGORY_SERVICE:"admin/category-services",
    SUPPLIER: "admin/suppliers",
    ALLIE: "admin/allies",
    PROJECTS: "admin/projects",
    FOUNDATION: "admin/foundation",
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
