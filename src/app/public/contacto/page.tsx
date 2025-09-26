"use client";
import Footer from '@/components/public/Footer/Footer';
import Header from '@/components/public/Header/Header';
import React, { useState } from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Image from 'next/image';
import { motion } from 'framer-motion';
import {useRouter} from "next/navigation";
import {ThemeProvider, useTheme} from "@/utils/context/ThemeContext/ThemeContext";

const PageContent: React.FC = () => {
    const {theme} = useTheme();

    const [emailFocus, setEmailFocus] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const text = "9514387500";
    const fallbackCopyTextToClipboard = (text: string) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            navigator.clipboard.writeText(text);
        } catch (error) {
            console.error("Error al copiar el texto al portapapeles:", error);
        }
        document.body.removeChild(textArea);
    };

    const handlePhoneClick = async () => {
        if (navigator && navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(text);
            } catch (error) {
                console.error("Error al copiar el número de teléfono al portapapeles: ", error);
            }
        } else {
            fallbackCopyTextToClipboard(text);
        }
    };

    const handleEmailClick = () => {
        window.open('mailto:upn201sistemas@gmail.com', '_blank');
    };

    const handleEmailMouseEnter = () => {
        setEmailFocus(true);
    };

    const handleEmailMouseLeave = () => {
        setEmailFocus(false);
    };

    const handlePhoneMouseEnter = () => {
        setPhoneFocus(true);
    };

    const handlePhoneMouseLeave = () => {
        setPhoneFocus(false);
    };

    return (
        <div className="flex flex-col min-h-screen mx-20">
            <Header />
            <motion.h2
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`text-7xl font-bold mb-6 text-center ${theme === 'light' ? 'text-blue-950' : 'text-white'}`}
            >
                Contacto
            </motion.h2>
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto flex flex-wrap flex-grow"
            >
                <div className="w-full md:w-1/2 p-4 flex flex-col justify-center items-center">
                    <motion.p
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="font-sans text-xl font-medium mb-4"
                    >
                        Agradecemos sinceramente tu interés en el <strong>área de sistemas</strong> de la <strong>Universidad Pedagógica Nacional, Unidad 201</strong>. Nos complace saber que deseas conocer más sobre nuestro trabajo, servicios y las soluciones tecnológicas que ofrecemos. Nuestra misión es brindar un soporte eficiente y personalizado, asegurando que cada consulta o inquietud sea atendida con la mayor prontitud y profesionalismo.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="font-sans text-xl font-medium mb-4"
                    >
                        Para cualquier tipo de consulta, información adicional o asesoría específica, ponemos a tu disposición nuestros canales de comunicación oficiales. Ya sea que necesites resolver dudas técnicas, solicitar apoyo con algún problema relacionado con las tecnologías que manejamos, o simplemente obtener más detalles sobre los servicios que ofrecemos, nuestro equipo está listo y dispuesto a ayudarte en todo momento.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="font-sans text-xl font-medium mb-4"
                    >
                        No dudes en comunicarte con nosotros. Estaremos encantados de proporcionarte la orientación necesaria, responder tus preguntas y colaborar contigo para encontrar <strong>soluciones adaptadas a tus necesidades</strong>. Tu satisfacción y confianza son nuestra prioridad, y trabajamos día a día para garantizar un servicio de calidad.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="grid-cols-3 grid gap-x-40"
                    >
                        <div className="flex items-center">
                            <button
                                onClick={handlePhoneClick}
                                onMouseEnter={handlePhoneMouseEnter}
                                onMouseLeave={handlePhoneMouseLeave}
                                className="flex items-center hover:scale-110 group text-center"
                            >
                                <div className="flex justify-center items-center w-32 h-20 rounded-3xl bg-blue-950 transition-all duration-300 text-white">
                                    <FaPhoneAlt size={32} />
                                </div>
                            </button>
                            <div className={`ml-4  font-bold text-xl whitespace-nowrap transition-all duration-300 ${phoneFocus ? 'opacity-100' : 'opacity-0'}`}>
                                9514387500
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className={`mr-4  font-bold text-xl whitespace-nowrap transition-all duration-300 ${emailFocus ? 'opacity-100' : 'opacity-0'}`}>
                                sistemas@upn201.edu.mx
                            </div>
                            <button
                                onClick={handleEmailClick}
                                onMouseEnter={handleEmailMouseEnter}
                                onMouseLeave={handleEmailMouseLeave}
                                className="flex items-center hover:scale-110 group text-center"
                            >
                                <div className="flex justify-center items-center w-32 h-20 rounded-3xl bg-blue-950 transition-all duration-300 text-white">
                                    <MdEmail size={32} />
                                </div>
                            </button>
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="items-center hidden md:flex justify-end w-full md:w-1/2"
                >
                    <Image
                        src="/assets/deptsistemas.svg"
                        alt="Departamento de Sistemas"
                        width={500}
                        height={500}
                    />
                </motion.div>
            </motion.main>
            <Footer />
        </div>
    );
}

const Contacto = () => {

    return (
        <ThemeProvider>
            <PageContent />
        </ThemeProvider>
    );
};

export default Contacto;
