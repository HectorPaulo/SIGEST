import React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-white text-black text-center flex flex-col items-center">
            <Image
                src="/assets/institucional/footer/footer.png"
                alt="Universidad Pedagógica Nacional UPN | Unidad 201"
                width={800}
                height={600}
            />
            {/* <p>&copy; Universidad Pedagógica Nacional UPN | Unidad 201</p> */}
        </footer>
    );
}

export default Footer;