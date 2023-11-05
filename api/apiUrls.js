const baseUrl = "http://192.168.0.105:8000";
// const baseUrl = "http://3.134.253.62";

const urls = {
  base: baseUrl,
  login: baseUrl + "/api/login/",
  logout: baseUrl + "/api/logout/",
  checkAuthentication: baseUrl + "/api/check-authentication/",
  detectMelanoma: baseUrl + "/api/detect-melanoma/",
  registerUser: baseUrl + "/api/usuarios/registro/",
  tags: baseUrl + "/api/etiquetas/",
  getDetectionsUsers: baseUrl + "/api/detecciones-usuarios/",
  deleteDetectionsUsers: baseUrl + "/api/delete-detecciones-usuarios/",
  updateUser: baseUrl + "/api/usuarios/",
  getOrUpdateConfig: baseUrl + "/api/configuracion-usuario/",
  getNotifications: baseUrl + "/api/get_notificaciones/",
  getUserNotifications: baseUrl + "/api/get-usuarios-notificaciones/",
  updateUserNotifications: baseUrl + "/api/marcar-notificacion/",
};
export default urls;
