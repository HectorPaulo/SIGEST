"use client";

import Footer from '@/components/public/Footer/Footer';
import Header from '@/components/public/Header/Header';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Carrusel from '@/components/public/Carrusel/Carrusel';
import {ThemeProvider, useTheme} from "@/utils/context/ThemeContext/ThemeContext";
import {useRouter} from "next/navigation";

const PageContent: React.FC = () => {
    const { theme } = useTheme();
    const router = useRouter();
    const { ref: step1Ref, inView: step1InView } = useInView({ triggerOnce: true });
    const { ref: step2Ref, inView: step2InView } = useInView({ triggerOnce: true });
    const { ref: step3Ref, inView: step3InView } = useInView({ triggerOnce: true });
    const { ref: step4Ref, inView: step4InView } = useInView({ triggerOnce: true });

    return (
        <motion.div
            className="flex flex-col min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Header />
            <main className={`container mx-auto p-4 pt-40 ${theme === 'light' ? 'text-gray-300' : ''}`}>
                <Carrusel />
                <h2 className={`mt-32 lg:text-8xl text-5xl font-sans font-bold text-center ${theme === 'light' ? 'text-blue-950' : 'text-white'}`}>Acerca del Sistema de Inventarios</h2>
                <div className="flex flex-col md:flex-row items-center mb-8">
                    <div className="md:w-1/2 mb-4 md:mb-0">
                        <h6 className={`lg:text-lg font-semibold mb-2 text-gray-700 mt-30 lg:text-left text-center ${theme === 'light' ? 'text-blue-950' : 'text-white'}`}>Sistema de Control Institucional (SiCI)</h6>
                        <Image src="https://getillustrations.b-cdn.net//photos/pack/Delivery%20man%20zima%20blue%20illustrations_lg.png" alt="Sistema de Inventarios" width={500} height={300} className="rounded-lg" />
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                        <h1 className="text-3xl font-bold mb-4 text-gray-800">¿En qué consiste?</h1>
                        <p className="mb-4 text-gray-600">
                            Consiste en registrar las operaciones de los equipos de tal manera que se pueda acceder al inventario de una manera ordenada y con un control que permite agilizar más operaciones.
                        </p>
                        <p className="mb-4 text-gray-600">
                            Este sistema ayuda a mantener un registro preciso de las existencias y optimizar el almacenamiento y el proceso de asignación de equipos electrónicos a los colaboradores de la universidad.
                        </p>
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="text-7xl font-bold mb-6 text-center text-blue-800 font-sans">Proceso del Sistema</h3>
                    <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:flex lg:flex-col lg:space-y-4">
                        <motion.div
                            ref={step1Ref}
                            className={`md:col-span-1 ${step1InView ? 'lg:animate-fade-in-left' : ''} flex flex-row lg:text-left mb-4 p-6`}
                            initial={{ opacity: 0, x: -100 }}
                            animate={step1InView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <div>
                                <h4 className="text-3xl font-bold text-blue-800 font-sans mb-4">Registro del Equipo</h4>
                                <h5 className='text-l font-bold text-gray-600 font-sans mb-2'>Identificación</h5>
                                <p className="text-gray-600">Al adquirir nuevo equipo, se asigna un identificador único (código de inventario o serial).</p>
                                <h5 className='text-l font-bold text-gray-600 font-sans mb-2'>Datos del equipo</h5>
                                <p className="text-gray-600">Se registran especificaciones como marca, modelo, número de serie y fecha de adquisición.</p>
                                <h5 className='text-l font-bold text-gray-600 font-sans mb-2'>Asignación a un departamento</h5>
                                <p className="text-gray-600">Asignación a un Departamento: Se define a o área pertenece inicialmente el equipo.</p>
                            </div>
                            <div className="items-center hidden md:flex justify-end">
                                <Image
                                    src="https://www.manageengine.com/products/service-desk/it-asset-management/images/it-inventory-management.png"
                                    alt="Registro de Equipo"
                                    width={450}
                                    height={450}
                                />
                            </div>
                        </motion.div>
                        <hr />
                        <motion.div
                            ref={step2Ref}
                            className={`md:col-span-1 ${step2InView ? 'lg:animate-fade-in-right' : ''} flex flex-row lg:text-right mb-4 p-6`}
                            initial={{ opacity: 0, x: 100 }}
                            animate={step2InView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="items-center hidden md:flex justify-start">
                                <Image
                                    src="/assets/empleado.svg"
                                    alt="Registro de Equipo"
                                    width={450}
                                    height={450}
                                />
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-blue-800 font-sans mb-4">Asignación al Empleado</h4>
                                <h5 className='text-l font-bold text-gray-600 font-sans mb-2'>Solicitud de Asignación</h5>
                                <p className="text-gray-600">El departamento responsable del equipo realiza una solicitud para asignar el equipo a un empleado específico.</p>
                                <h5 className='text-l font-bold text-gray-600 font-sans mb-2'>Registro de Empleado</h5>
                                <p className="text-gray-600">Se registran los datos del empleado (nombre, cargo, departamento) y se asocia el equipo a este.</p>
                                <h5 className='text-l font-bold text-gray-600 font-sans mb-2'>Condiciones de Uso</h5>
                                <p className="text-gray-600">Se establecen los términos de uso y responsabilidad, y se formaliza la asignación mediante una firma digital o física.</p>
                            </div>
                        </motion.div>
                        <hr />
                        <motion.div
                            ref={step3Ref}
                            className={`md:col-span-1 ${step3InView ? 'lg:animate-fade-in-left' : ''} flex flex-row lg:text-left mb-4 p-6`}
                            initial={{ opacity: 0, x: -100 }}
                            animate={step3InView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <div>
                                <h4 className="text-3xl font-bold text-blue-800 font-sans mb-4">Control y Mantenimiento del Equipo</h4>
                                <h5 className='text-l font-bold text-gray-600 font-sans mb-2'>Inspecciones Periódicas</h5>
                                <p className="text-gray-600">Se programan revisiones periódicas para asegurarse de que el equipo esté en condiciones óptimas.</p>
                                <h5 className='text-l font-bold text-gray-600 font-sans mb-2'>Registro de Mantenimientos</h5>
                                <p className="text-gray-600">Cada mantenimiento o reparación realizada al equipo se registra, indicando fecha, proveedor (si aplica) y costo.</p>
                                <h5 className='text-l font-bold text-gray-600 font-sans mb-2'>Inventario Regular</h5>
                                <p className="text-gray-600">Se realiza un inventario físico o digital periódicamente para verificar la ubicación y estado de cada equipo.</p>
                            </div>
                            <div className="items-center hidden md:flex justify-end">
                                <Image
                                    src="/assets/cellman.svg"
                                    alt="Control y Mantenimiento del Equipo"
                                    width={450}
                                    height={450}
                                />
                            </div>
                        </motion.div>
                        <hr />
                        <motion.div
                            ref={step4Ref}
                            className={`md:col-span-1 ${step4InView ? 'lg:animate-fade-in-right' : ''} flex flex-row lg:text-right mb-4 p-6`}
                            initial={{ opacity: 0, x: 100 }}
                            animate={step4InView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="items-center hidden md:flex justify-start">
                                <Image
                                    src="/assets/cambio.svg"
                                    alt="Cambio o Reasignación de Equipo"
                                    width={450}
                                    height={450}
                                />
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-blue-800 font-sans mb-4">Cambio o Reasignación de Equipo</h4>
                                <h5 className='text-l font-bold text-gray-600 font-sans mb-2'>Solicitudes de Cambio</h5>
                                <p className="text-gray-600">Si un equipo necesita ser actualizado o el empleado requiere un cambio, se realiza una solicitud de cambio.</p>
                                <h5 className='text-l font-bold text-gray-600 font-sans mb-2'>Proceso de Reasignación</h5>
                                <p className="text-gray-600">El equipo se da de baja en la cuenta del empleado actual y se reasigna a otro, actualizando el sistema con el nuevo usuario.</p>
                                <h5 className='text-l font-bold text-gray-600 font-sans mb-2'>Registro de Transferencia</h5>
                                <p className="text-gray-600">Se registra la transferencia para llevar un historial de la ubicación y usuarios del equipo.</p>
                            </div>
                        </motion.div>
                    </div>
                    <p className='font-semibold text-blue-950 text-center animate-bounce'>versión 1.8.6</p>
                </div>
            </main>
            <Footer />
        </motion.div>
    );
}
const Acerca = () => {
    return (
      <ThemeProvider>
        <PageContent />
      </ThemeProvider>
    );
};

export default Acerca;