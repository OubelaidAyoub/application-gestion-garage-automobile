import { motion } from "framer-motion";
import { Truck, ThumbsUp, ShieldCheck, CircleDollarSign } from 'lucide-react'

const Features = () => {
    const features = [
        {
            name: "Possibilité de réserver une voiture avec avance",
            description:
                "Profitez de notre service de réservation avec avance : choisissez votre véhicule, versez un acompte, et nous le mettons de côté pour vous. Sécurisez votre futur achat dès aujourd’hui !",
            icon: (
                <ThumbsUp />
            ),
        },
        {
            name: "Livraison à domicile",
            description:
                "Nous livrons gratuitement votre nouveau véhicule directement à votre porte, partout au Maroc.",
            icon: (
                <Truck />
            ),
        },
        {
            name: "Garantie étendue",
            description:
                "Tous nos véhicules sont couverts par une garantie de 12 mois minimum, extensible jusqu'à 60 mois.",
            icon: (
                <ShieldCheck />
            ),
        },
        {
            name: "Financement sur mesure",
            description:
                "Solutions de financement adaptées à vos besoins, avec des taux compétitifs et des conditions flexibles.",
            icon: (
                <CircleDollarSign />
            ),
        },
    ];

    return (
        <section id="avantages" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-sm text-blue-600 font-semibold uppercase tracking-wide">Avantages</h2>
                    <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Une nouvelle façon d'acheter votre voiture</p>
                    <p className="mt-4 text-lg text-gray-600">Nous avons repensé l'expérience d'achat automobile pour la rendre simple, transparente et sans stress.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.name}
                            className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg hover:bg-blue-50 transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="bg-blue-600 text-white p-3 rounded-full">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">{feature.name}</h3>
                            </div>
                            <p className="mt-3 text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
