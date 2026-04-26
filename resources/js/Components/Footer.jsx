import { Link, usePage } from "@inertiajs/react";
import { Instagram, Twitter, Youtube, Facebook } from 'lucide-react'

const Footer = ({ garage }) => {

    const { url } = usePage()

    return (
        <footer id="footer" className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                <nav
                    className="-mx-5 -my-2 flex flex-wrap justify-center"
                    aria-label="Footer"
                >
                    {!url.startsWith('/cars') || !url.startsWith('/login') &&
                        <div className="px-5 py-2">
                            <Link
                                href="#list-voitures"
                                className="text-base text-gray-600 hover:text-blue-600 transition duration-300"
                            >
                                Véhicules
                            </Link>
                        </div>
                    }

                    {!url.startsWith('/cars') || !url.startsWith('/login') &&
                        <div className="px-5 py-2">
                            <Link
                                href="#avantages"
                                className="text-base text-gray-600 hover:text-blue-600 transition duration-300"
                            >
                                Services
                            </Link>
                        </div>
                    }

                    {!url.startsWith('/cars') || !url.startsWith('/login') &&
                        <div className="px-5 py-2">
                            <Link
                                href="#marques"
                                className="text-base text-gray-600 hover:text-blue-600 transition duration-300"
                            >
                                Nos partenaires
                            </Link>
                        </div>
                    }

                    {!url.startsWith('/login') &&
                        <div className="px-5 py-2">
                            <Link
                                href="/login"
                                className="text-base text-gray-600 hover:text-blue-600 transition duration-300"
                            >
                                Accéder à l'espace garagiste
                            </Link>
                        </div>
                    }

                    {!url.startsWith('/login') &&
                    
                    <div className="px-5 py-2">
                        <Link
                            href=""
                            className="text-base text-gray-600 hover:text-blue-600 transition duration-300"
                        >
                            Défiler vers le haut de la page
                        </Link>
                    </div>
                    }
                </nav>

                <div className="mt-10 flex justify-center space-x-6">
                    <Link href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Facebook</span>
                        <Facebook />
                    </Link>

                    <Link href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Instagram</span>
                        <Instagram />
                    </Link>

                    <Link href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Twitter</span>
                        <Twitter />
                    </Link>

                    <Link href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">YouTube</span>
                        <Youtube />
                    </Link>
                </div>
                <p className="mt-8 text-center text-base text-gray-400">

                    &copy; 2025 {garage[0].nom}. Tous droits réservés.
                </p>
                <div className="mt-4 flex justify-center space-x-6">
                    <Link
                        href="#"
                        className="text-sm text-gray-400 hover:text-gray-500"
                    >
                        Conditions générales de vente
                    </Link>
                    <Link
                        href="#"
                        className="text-sm text-gray-400 hover:text-gray-500"
                    >
                        Politique de confidentialité
                    </Link>
                    <Link
                        href="#"
                        className="text-sm text-gray-400 hover:text-gray-500"
                    >
                        Mentions légales
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
