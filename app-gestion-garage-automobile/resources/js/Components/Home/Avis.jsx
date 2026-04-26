import avatar from '/public/assets/avatar.jpg'
const Avis = () => {
    const avis = [
        {
            content:
                "J'ai acheté ma nouvelle Audi en ligne et tout s'est déroulé parfaitement. La livraison était ponctuelle et la voiture était exactement comme décrite. Je recommande vivement Carwow !",
            author: "Oubelaid Ayoub",
            role: "Agadir",
            image: avatar,
        },
        {
            content:
                "Le processus d'achat était incroyablement simple. J'ai pu obtenir un financement en quelques minutes et la livraison a eu lieu trois jours plus tard. Une expérience exceptionnelle.",
            author: "EL HAJJAJI Hatim",
            role: "Meknes",
            image: avatar,
        },
        {
            content:
                "Après une mauvaise expérience chez un concessionnaire traditionnel, j'ai essayé Carwow et quelle différence ! Transparent, efficace et sans pression. Ma BMW est parfaite.",
            author: "Alaoui Mohammed",
            role: "Rabat",
            image: avatar,
        },
    ];

    return (
        <div id="temoignages" className="bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold tracking-wide uppercase text-blue-600">
                        Témoignages
                    </h2>
                    <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Ce que nos clients disent
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        Découvrez l'expérience de nos clients qui ont choisi
                        Carwow pour l'achat de leur voiture.
                    </p>
                </div>

                <div className="mt-12">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {avis.map((avis, index) => (
                            <div
                                key={index}
                                className="bg-white overflow-hidden shadow rounded-lg"
                            >
                                <div className="px-6 py-8">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-12 w-12 rounded-full"
                                                src={avis.image}
                                                alt={avis.author}
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-lg font-medium text-gray-900">
                                                {avis.author}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {avis.role}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-base text-gray-500">
                                        "{avis.content}"
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Avis;
