import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";

const carPromotions = ({ voitures }) => {

    //Pour recupere la premiere image
    voitures = voitures.map((car) => ({
        ...car,
        images: car.images.split(';')[0],
    }));

    function prixApresReduction(prixOriginal, pourcentageReduction) {
        return prixOriginal * (1 - pourcentageReduction / 100);
    }

    return (

        <div id="list-voitures" className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center mb-12">
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-base font-semibold text-indigo-600 tracking-wide uppercase"
                    >
                        Offres spéciales
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
                    >
                        Le confort familial rencontre l'aventure
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto"
                    >
                        Découvrez nos offres exceptionnelles sur une sélection
                        de voitures premium parfaits pour toute.
                    </motion.p>
                </div>

                <div className="mt-10">
                    {voitures.length === 0 ? <p className="mt-4 font-bold text-xl text-indigo-300 mx-auto text-center">Aucune voiture est disponible pour le moment</p> :
                        <div className="grid gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                            {voitures.map((v, index) => (
                                <motion.div
                                    key={v.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.2,
                                    }}
                                    whileHover={{
                                        y: -10,
                                        transition: { duration: 0.2 },
                                    }}
                                    className="flex flex-col overflow-hidden rounded-2xl shadow-lg bg-white h-full"
                                >
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <img
                                            src={'storage/'+v.images}
                                            alt={v.modele}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                        />
                                        {v.id_promotion && (
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-medium bg-red-600 text-white shadow">
                                                    -{v.promotion.pourcentage_reduction}%
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 p-6 flex flex-col">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900">
                                                {v.marque + ' ' + v.modele}
                                            </h3>
                                            <p className="mt-1 text-lg font-medium text-indigo-600">
                                                {v.annee}
                                            </p>
                                            <p className="mt-3 text-base text-gray-500">
                                                {v.description}
                                            </p>
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-gray-200 space-y-6">
                                            <div className="flex items-start justify-between flex-wrap gap-4">
                                                {/* Bloc Prix */}
                                                {v.id_promotion === null ? (
                                                    <div>
                                                        <p className="text-sm text-gray-500">Prix d'achat</p>
                                                        <p className="text-2xl font-bold text-gray-900">{Math.trunc(v.prix_propose)}€</p>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-2">
                                                        <div>
                                                            <p className="text-sm text-gray-500">Prix promo</p>
                                                            <p className="text-2xl font-bold text-green-600">
                                                                {prixApresReduction(v.prix_propose, v.promotion.pourcentage_reduction)}€
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">Prix initial</p>
                                                            <p className="text-base font-medium text-gray-400 line-through">
                                                                {v.prix_propose} MAD
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Bloc Crédit */}
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-500">Crédit</p>
                                                    <p className="text-base font-semibold text-gray-900">Disponible</p>
                                                </div>
                                            </div>

                                            {/* Badge Vendue */}
                                            {v.date_vente && (
                                                <div className="text-left">
                                                    <span className="inline-block px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full">
                                                        Vendue
                                                    </span>
                                                </div>
                                            )}

                                            {/* Bouton */}
                                            <div>
                                                <Link
                                                    href={`/voitures/${v.id}`}
                                                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Découvrir cette offre
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    }

                    <div className="mt-12 text-center text-sm text-gray-500">
                        <p>
                            * Offre de credit sur 36 mois, premier paiement
                            majoré de 10%, sujet à conditions et éligibilité.
                            Détails en concession.
                        </p>
                    </div>

                    <div className="mt-10 text-center">
                        <Link href="/cars">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Voir toutes nos offres de voitures
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default carPromotions;
