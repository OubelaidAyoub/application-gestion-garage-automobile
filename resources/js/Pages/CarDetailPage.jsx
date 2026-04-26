import { useState } from "react";
import {
    Car,
    Tag,
    Calendar,
    Users,
    Fuel,
    Gauge,
    ShoppingBag,
    Truck,
    PaintBucket,
    Cog,
    Info,
    Undo2
} from "lucide-react";
import { router } from "@inertiajs/react";
import Slider from "react-slick";
import { Helmet } from 'react-helmet';


export default function CarDetailsPage({ voiture }) {
    const [activeTab, setActiveTab] = useState("informations");

    const images = voiture.images.split(';');
    const equipements = (voiture.equipement || "").split(',');

    function goHome() {
        return router.visit('/');
    }

    function prixApresReduction(prixOriginal, pourcentageReduction) {
        return prixOriginal * (1 - pourcentageReduction / 100);
    }

    return (
        <div className="min-h-screen bg-gray-50">

            <Helmet>
                <title>Page des détails de voiture</title>
            </Helmet>
            {/* En-tête */}
            <header className="bg-white shadow relative">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                        <Car className="mr-2 text-blue-600" />
                        Fiche Véhicule
                    </h1>
                    <button
                        onClick={goHome}
                        className="font-extrabold cursor-pointer p-2 bg-white text-blue-600 rounded-xl shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <Undo2 />
                    </button>
                </div>
            </header>

            {/* Galerie d'images */}
            {Array.isArray(images) && images.length > 0 && (
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                    <Slider
                        dots={true}
                        infinite={true}
                        speed={500}
                        slidesToShow={1}
                        slidesToScroll={1}
                        arrows={true}
                        className="rounded-xl overflow-hidden border-0"
                    >
                        {images.map((img, index) => (
                            <div key={index}>
                                <img
                                    src={"/storage/" + img}
                                    alt={voiture.marque + " " + voiture.modele}
                                    className="object-cover w-full h-96 rounded-xl"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>

            )}

            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 pb-50">
                {/* Carte principale avec titre et prix */}
                <div className="bg-white rounded-xl shadow mb-6 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                                    {voiture.marque} {voiture.modele} ({voiture.annee})
                                </h2>
                                <p className="mt-1 text-lg text-gray-500 flex items-center">
                                    <Tag className="mr-2 h-5 w-5" />
                                    {voiture.matricule}
                                </p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                {voiture.id_promotion === null ? (
                                    <div>
                                        <p className="text-sm text-gray-500">Prix d'achat</p>
                                        <p className="text-xl font-bold text-gray-900">{voiture.prix_propose} €</p>
                                    </div>
                                ) : (
                                    <div className="flex items-end space-x-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Prix promo</p>
                                            <p className="text-2xl font-bold text-green-600">
                                                {prixApresReduction(voiture.prix_propose, voiture.promotion.pourcentage_reduction)} €
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Prix initial</p>
                                            <p className="text-base font-medium text-gray-400 line-through">
                                                {voiture.prix_propose}€
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className="text-left">
                            {voiture.date_vente && (
                                <span className="inline-block mt-2 px-2 py-1 text-s font-semibold text-red-600 bg-red-100 rounded">
                                    Vendue
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Caractéristiques principales */}
                    <div className="bg-gray-50 p-6 grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                        <CarDetail label="Kilométrage" value={`${voiture.kilometrage} km`} />
                        <CarDetail label="Énergie" value={voiture.carburant} />
                        <CarDetail label="Boîte" value={voiture.boite_vitesse} />
                        <CarDetail label="Puissance" value={`${voiture.puissance_moteur} ch (${voiture.puissance_fiscale} CV)`} />
                        <CarDetail label="État" value={voiture.etat} />
                    </div>
                </div>

                {/* Navigation par onglets */}
                <div className="mb-6 border-b border-gray-200">
                    <nav className="flex -mb-px space-x-8">
                        {["informations", "technique", "equipement"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === tab
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                            >
                                {tab === "informations" && <Info className="mr-2 h-5 w-5" />}
                                {tab === "technique" && <Cog className="mr-2 h-5 w-5" />}
                                {tab === "equipement" && <ShoppingBag className="mr-2 h-5 w-5" />}
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Contenu des onglets */}
                <div className="bg-white rounded-xl shadow p-6">
                    {activeTab === "informations" && (
                        <div className="space-y-6">
                            <Section title="Informations générales">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InfoItem icon={<Tag />} label="Matricule" value={voiture.matricule} />
                                    <InfoItem icon={<Truck />} label="Type de véhicule" value={voiture.type_vehicule} />
                                    <InfoItem icon={<PaintBucket />} label="Couleur" value={voiture.couleur} />
                                </div>
                            </Section>
                            <Section title="Description">
                                <p className="text-gray-700">{voiture.description}</p>
                            </Section>
                        </div>
                    )}
                    {activeTab === "technique" && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Caractéristiques techniques</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <InfoItem icon={<Calendar />} label="Année" value={voiture.annee} />
                                    <InfoItem icon={<Gauge />} label="Kilométrage" value={`${voiture.kilometrage} km`} />
                                    <InfoItem icon={<Cog />} label="Boîte de vitesse" value={voiture.boite_vitesse} />
                                    <InfoItem icon={<Fuel />} label="Source d'énergie" value={voiture.carburant} />
                                </div>
                                <div className="space-y-4">
                                    <InfoItem icon={<Car />} label="Nombre de portes" value={voiture.nombre_portes} />
                                    <InfoItem icon={<Users />} label="Nombre de places" value={voiture.nombre_places} />
                                    <InfoItem icon={<Gauge />} label="Puissance fiscale" value={`${voiture.puissance_fiscale} CV`} />
                                    <InfoItem icon={<Gauge />} label="Puissance moteur" value={`${voiture.puissance_moteur} ch`} />
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === "equipement" && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Équipements</h3>
                            {equipements.map((option) => (
                                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                                    <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <ShoppingBag className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span className="ml-3 text-gray-700 font-bold">{option}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Boutons d'action */}
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                    <div className="flex justify-end space-x-4">
                        <button
                            disabled={voiture.date_vente !== null}
                            onClick={() => router.visit('/contact?carId=' + voiture.id)}
                            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition duration-200 flex items-center">
                            Prendre un rendez-vous
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


function InfoItem({ icon, label, value }) {
    return (
        <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="h-5 w-5 text-blue-600">{icon}</div>
            </div>
            <div className="ml-3">
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-lg font-medium text-gray-900">{value}</p>
            </div>
        </div>
    );
}

function CarDetail({ label, value }) {
    return (
        <div>
            <p className="text-gray-500 text-sm font-medium">{label}</p>
            <p className="text-lg font-semibold text-gray-900">{value}</p>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
            {children}
        </div>
    );
}
