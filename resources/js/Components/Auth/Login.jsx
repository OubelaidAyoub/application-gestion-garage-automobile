import React from "react";
import { Link, useForm } from "@inertiajs/react";
import Spinner from '../Spinner'

const Login = () => {

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/login', data, {
            onSuccess: () => {
                reset();
                console.log('Bien Login');
            },
            onError: (errors) => console.error(errors),
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-gray-400">
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-4xl animate-fade-in">
                <div className="hidden md:block w-full md:w-1/2 relative">
                    <img
                        src={'/assets/landing-picture.jpg'}
                        alt="Login Visual"
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                </div>

                <div className="w-full md:w-1/2 p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-800 transform hover:scale-110 transition-transform duration-300">
                            Carwow
                        </h1>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                        Connectez-vous à votre compte
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Adresse email
                            </label>
                            <input
                                aria-describedby="email-error"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                placeholder="Adresse email"
                            />
                            {errors.email && <div className="text-red-600">{errors.email}</div>}
                        </div>
                        <div className="mb-8">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Mot de passe
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                placeholder="Mot de passe"
                            />
                            {errors.password && <div className="text-red-600">{errors.password}</div>}
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 w-full cursor-pointer hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-300"
                                type="submit"
                            >
                                {processing ? <carPromotions /> : 'Login'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500 space-x-3">
                        <Link
                            href="#"
                            className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                        >
                            Conditions d'utilisation
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                        >
                            Politique de confidentialité
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
