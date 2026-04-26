import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import CarDetailModal from "../Components/CarDetailModal";
import { Helmet } from 'react-helmet';



const SuvListPage = ({ paginatedVoitures, garage }) => {
    const [selectedCar, setSelectedCar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        category: "",
        fuelType: "",
    });
    const [sortBy, setSortBy] = useState("default");
    const [filteredCars, setFilteredCars] = useState(paginatedVoitures.data);

    useEffect(() => {
        let result = [...paginatedVoitures.data];

        if (filters.category) {
            result = result.filter((car) => car.type_vehicule === filters.category);
        }

        if (filters.fuelType) {
            result = result.filter((car) => car.carburant === filters.fuelType);
        }

        if (sortBy === "price-asc") {
            result.sort(
                (a, b) =>
                    parseInt(a.prix_propose.replace(/[^0-9]/g, "")) -
                    parseInt(b.prix_propose.replace(/[^0-9]/g, ""))
            );
        } else if (sortBy === "price-desc") {
            result.sort(
                (a, b) =>
                    parseInt(b.prix_propose.replace(/[^0-9]/g, "")) -
                    parseInt(a.prix_propose.replace(/[^0-9]/g, ""))
            );
        } else if (sortBy === "year-desc") {
            result.sort((a, b) => b.annee - a.annee);
        }

        setFilteredCars(result);
    }, [filters, sortBy]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    function prixApresReduction(prixOriginal, pourcentageReduction) {
        return prixOriginal * (1 - pourcentageReduction / 100);
    }

    const categories = [...new Set(paginatedVoitures.data.map((car) => car.type_vehicule))];
    const fuelTypes = [...new Set(paginatedVoitures.data.map((car) => car.carburant))];


    return (
        <>
            <Helmet>
                <title>Page des voitures</title>
            </Helmet>
            <Navbar garage={garage} />

            <div className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
                        >
                            Nos Voitures disponibles
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-5 max-w-xl mx-auto text-xl text-gray-500"
                        >
                            Découvrez notre sélection complète de voitures
                            premium pour répondre à tous vos besoins
                        </motion.p>
                    </div>

                    {/* Filters and Sorting */}
                    <div className="bg-white shadow rounded-lg p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Catégorie
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    value={filters.category}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            category: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Toutes catégories</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="fuelType"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Type de carburant
                                </label>
                                <select
                                    id="fuelType"
                                    name="fuelType"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    value={filters.fuelType}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            fuelType: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Tous types</option>
                                    {fuelTypes.map((fuelType) => (
                                        <option key={fuelType} value={fuelType}>
                                            {fuelType}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="sortBy"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Trier par
                                </label>
                                <select
                                    id="sortBy"
                                    name="sortBy"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="default">Par défaut</option>
                                    <option value="price-asc">
                                        Prix (croissant)
                                    </option>
                                    <option value="price-desc">
                                        Prix (décroissant)
                                    </option>
                                    <option value="year-desc">
                                        Année (récent d'abord)
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Car Listings */}
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredCars.map((car, index) => (
                            <motion.div
                                key={car.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-md flex flex-col h-full overflow-hidden transition hover:shadow-lg"
                            >
                                <div className="relative h-64 w-full">
                                    {car.images && (
                                        <img
                                            src={'/storage/' + car.images.split(';')[0]}
                                            alt={car.marque}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    {car.id_promotion && (
                                        <div className="absolute top-4 left-4 z-10">
                                            <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-medium bg-red-600 text-white shadow">
                                                -{car.promotion.pourcentage_reduction}%
                                            </span>
                                        </div>
                                    )}
                                </div>


                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-bold text-gray-900 w-[30%]">
                                                {car.marque} {car.modele}
                                            </h3>
                                            {car.id_promotion === null ? (
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-500">Prix d'achat</p>
                                                    <p className="text-2xl font-bold text-gray-700">
                                                        {Math.trunc(car.prix_propose)} MAD
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="text-right space-y-1">
                                                    <p className="text-sm text-gray-500">Prix promotionné</p>
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <p className="text-2xl font-bold text-green-600">
                                                            {prixApresReduction(car.prix_propose, car.promotion.pourcentage_reduction)} MAD
                                                        </p>
                                                    </div>
                                                    <p className="text-sm font-semibold text-gray-500">Prix initial</p>
                                                    <p className="text-sm font-semibold line-through text-gray-400">
                                                        {Math.trunc(car.prix_propose)} MAD
                                                    </p>
                                                </div>

                                            )}

                                        </div>

                                        <p className="text-sm font-semibold text-indigo-600 capitalize">
                                            {car.type_vehicule}
                                        </p>


                                        {car.date_vente && (
                                            <div className="mt-2">
                                                <span className="inline-block px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded">
                                                    Vendue
                                                </span>
                                            </div>
                                        )}

                                        <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                                            <p className="font-semibold">Année : {car.annee}</p>
                                            <p className="font-semibold">Kilométrage : {car.kilometrage} km</p>
                                            <p className="font-semibold">Carburant : {car.carburant}</p>
                                            <p className="font-semibold">Boîte : {car.boite_vitesse}</p>
                                        </div>

                                        <p className="mt-4 text-sm text-gray-500 line-clamp-3">{car.description}</p>
                                    </div>

                                    <div className="mt-6">
                                        <Link
                                            href={`/voitures/${car.id}`}
                                            className="w-full inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
                                        >
                                            Voir les détails
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredCars.length === 0 && (
                        <div className="text-center py-12">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-16 w-16 mx-auto text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                            <h3 className="mt-2 text-xl font-medium text-gray-900">
                                Aucun véhicule trouvé
                            </h3>
                            <p className="mt-1 text-gray-500">
                                Veuillez modifier vos critères de recherche.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            {/* Pagination */}
            <div className="bg-white w-full shadow rounded-lg p-6 mb-8">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="mt-4 flex flex-wrap justify-center items-center gap-2">
                        {paginatedVoitures.links.map((link, index) =>
                            link.url ? (
                                <Link
                                    preserveScroll
                                    key={index}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`min-w-[40px] text-center px-3 py-1.5 text-sm font-medium rounded-md transition duration-200 ${link.active
                                        ? 'bg-blue-600 text-white'
                                        : 'text-blue-600 hover:bg-blue-100'
                                        }`}
                                />
                            ) : (
                                <span
                                    key={index}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className="min-w-[40px] text-center px-3 py-1.5 text-sm font-medium text-slate-300 rounded-md"
                                />
                            )
                        )}
                    </div>
                </div>
            </div>


            {/* Car Detail Modal */}
            <CarDetailModal
                isOpen={isModalOpen}
                onClose={closeModal}
                car={selectedCar}
            />

            <Footer garage={garage} />
        </>
    );
};

export default SuvListPage;
