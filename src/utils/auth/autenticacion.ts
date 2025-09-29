import axios from "@/lib/axios";

export async function login(username: string, password: string) {
  try {
    const response = await axios.post("/auth/login", { username, password }, { timeout: 10000 });

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
        throw new Error("La peticion de inicio de sesion ha tardado demasiado tiempo. Intentalo de nuevo.");
    }
    throw error;
  }
}

export const logout = async (): Promise<void> => {
  try {
    // Intentar hacer logout en el servidor
    const token = localStorage.getItem("token");
    if (token) {
      await axios.post("/auth/logout", { token });
    }
  } catch (error) {
    console.error("Error al hacer logout en el servidor:", error);
  } finally {
    // Limpiar ambos storages
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("user");
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

// Función para obtener el usuario actual
export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user") || sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
