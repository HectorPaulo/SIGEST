"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {ThemeProvider, useTheme} from "@/utils/context/ThemeContext/ThemeContext";
import UpnSpinner from "@/components/public/Spinners/UpnSpinner/UpnSpinner";
import { Alert, AlertTitle } from "@mui/material";
import { login } from "@/utils/auth/autenticacion";
import { useUser } from "@/utils/context/UserContext/UserContext";
import Footer from "@/components/public/Footer/Footer";
import Header from "@/components/public/Header/Header";

const PageContent: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<"success" | "error" | "attention" | null>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useUser();
    const { theme } = useTheme();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            console.log('Iniciando login con:', { username, password: '***' });
            const userData = await login(username, password);
            console.log('Respuesta completa del servidor:', userData);

            // Verificar estructura de la respuesta
            if (userData && userData.user) {
                const { user } = userData;
                console.log('Usuario extraído:', user);
                setUser(user);
                setAlertMessage("Inicio de sesión exitoso");
                setAlertType("success");

                // Verificar que se guardó en localStorage
                setTimeout(() => {
                    const storedUser = localStorage.getItem('user');
                    const storedToken = localStorage.getItem('token');
                    console.log('Verificando localStorage después del login:', {
                        user: storedUser,
                        token: storedToken ? 'presente' : 'ausente'
                    });
                }, 100);

                router.push('/private/dashboard');
            } else {
                console.error('Estructura de respuesta inválida:', userData);
                setAlertMessage('Error: Respuesta del servidor inválida.');
                setAlertType("error");
            }
        } catch (error: unknown) {
            console.error('Error completo en login:', error);
            setAlertMessage('Error al iniciar sesión.');
            setAlertType("error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        setError(null);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setError(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Header />
            <h1 className={`text-6xl font-bold text-center cursor-default mb-8 ${theme === 'light' ? 'text-blue-950' : 'text-white'}`}>
                Inicio de Sesión
            </h1>
            <div className="p-5 flex flex-col md:flex-row justify-center gap-10 items-center w-full h-full">
                <div className="bg-transparent border-2 rounded-xl grid gap-8 w-full md:w-1/2 lg:w-1/3 h-auto">
                    <motion.section
                        id="back-div"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="border-transparent rounded-xl p-8 m-2">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="username"
                                        className={`block mb-2 text-lg font-bold ${theme === 'light' ? 'text-blue-950' : 'text-white'}`}
                                    >
                                        Nombre de usuario
                                    </label>
                                    <motion.input
                                        id="email"
                                        className="border p-3 shadow-md dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
                                        type="text"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        placeholder="Ej. Juan Perez"
                                        required={true}
                                        initial={{ x: 100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.2, delay: 0.2 }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className={`block mb-2 text-lg font-bold ${theme === 'light' ? 'text-blue-950' : 'text-white'}`}>
                                        Contraseña
                                    </label>
                                    <motion.input
                                        id="password"
                                        className="border p-3 shadow-md  dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        type="password"
                                        placeholder="Ingresa tu contraseña"
                                        required={true}
                                        initial={{ x: 100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.2, delay: 0.4 }}
                                    />
                                </div>
                                {error && <p className="text-red-500 text-center">{error}</p>}
                                <div className='flex justify-center'>
                                    <motion.button
                                        className={`w-full md:w-1/2 p-3 mt-4 bg-transparent border font-bold text-lg hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 rounded-lg hover:scale-110 transition transform duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer`}
                                        type="submit"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 1, delay: 1 }}
                                    >
                                        ENTRAR
                                    </motion.button>
                                </div>
                            </form>
                            <div className="flex flex-col mt-4 text-sm text-center dark:text-gray-300">
                            </div>
                            {/* Para manejar el servicio de autenticación con Google */}
                            {/* <div id="third-party-auth" className="flex justify-center gap-4 mt-5">
                                <motion.button
                                    className="p-2 rounded-lg hover:scale-105 transition transform duration-300 hover:shadow-lg bg-white border"
                                    onClick={handleGoogleSignIn}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                >
                                    <img
                                        className="w-20 h-6"
                                        loading="lazy"
                                        src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                                        alt="G"
                                    />
                                </motion.button>
                            </div> */}
                        </div>
                    </motion.section>
                </div>
                <motion.div
                    className="hidden lg:block lg:w-1/3"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    <img
                        src="/assets/buffer.svg"
                        alt="login-img"
                        className="w-full h-auto"
                    />
                </motion.div>
            </div>
            <br />
            <Footer />
            {isLoading &&
                <div
                    role="alert"
                    className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm"
                >
                    <UpnSpinner />
                </div>
            }

            {alertMessage && alertType === "success" && (
                <Alert severity="success">
                    <AlertTitle>¡Éxito!</AlertTitle>
                    {alertMessage}
                </Alert>
            )}
            {alertMessage && alertType === "error" && (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {alertMessage}
                </Alert>
            )}
            {alertMessage && alertType === "attention" && (
                <Alert severity="warning">
                    <AlertTitle>Atención</AlertTitle>
                    {alertMessage}
                </Alert>

            )}
        </motion.div>
    );
};

const Login: React.FC = () => {
    return (
        <ThemeProvider>
            <PageContent />
        </ThemeProvider>
    );
};

export default Login;
