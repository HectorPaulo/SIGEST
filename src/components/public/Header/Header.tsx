"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from '@/utils/context/ThemeContext/ThemeContext';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import BedtimeRoundedIcon from '@mui/icons-material/BedtimeRounded';

const Header: React.FC = () => {
    const {theme, toggleTheme} = useTheme();
    const pathname = usePathname();
    const [active, setActive] = useState(pathname);

    const linkVariants = {
        hover: {
            scale: 1.3,
            transition: {
                duration: 0.3,
            },
        },
    };

    return (
        <header className="flex flex-wrap justify-between items-center mt-4 sm:ml-20 sm:flex-columns pr-4 sm:pr-8">
            <Link href='/public/inicio'>
                <Image src={`/assets/institucional/${theme === 'light' ? 'logo' : 'logo-bn'}.png`} alt="Logo Universidad" width={80} height={100} className={ theme === 'light' ? 'sm:h-20 sm:w-18' : 'sm:h-18 sm:w-20'} />
            </Link>
            <nav className="flex flex-wrap space-x-2 sm:space-x-4 justify-center items-center mt-4 sm:mt-0">
                <button onClick={toggleTheme} className="cursor-pointer hover:scale-105 hover:animate-pulse">
                    {theme === 'light' ? <WbSunnyRoundedIcon color="warning" /> : <BedtimeRoundedIcon />}
                </button>
                <motion.div variants={linkVariants} whileHover="hover">
                    <Link href="/public/inicio" className={`${active === '/' ? 'mx-3 lg:mt-7 border-b-4 border-blue-900' : 'mx-3 lg:mt-7'}`} onClick={() => setActive('/')}>
                        Inicio
                    </Link>
                </motion.div>
                <motion.div variants={linkVariants} whileHover="hover">
                    <Link href="/public/contacto" className={`${active === '/public/contacto' ? 'mx-3  border-b-4 border-blue-900 lg:mt-7' : 'mx-3 lg:mt-7'}`} onClick={() => setActive('/contacto')}>
                        Contacto
                    </Link>
                </motion.div>
                <motion.div variants={linkVariants} whileHover="hover">
                    <Link href="/public/acerca" className={`${active === '/public/acerca' ? 'mx-3  border-b-4 border-blue-900 lg:mt-7 ' : 'mx-3 lg:mt-7'}`} onClick={() => setActive('/acerca')}>
                        SIGEST
                    </Link>
                </motion.div>
                <motion.div variants={linkVariants} whileHover="hover">
                    <Link href="/auth/login" className="mx-10 border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50  overflow-hidden h-12 w-40 rounded-md bg-sky-200 p-2 flex justify-center items-center font-extrabold">
                        <div className="absolute right-32 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-blue-900"></div>
                        <div className="absolute right-2 -top-4  group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150  duration-500 bg-blue-800"></div>
                        <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150  duration-500 bg-blue-700"></div>
                        <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-500 bg-blue-600"></div>
                        <p className="z-10">Iniciar Sesión</p>
                    </Link>
                </motion.div>
            </nav>
        </header>
    );
};

export default Header;