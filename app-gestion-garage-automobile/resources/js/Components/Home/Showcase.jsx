import { motion } from "framer-motion";

const steps = [
    {
        step: "1",
        title: "Choisissez votre véhicule",
        description:
            "Parcourez notre catalogue de véhicules. Filtrez selon vos critères et découvrez chaque détail.",
        image: "/assets/HomeImages/Choix_voiture.jpg",
        alt: "Catalogue de véhicules",
    },
    {
        step: "2",
        title: "Fixer un rendez-vous",
        description:
            "Veuillez choisir votre créneau horaire et nous confirmer que vous êtes disponible pour le rendez-vous.",
        image: "/assets/HomeImages/contact-us.jpg",
        alt: "Options de personnalisation",
    },
    {
        step: "3",
        title: "Achetez votre voiture",
        description:
            "Optez pour le modèle de vos rêves, ajustez-le selon vos préférences, puis validez votre achat en toute simplicité.",
        image: "/assets/HomeImages/achete-voiture.jpg",
        alt: "Livraison à domicile",
    },
];

const Showcase = () => {
    return (
        <div id="comment" className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-sm text-blue-600 font-semibold tracking-widest uppercase">
                        Notre processus
                    </h2>
                    <p className="mt-2 text-4xl font-extrabold text-gray-900">
                        Comment fonctionne CarWow ?
                    </p>
                    <p className="mt-4 max-w-2xl text-lg text-gray-600 mx-auto">
                        En trois étapes simples, vous pouvez trouver votre prochaine voiture sans quitter votre domicile.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {steps.map((item) => (
                        <motion.div
                            key={item.step}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white rounded-xl p-6 shadow-sm"
                        >
                            <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-blue-600 text-white font-bold shadow">
                                {item.step}
                            </div>
                            <h3 className="mt-6 text-xl font-semibold text-center text-gray-800 group-hover:text-blue-700 transition duration-200">
                                {item.title}
                            </h3>
                            <p className="mt-3 text-center text-gray-500">
                                {item.description}
                            </p>
                            <div className="mt-6 rounded-lg overflow-hidden shadow-lg">
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-64 object-cover"
                                    src={item.image}
                                    alt={item.alt}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Showcase;
