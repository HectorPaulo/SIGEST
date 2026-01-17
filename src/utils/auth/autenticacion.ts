import axios from "@/lib/axios";
import { globalNotifications } from "@/utils/notifications/globalNotifications";

export async function login(username: string, password: string) {
  try {
    const response = await axios.post(
      "/auth/login",
      { username, password },
      { timeout: 10000 }
    );

    // Ajustar para la estructura real de tu API
    const {
      access_token,
      refresh_token,
      name,
      email,
      username: apiUsername,
      uuid,
      roles,
    } = response.data;

    console.log("Datos extraídos:", {
      access_token: access_token ? "presente" : "ausente",
      refresh_token: refresh_token ? "presente" : "ausente",
      name: name || "ausente",
      email: email || "ausente",
      uuid: uuid || "ausente",
    });

    // Verificar que tenemos datos válidos antes de guardar
    if (!access_token) {
      throw new Error("No se recibió access_token del servidor");
    }
    if (!name || !email) {
      throw new Error(
        "No se recibió información completa del usuario del servidor"
      );
    }

    // Construir objeto usuario compatible con tu interfaz User
    const user = {
      id: uuid,
      username: apiUsername,
      name: name,
      apellidoPat: "", // No viene en la respuesta, agregar como vacío
      apellidoMat: "", // No viene en la respuesta, agregar como vacío
      email: email,
      profileImg: null, // No viene en la respuesta
      funcion: roles?.[0] || "user", // Usar el primer rol como función
    };

    // Guardar tokens y usuario en ambos storages
    localStorage.setItem("token", access_token);
    sessionStorage.setItem("token", access_token);

    if (refresh_token) {
      localStorage.setItem("refreshToken", refresh_token);
      sessionStorage.setItem("refreshToken", refresh_token);
    }

    localStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("user", JSON.stringify(user));

    console.log("Login exitoso, datos guardados:", {
      token: !!access_token,
      refreshToken: !!refresh_token,
      user: !!user,
      userStored: localStorage.getItem("user"),
      userSessionStored: sessionStorage.getItem("user"),
      tokenStored: localStorage.getItem("token") ? "presente" : "ausente",
      tokenSessionStored: sessionStorage.getItem("token")
        ? "presente"
        : "ausente",
    });

    // Devolver los datos en el formato esperado por el frontend
    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      user: user,
    };
  } catch (error) {
    console.error("Error en login:", error);

    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        const timeoutError = new Error(
          "La petición de inicio de sesión ha tardado demasiado tiempo. Inténtalo de nuevo."
        );
        globalNotifications.error(
          "Tiempo de espera agotado. La conexión tardó demasiado tiempo."
        );
        throw timeoutError;
      } else if (error.response?.status === 401) {
        globalNotifications.error(
          "Credenciales incorrectas. Verifica tu usuario y contraseña."
        );
      } else if (error.response?.status >= 500) {
        globalNotifications.error("Error del servidor. Inténtalo más tarde.");
      } else {
        globalNotifications.error(
          "Error de conexión. Verifica tu conexión a internet."
        );
      }
    } else {
      globalNotifications.error(
        "Error inesperado durante el inicio de sesión."
      );
    }

    throw error;
  }
}

export const logout = async (): Promise<void> => {
  try {
    // Intentar hacer logout en el servidor
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("user");
    }
  } catch {
    globalNotifications.warning(
      "Hubo un problema al cerrar sesión en el servidor, pero se limpiaron los datos locales."
    );
  }
};

// * Función para validar token localmente
export const validateToken = (): boolean => {
  if (typeof window === "undefined") return false;

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) return false;

  try {
    // Validación básica del formato JWT
    const parts = token.split(".");
    if (parts.length !== 3) {
      globalNotifications.error(
        "El formato del token de sesión es inválido. Por favor, inicia sesión nuevamente."
      );
      clearAllAuthData();
      return false;
    }

    // Decodificar el payload del JWT para verificar expiración
    try {
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      // Verificar si el token ha expirado
      if (payload.exp && payload.exp < currentTime) {
        globalNotifications.warning(
          "Tu sesión ha expirado. Por favor, inicia sesión nuevamente."
        );
        clearAllAuthData();
        return false;
      }
    } catch {
      globalNotifications.error(
        "Error al validar el token de sesión. Por favor, inicia sesión nuevamente."
      );
      clearAllAuthData();
      return false;
    }

    // Si llegamos aquí, el token parece válido localmente
    return true;
  } catch {
    globalNotifications.error(
      "Error al validar la autenticación. Por favor, inicia sesión nuevamente."
    );
    clearAllAuthData();
    return false;
  }
};

// Función para verificar si el usuario está autenticado (solo verificación local)
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const user = localStorage.getItem("user") || sessionStorage.getItem("user");

  return !!(token && user);
};

// Función para verificar autenticación con validación de token
export const isAuthenticatedWithValidation = (): boolean => {
  if (!isAuthenticated()) return false;
  return validateToken();
};

// Función para obtener el usuario actual
export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user") || sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Función de limpieza completa (emergencia)
export const clearAllAuthData = (): void => {
  if (typeof window === "undefined") return;

  // Limpiar localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  // Limpiar sessionStorage
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("refreshToken");
  sessionStorage.removeItem("user");

  globalNotifications.info("Datos de sesión limpiados correctamente.");
};
