const SERVER_IP =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3500"
    : "https://mantenimientoandino.co:3000";

const API_VERSION = "api/v1";

export const ENV = {
  BASE_PATH: SERVER_IP,
  BASE_API: `${SERVER_IP}/${API_VERSION}`,
  API_ROUTES: {
    UPDATE_ME: "user/edit-profile",
    SUPPLIER: "admin/suppliers",
    USER: "admin/users/user",
    CATEGORY_SERVICE: "admin/category-services",
    SUPPLIER: "admin/suppliers",
    ALLIE: "admin/allies",
    NEW_ALLIE: "admin/allies/new-ally",
    CERTIFICATION: "admin/certifications",
    PROJECTS: "admin/projects",
    FOUNDATION: "admin/foundations",
    MAKINA_ANDINA: "admin/makinandina",
    MAKINA_ANDINA_MIAMI: "admin/makinandinamiami",
    PROFILE: "admin/profiles",
    GLAMPING: "admin/glamping",
    GET_USER: "get-user",
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    VERIFY_AUTH: "auth/verify-auth",
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
    CLIENT: "admin/clients/new-client",
    CLIENTS: "admin/clients",
    TESTIMONIE: "admin/testimonies",
    DEPARTMENTS: "admin/departments",
  },
  JWT: {
    ACCESS: "access",
    REFRESH: "refresh",
  },
};
