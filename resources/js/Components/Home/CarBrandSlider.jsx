import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const carLogos = [
    { name: "BMW", path: "/assets/CarsLogos/bmw.svg" },
    { name: "Audi", path: "/assets/CarsLogos/audi.svg" },
    { name: "Jeep", path: "/assets/CarsLogos/jeep.svg" },
    { name: "Ferrari", path: "/assets/CarsLogos/ferrari.svg" },
    { name: "Porsche", path: "/assets/CarsLogos/porsche.svg" },
    { name: "Mercedes", path: "/assets/CarsLogos/mercedes.svg" },
    { name: "Volkswagen", path: "/assets/CarsLogos/volkswagen-svgrepo-com.svg" },
    { name: "Kia", path: "/assets/CarsLogos/kia-svgrepo-com.svg" },
    { name: "Honda", path: "/assets/CarsLogos/honda-svgrepo-com.svg" },
    { name: "Peugeot", path: "/assets/CarsLogos/peugeot-svgrepo-com.svg" },
    { name: "Toyota", path: "/assets/CarsLogos/toyota-svgrepo-com.svg" },
    { name: "Ford", path: "/assets/CarsLogos/ford-1-logo-svgrepo-com.svg"},
    { name: "Hyundai", path: "/assets/CarsLogos/hyundai-svgrepo-com.svg"},
    { name: "Nissan", path: "/assets/CarsLogos/nissan-svgrepo-com.svg"},
];

const CarBrandSlider = () => {
    const [width, setWidth] = useState(0);
    const sliderRef = React.useRef();

    useEffect(() => {
        // Calculate the width of the slider content minus the viewport width
        const calculateWidth = () => {
            if (sliderRef.current) {
                setWidth(
                    sliderRef.current.scrollWidth -
                        sliderRef.current.offsetWidth
                );
            }
        };

        calculateWidth();

        // Recalculate on resize
        window.addEventListener("resize", calculateWidth);
        return () => window.removeEventListener("resize", calculateWidth);
    }, []);

    return (
        <div id="marques" className="bg-gray-50 py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <p className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
                        Nos marques partenaires
                    </p>
                    <p className="mt-2 text-gray-500 text-xl">
                        Découvrez notre large sélection des marques automobiles
                        les plus prestigieuses
                    </p>
                </div>

                <div className="mt-10 relative">
                    <motion.div
                        ref={sliderRef}
                        className="cursor-grab overflow-hidden"
                    >
                        <motion.div
                            drag="x"
                            dragConstraints={{ right: 0, left: -width }}
                            animate={{ x: [-width, 0] }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 25,
                                    ease: "linear",
                                },
                            }}
                            className="flex gap-8"
                        >
                            {carLogos.map((logo, index) => (
                                <motion.div
                                    key={index}
                                    className="min-w-[150px] min-h-[100px] p-4 flex items-center justify-center rounded-lg bg-white shadow-sm"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <img
                                        src={logo.path}
                                        alt={`${logo.name} logo`}
                                        className="h-12 w-auto object-contain"
                                    />
                                </motion.div>
                            ))}

                            {/* Duplicate logos for seamless infinite scrolling */}
                            {carLogos.map((logo, index) => (
                                <motion.div
                                    key={`duplicate-${index}`}
                                    className="min-w-[150px] min-h-[100px] p-4 flex items-center justify-center rounded-lg bg-white shadow-sm"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <img
                                        src={logo.path}
                                        alt={`${logo.name} logo`}
                                        className="h-12 w-auto object-contain"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CarBrandSlider;
