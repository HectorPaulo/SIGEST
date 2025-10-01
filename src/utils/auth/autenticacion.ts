import axios from "@/lib/axios";

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
    if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
      throw new Error(
        "La peticion de inicio de sesion ha tardado demasiado tiempo. Intentalo de nuevo."
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
  } catch (error) {
    console.error("Error al hacer logout en el servidor:", error);
  }
};

// Función para validar token localmente (sin servidor para evitar ciclos)
export const validateToken = (): boolean => {
  if (typeof window === "undefined") return false;

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) return false;

  try {
    // Validación básica del formato JWT
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.error("Token format invalid");
      clearAllAuthData();
      return false;
    }

    // Decodificar el payload del JWT para verificar expiración
    try {
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      // Verificar si el token ha expirado
      if (payload.exp && payload.exp < currentTime) {
        console.error("Token has expired");
        clearAllAuthData();
        return false;
      }
    } catch (decodeError) {
      console.error("Error decoding token:", decodeError);
      clearAllAuthData();
      return false;
    }

    // Si llegamos aquí, el token parece válido localmente
    return true;
  } catch (error) {
    console.error("Token validation failed:", error);
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

  console.log("Todos los datos de autenticación han sido limpiados");
};
