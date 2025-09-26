import React from 'react';
import {useTheme} from "@/utils/context/ThemeContext/ThemeContext";
import Image from "next/image";

const Footer = () => {
    const { theme } = useTheme();
    return (
        <footer className="flex flex-col justify-center items-center">
            <div className={`${theme === 'light' ? 'bg-gradient-to-r from-blue-700 to-blue-950' : 'bg-gray-800'} w-screen h-full text-gray-300`}>
                <div className="grid grid-cols-5 space-x-8">
                    <div className={`flex flex-col items-center justify-center p-4 ${theme === 'light' ? 'text-white' : 'text-gray-300'}`}>
                        <Image
                            src={'/assets/institucional/logo-bn.png'}
                            alt="Logo UPN"
                            width={100}
                            height={100}
                            className="mx-auto"
                        />
                        <h2 className="text-lg font-semibold">SIGEST</h2>
                    </div>
                    <div className="flex flex-col justify-center p-4">
                        <h3 className='font-semibold mb-2'>Enlaces rápidos</h3>
                        <ul className="space-y-1 text-sm">
                            <li><a href="/public/acerca" className="hover:underline">Acerca de</a></li>
                            <li><a href="/public/contacto" className="hover:underline">Servicios</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col justify-center p-4">
                        <h3 className="font-semibold mb-2">Contacto</h3>
                        <ul className="space-y-1 text-sm">
                            <li>Tel: (951) 438 7500</li>
                            <li>Email: sistemas@upn201.edu.mx</li>
                            <li>Dirección: ¿Cuál era la dirección?</li>
                        </ul>
                    </div>
                    <div className="flex flex-col justify-center p-4">
                        <h3 className="font-semibold mb-2">Redes sociales</h3>
                        <ul className="space-y-1 text-sm">
                            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a></li>
                            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a></li>
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                <p className='text-sm text-400'>&copy; Universidad Pedagógica Nacional UPN | Unidad 201</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;