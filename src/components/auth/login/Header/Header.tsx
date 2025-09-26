"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {useTheme} from "@/utils/context/ThemeContext/ThemeContext";

const LoginHeader: React.FC = () => {
    const {theme, toggleTheme} = useTheme();
    const pathname = usePathname();
    const [active, setActive] = useState(pathname);

    return (
        <header className="flex justify-between items-center  p-4 pr-8">
            <Link href='/'>
                <Image src="/assets/institucional/logo.png" alt="Logo Universidad" width={64} height={64} className="h-18 w-18" />
            </Link>
            <nav className="flex space-x-4">
                <Link href="/" className={`${active === '/' ? 'border-b-4 border-blue-500 mt-5' : 'text-black text-xl'}`} onClick={() => setActive('/')}>
                    Inicio
                </Link>
                <Link href="/public/contacto" className={`${active === '/public/contacto' ? 'mt-5 border-b-4 border-blue-500' : 'text-black text-l'}`} onClick={() => setActive('/contacto')}>
                    Contacto
                </Link>
                <Link href="/public/acerca" className={`${active === '/public/acerca' ? 'mt-5 border-b-4 border-blue-500' : 'text-black text-l'}`} onClick={() => setActive('/acerca')}>
                    SiCI
                </Link>
            </nav>
        </header>
    );
};

export default LoginHeader;
