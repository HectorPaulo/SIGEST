"use client";

import { useEffect } from 'react';
import { startTokenValidationInterval, setNotificationContext } from '@/utils/auth/tokenValidation';
import { setupAuthInterceptor } from '@/utils/auth/tokenValidation';
import axios from '@/lib/axios';
import useNotifications from '@/hooks/useNotifications/useNotifications';

/**
 * Componente de inicialización de autenticación
 * - Configura interceptores de axios
 * - Inicia validación periódica de tokens  
 * - Configura sistema de notificaciones
 */
export default function AuthInitializer() {
    const { show: showNotification } = useNotifications();

    useEffect(() => {
        // Configurar contexto de notificaciones para el sistema de tokens
        setNotificationContext({
            showNotification: (message, options) => showNotification(message, options)
        });

        // Configurar interceptores de autenticación
        setupAuthInterceptor(axios);

        // Iniciar validación periódica de tokens cada 2 minutos
        const tokenInterval = startTokenValidationInterval(2);

        console.log('Sistema de autenticación inicializado');

        // Cleanup al desmontar
        return () => {
            if (tokenInterval) {
                clearInterval(tokenInterval);
            }
        };
    }, [showNotification]);

    return null;
}