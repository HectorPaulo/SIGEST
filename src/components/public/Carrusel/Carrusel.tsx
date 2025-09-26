import Image from 'next/image';
import { useEffect, useRef } from 'react';

const Carrusel: React.FC = () => {
    const carruselRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const carrusel = carruselRef.current;
        if (!carrusel){
            return;
        }
        let scrollAmount = 0;
        const itemWidth = 256;
        const contadorDeslizamiento = setInterval(() => {
            if(carrusel) {
                carrusel.scrollLeft += itemWidth;
                scrollAmount += itemWidth;

                if(scrollAmount >= carrusel.scrollWidth - carrusel.clientWidth) {
                    scrollAmount = 0;
                    carrusel.scrollLeft = 0;
                }
            }
        }, 1000);
        return () =>
            clearInterval(contadorDeslizamiento);
    }, []);
    return (
        <div className='flex items-center justify-center h-40 mb-20 w-screen -ml-29'>
            <div ref={carruselRef} className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth w-full gap-5 scroll-mx-10 ">
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel1.jpg" alt="imagen de carrusel1" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel2.jpg" alt="imagen de carrusel2" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel3.jpg" alt="imagen de carrusel3" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel4.jpg" alt="imagen de carrusel4" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel5.jpg" alt="imagen de carrusel5" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel6.jpg" alt="imagen de carrusel6" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel7.jpg" alt="imagen de carrusel7" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel8.jpg" alt="imagen de carrusel8" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel9.jpg" alt="imagen de carrusel9" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel10.jpg" alt="imagen de carrusel10" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel11.jpg" alt="imagen de carrusel11" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel12.jpg" alt="imagen de carrusel12" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel13.jpg" alt="imagen de carrusel13" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel14.jpg" alt="imagen de carrusel14" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel15.jpg" alt="imagen de carrusel15" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel16.jpg" alt="imagen de carrusel16" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel17.jpg" alt="imagen de carrusel17" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel18.jpg" alt="imagen de carrusel18" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel19.jpg" alt="imagen de carrusel19" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel20.jpg" alt="imagen de carrusel20" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel21.jpg" alt="imagen de carrusel21" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel22.jpg" alt="imagen de carrusel22" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel23.jpg" alt="imagen de carrusel23" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel24.jpg" alt="imagen de carrusel24" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel25.jpg" alt="imagen de carrusel25" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel26.jpg" alt="imagen de carrusel26" width={200} height={200} /></div>
                <div className='scroll-mx-4 min-w-80 my-10 bg-gradient-to-b from-white to-blue-900 rounded-xl snap-center'><Image className='rounded-xl object-cover w-80 h-80 shadow-xl' src="/assets/carrusel27.jpg" alt="imagen de carrusel27" width={200} height={200} /></div>
            </div>
        </div>
    );
};

export default Carrusel;