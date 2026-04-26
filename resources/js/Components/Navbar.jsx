import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

const Navbar = ({ garage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { url } = usePage();

    return (
        <nav className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">

                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-blue-600">
                                <Link href='/'>
                                    {garage[0].nom}
                                </Link>
                            </span>
                        </div>

                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {!url.startsWith('/cars') &&
                                <Link
                                    href="#list-voitures"
                                    className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Véhicules
                                </Link>
                            }
                            {!url.startsWith('/cars') &&
                                <Link
                                    href="#avantages"
                                    className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Avantages
                                </Link>
                            }
                            {!url.startsWith('/cars') &&
                                <Link
                                    href="#temoignages"
                                    className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Témoignages
                                </Link>
                            }

                            <Link
                                href="#footer"
                                className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Contact
                            </Link>

                        </div>
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Ouvrir le menu</span>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        {!url.startsWith('/cars') &&
                            <Link
                                href="#list-voitures"
                                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                Véhicules
                            </Link>
                        }
                        {!url.startsWith('/cars') &&
                            <Link
                                href="#avantages"
                                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                Avantages
                            </Link>
                        }
                        {!url.startsWith('/cars') &&
                            <Link
                                href="#temoignages"
                                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                Témoignages
                            </Link>
                        }
                        <Link
                            href="#footer"
                            className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
