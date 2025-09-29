import axios, { AxiosResponse, AxiosError } from "axios";
import { clearAllAuthData } from "../auth/autenticacion";

// Interface para el contexto de notificaciones
interface NotificationContext {
  showNotification: (
    message: string,
    options?: { severity?: "error" | "warning" | "info" | "success" }
  ) => void;
}

// Variable global para el contexto de notificaciones
let notificationContext: NotificationContext | null = null;

// Función para establecer el contexto de notificaciones
export const setNotificationContext = (context: NotificationContext) => {
  notificationContext = context;
};

// Función para mostrar alerta de token expirado
const showTokenExpiredAlert = () => {
  if (notificationContext) {
    notificationContext.showNotification(
      "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
      { severity: "error" }
    );
  } else {
    // Fallback a alert nativo si no hay contexto de notificaciones
    alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
  }
};

// Función para mostrar alerta de token inválido
const showTokenInvalidAlert = () => {
  if (notificationContext) {
    notificationContext.showNotification(
      "Token de sesión inválido. Redirigiendo al login...",
      { severity: "warning" }
    );
  } else {
    alert("Token de sesión inválido. Redirigiendo al login...");
  }
};

// Función para redirigir al login
const redirectToLogin = () => {
  // Limpiar todos los datos de autenticación
  clearAllAuthData();

  // Redirigir al login
  if (typeof window !== "undefined") {
    window.location.href = "/auth/login";
  }
};

// Interceptor de respuesta para manejar errores de autenticación
export const setupAuthInterceptor = (axiosInstance: typeof axios) => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      // Verificar si es un error 401 (No autorizado)
      if (error.response?.status === 401) {
        const errorMessage = error.response?.data as { message?: string };

        // Verificar diferentes tipos de errores 401
        if (
          errorMessage?.message?.toLowerCase().includes("expired") ||
          errorMessage?.message?.toLowerCase().includes("expirado")
        ) {
          showTokenExpiredAlert();
        } else if (
          errorMessage?.message?.toLowerCase().includes("invalid") ||
          errorMessage?.message?.toLowerCase().includes("inválido")
        ) {
          showTokenInvalidAlert();
        } else {
          // Error 401 genérico
          if (notificationContext) {
            notificationContext.showNotification(
              "No tienes autorización para realizar esta acción.",
              { severity: "error" }
            );
          }
        }

        // Redirigir al login después de un breve delay
        setTimeout(() => {
          redirectToLogin();
        }, 2000);
      }

      // Verificar si es un error 403 (Prohibido)
      if (error.response?.status === 403) {
        if (notificationContext) {
          notificationContext.showNotification(
            "No tienes permisos suficientes para realizar esta acción.",
            { severity: "warning" }
          );
        }
      }

      return Promise.reject(error);
    }
  );
};

// Función para validar token con alertas
export const validateTokenWithAlert = (): boolean => {
  if (typeof window === "undefined") return false;

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    if (notificationContext) {
      notificationContext.showNotification(
        "No se encontró token de sesión. Por favor, inicia sesión.",
        { severity: "warning" }
      );
    }
    setTimeout(() => {
      redirectToLogin();
    }, 1500);
    return false;
  }

  try {
    // Validación básica del formato JWT
    const parts = token.split(".");
    if (parts.length !== 3) {
      showTokenInvalidAlert();
      setTimeout(() => {
        redirectToLogin();
      }, 2000);
      return false;
    }

    // Decodificar el payload del JWT para verificar expiración
    try {
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      // Verificar si el token ha expirado
      if (payload.exp && payload.exp < currentTime) {
        showTokenExpiredAlert();
        setTimeout(() => {
          redirectToLogin();
        }, 2000);
        return false;
      }

      // Verificar si el token expira pronto (dentro de 5 minutos)
      const fiveMinutesInSeconds = 5 * 60;
      if (payload.exp && payload.exp - currentTime < fiveMinutesInSeconds) {
        if (notificationContext) {
          const minutesLeft = Math.floor((payload.exp - currentTime) / 60);
          notificationContext.showNotification(
            `Tu sesión expirará en ${minutesLeft} minutos. Considera renovar tu sesión.`,
            { severity: "warning" }
          );
        }
      }
    } catch (decodeError) {
      console.error("Error decoding token:", decodeError);
      showTokenInvalidAlert();
      setTimeout(() => {
        redirectToLogin();
      }, 2000);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Token validation failed:", error);
    showTokenInvalidAlert();
    setTimeout(() => {
      redirectToLogin();
    }, 2000);
    return false;
  }
};

// Función para verificar periódicamente el estado del token
export const startTokenValidationInterval = (intervalMinutes: number = 2) => {
  const intervalMs = intervalMinutes * 60 * 1000;

  return setInterval(() => {
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (token) {
        validateTokenWithAlert();
      }
    }
  }, intervalMs);
};
