import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CarDetailModal = ({ isOpen, onClose, car }) => {
    const [activeTab, setActiveTab] = useState("characteristics");

    if (!isOpen || !car) return null;

    const carDetails = {
        ...car,
        brand: car.name.split(" ")[0],
        model: car.name.split(" ").slice(1).join(" "),
        year: "2023", 
        specs: {
            engine: "3.0L V6 Turbo",
            power: "340 ch",
            torque: "500 Nm",
            transmission: "Automatique 8 vitesses",
            acceleration: "5.7 secondes (0-100 km/h)",
            consumption: "7.4L/100km",
            emission: "170g CO2/km",
        },
        equipment: [
            "Système d'infodivertissement tactile 12.3\"",
            "Navigation GPS avec cartographie 3D",
            "Sièges en cuir chauffants et ventilés",
            "Toit panoramique",
            "Assistance à la conduite",
            "Caméras 360°",
            "Système audio premium",
            'Jantes alliage 20"',
        ],
        financing: {
            cashPrice: car.cashPrice,
            monthlyLease: car.monthlyLease,
            deposit: "10%",
            term: "36 mois",
            interestRate: "2.9%",
            finalPayment: "20 000 €",
        },
        interiorImages: [
            "/assets/CarsPic/ClassS.jpg", 
            "/assets/CarsPic/m5.jpg",
        ],
    };


    const renderTabContent = () => {
        switch (activeTab) {
            case "characteristics":
                return (
                    <div className="space-y-8">
                        {/* Basic info */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Informations générales
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">
                                        Marque
                                    </p>
                                    <p className="font-semibold">
                                        {carDetails.brand}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">
                                        Modèle
                                    </p>
                                    <p className="font-semibold">
                                        {carDetails.model}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">
                                        Année
                                    </p>
                                    <p className="font-semibold">
                                        {carDetails.year}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Technical specifications */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Spécifications techniques
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
   {/*                              <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">
                                        Moteur
                                    </p>
                                    <p className="font-semibold">
                                        {carDetails.specs.engine}
                                    </p>
                                </div> */}
{/*                                 <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">
                                        Puissance
                                    </p>
                                    <p className="font-semibold">
                                        {carDetails.specs.power}
                                    </p>
                                </div> */}
{/*                                 <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">
                                        Couple
                                    </p>
                                    <p className="font-semibold">
                                        {carDetails.specs.torque}
                                    </p>
                                </div> */}
{/*                                 <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">
                                        Transmission
                                    </p>
                                    <p className="font-semibold">
                                        {carDetails.specs.transmission}
                                    </p>
                                </div> */}
{/*                                 <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">
                                        Accélération
                                    </p>
                                    <p className="font-semibold">
                                        {carDetails.specs.acceleration}
                                    </p>
                                </div> */}
{/*                                 <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">
                                        Consommation
                                    </p>
                                    <p className="font-semibold">
                                        {carDetails.specs.consumption}
                                    </p>
                                </div> */}
{/*                                 <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">
                                        Émissions CO2
                                    </p>
                                    <p className="font-semibold">
                                        {carDetails.specs.emission}
                                    </p>
                                </div> */}
                            </div>
                        </div>

                        {/* Equipment */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Équipements
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {carDetails.equipment.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start"
                                    >
                                       <svg
                                            className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg> 
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case "gallery":
                return (
                    <div className="space-y-8">
                        {/* Main image */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Extérieur
                            </h3>
                            <div className="rounded-lg overflow-hidden">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-auto object-cover rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Interior images */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Intérieur
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {carDetails.interiorImages.map(
                                    (image, index) => (
                                        <div
                                            key={index}
                                            className="rounded-lg overflow-hidden"
                                        >
                                            <img
                                                src={image}
                                                alt={`Interior view ${
                                                    index + 1
                                                }`}
                                                className="w-full h-64 object-cover"
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                );
            case "financing":
                return (
                    <div className="space-y-8">
                        {/* Financing details */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Options de financement
                            </h3>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Durée du contrat
                                        </p>
                                        <p className="font-semibold">
                                            {carDetails.financing.term}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Apport initial
                                        </p>
                                        <p className="font-semibold">
                                            {carDetails.financing.deposit}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Taux d'intérêt
                                        </p>
                                        <p className="font-semibold">
                                            {carDetails.financing.interestRate}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Mensualité
                                        </p>
                                        <p className="font-semibold">
                                            {carDetails.financing.monthlyLease}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Option d'achat finale
                                        </p>
                                        <p className="font-semibold">
                                            {carDetails.financing.finalPayment}
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-gray-500">
                                    * Offre de location avec option d'achat.
                                    Exemple pour {car.name} au prix de{" "}
                                    {car.cashPrice}, premier loyer majoré de{" "}
                                    {carDetails.financing.deposit} soit{" "}
                                    {parseInt(
                                        car.cashPrice.replace(/[^\d]/g, "")
                                    ) * 0.1}{" "}
                                    €, suivi de 35 loyers mensuels de{" "}
                                    {car.monthlyLease.split("/")[0]}.
                                    Kilométrage: 15 000 km/an. Offre valable
                                    jusqu'au 31/05/2023.
                                </p>
                            </div>
                        </div>

                        {/* Additional financing information */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Calculateur de financement
                            </h3>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <p className="mb-4 text-gray-600">
                                    Ajustez les paramètres ci-dessous pour
                                    personnaliser votre financement.
                                </p>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Durée (mois)
                                        </label>
                                        <select className="w-full p-2 border border-gray-300 rounded-md">
                                            <option>24</option>
                                            <option selected>36</option>
                                            <option>48</option>
                                            <option>60</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Apport initial (%)
                                        </label>
                                        <select className="w-full p-2 border border-gray-300 rounded-md">
                                            <option>0%</option>
                                            <option>5%</option>
                                            <option selected>10%</option>
                                            <option>15%</option>
                                            <option>20%</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Kilométrage annuel
                                        </label>
                                        <select className="w-full p-2 border border-gray-300 rounded-md">
                                            <option>10 000 km</option>
                                            <option selected>15 000 km</option>
                                            <option>20 000 km</option>
                                            <option>25 000 km</option>
                                        </select>
                                    </div>
                                </div>
                                <button className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Calculer
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", damping: 30 }}
                        className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        {/* Modal header with close button */}
                        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 rounded-t-lg flex items-center justify-between p-4 md:p-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {car.name}
                            </h2>
                            <button
                                onClick={onClose}
                                className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Modal body */}
                        <div className="p-4 md:p-6">
                            {/* Main car image and pricing */}
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
                                <div className="lg:col-span-3 rounded-lg overflow-hidden">
                                    <img
                                        src={car.image}
                                        alt={car.name}
                                        className="w-full h-auto object-cover rounded-lg"
                                    />
                                </div>
                                <div className="lg:col-span-2 flex flex-col">
                                    <div className="bg-gray-50 p-6 rounded-lg mb-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-lg font-semibold text-gray-900">
                                                Prix d'achat
                                            </p>
                                            <p className="text-3xl font-bold text-indigo-600">
                                                {car.cashPrice}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-lg font-semibold text-gray-900">
                                                Mensualité
                                            </p>
                                            <p className="text-2xl font-bold text-indigo-600">
                                                {car.monthlyLease}
                                            </p>
                                        </div>
                                        <div className="mt-2">
                                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Économisez {car.discount}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="space-y-4 mt-auto">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-4 bg-indigo-600 text-white rounded-lg font-medium text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Prendre un rendez-vous
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-4 border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium text-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Effectuer une avance
                                        </motion.button>
                                    </div>
                                </div>
                            </div>

                            {/* Car details tabs */}
                            <div className="border-b border-gray-200 mb-6">
                                <nav className="-mb-px flex space-x-8">
                                    <button
                                        onClick={() =>
                                            setActiveTab("characteristics")
                                        }
                                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === "characteristics"
                                                ? "border-indigo-500 text-indigo-600"
                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                        }`}
                                    >
                                        Caractéristiques
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("gallery")}
                                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === "gallery"
                                                ? "border-indigo-500 text-indigo-600"
                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                        }`}
                                    >
                                        Galerie
                                    </button>
                                    <button
                                        onClick={() =>
                                            setActiveTab("financing")
                                        }
                                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === "financing"
                                                ? "border-indigo-500 text-indigo-600"
                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                        }`}
                                    >
                                        Financement
                                    </button>
                                </nav>
                            </div>

                            {/* Tab content */}
                            {renderTabContent()}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CarDetailModal;
