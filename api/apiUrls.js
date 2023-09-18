const baseUrl = "http://192.168.0.105:8000";

const urls = {
  base: baseUrl,
  login: baseUrl + "/api/login/",
  logout: baseUrl + "/api/logout/",
  checkAuthentication: baseUrl + "/api/check-authentication/",
  detectMelanoma: baseUrl + "/api/detect-melanoma/",
  registerUser: baseUrl + "/api/usuarios/registro/",
  tags: baseUrl + "/api/etiquetas/",
  getDetectionsUsers: baseUrl + "/api/detecciones-usuarios/",
};
export default urls;
