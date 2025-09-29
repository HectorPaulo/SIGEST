"use client";

import React from 'react';
import Header from '@/components/public/Header/Header';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/public/Footer/Footer';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { ThemeProvider, useTheme } from '@/utils/context/ThemeContext/ThemeContext';

const PageContent = () => {
    const {theme} = useTheme();
    const router = useRouter();

    const handleGoToLogin = () => {
        router.push('/auth/login');
    };

    return (
        <div className={`flex flex-col min-h-screen ${theme}`}>
            <Header />
            <motion.div
                className="flex flex-1 items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="grid grid-cols-2 md:flex-row justify-center lg:mb-0 lg:pb-0 mt-15 p-5 box-border items-center">
                    <div className="w-full md:text-left lg:pl-8 font-sans items-center">
                        <motion.h4
                            className={`font-bold lg:mx-6 text-2xl my-2.5 ${theme === 'light' ? 'text-blue-950' : 'text-white'}`}
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            Sistema de Gestión de Servicios Universitarios
                        </motion.h4>
                        <motion.div
                            className='lg:px-5'
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h1 className={`text-6xl md:text-9xl font-bold my-0 ${theme === 'light' ? 'text-blue-950' : 'text-white'}`}>SIGEST</h1>
                        </motion.div>
                        {/*<motion.div*/}
                        {/*    className="flex lg:mt-11 gap-2.5 lg:h-10 w-50 h-10 lg:mx-10 mt-5 justify-center md:justify-start"*/}
                        {/*    initial={{ x: -100, opacity: 0 }}*/}
                        {/*    animate={{ x: 0, opacity: 1 }}*/}
                        {/*    transition={{ duration: 0.5, delay: 0.4 }}*/}
                        {/*>*/}
                        {/*    <Button*/}
                        {/*        onClick={handleGoToLogin}*/}
                        {/*        sx={{*/}
                        {/*            background: 'linear-gradient(to right, #3b82f6, #1e40af)',*/}
                        {/*            borderRadius: '0.375rem',*/}
                        {/*            border: '1px solid transparent',*/}
                        {/*            fontWeight: 'bold',*/}
                        {/*            color: 'white',*/}
                        {/*            padding: '0.625rem 1.25rem',*/}
                        {/*            '&:hover': {*/}
                        {/*                background: 'linear-gradient(to right, #2563eb, #1e3a8a)',*/}
                        {/*                scale: '110%',*/}
                        {/*            }*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        Login*/}
                        {/*    </Button>*/}
                        {/*    <Link href="../public/acerca" className="lg:px-5 lg:py-2.5 text-xl text-[#2f2f2f] hover:scale-110 hover:font-bold">A cerca de SIGEST</Link>*/}
                        {/*</motion.div>*/}
                    </div>
                    <motion.div
                        className="hidden md:flex justify-end"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Image
                            className='max-w-xl'
                            src="/assets/devices.svg"
                            alt="Imagen de personas con dispositivos"
                            width={400}
                            height={300}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </motion.div>
                </div>
            </motion.div>
            <Footer />
        </div>
    );
};

const Inicio = () => {
    return (
        <ThemeProvider>
            <PageContent />
        </ThemeProvider>
    );
};

export default Inicio;