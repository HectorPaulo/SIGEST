import axios from "axios";

// Configurar base URL
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

// Configurar interceptor de request para incluir token automáticamente
axios.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores de autenticación
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;

      if (typeof window !== "undefined") {
        const refreshToken =
          localStorage.getItem("refreshToken") ||
          sessionStorage.getItem("refreshToken");

        if (refreshToken) {
          try {
            const response = await axios.post("/auth/refresh", {
              refresh_token: refreshToken, // Ajustado para tu API
            });
            const { access_token } = response.data; // Ajustado para tu API

            // Guardar en ambos storages
            localStorage.setItem("token", access_token);
            sessionStorage.setItem("token", access_token);

            // Reintentar la petición original
            error.config.headers.Authorization = `Bearer ${access_token}`;
            return axios.request(error.config);
          } catch (refreshError) {
            console.error("Error al refrescar token:", refreshError);
            // Si el refresh token también falló, limpiar y redirigir
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("refreshToken");
            sessionStorage.removeItem("user");
            window.location.href = "/auth/login";
          }
        } else {
          // No hay refresh token, redirigir al login
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
          window.location.href = "/auth/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
