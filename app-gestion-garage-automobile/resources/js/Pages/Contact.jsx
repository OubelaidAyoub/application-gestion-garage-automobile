import { router, useForm, usePage } from "@inertiajs/react";
import {
    Calendar,
    Clock,
    User,
    Phone,
    Mail,
    MessageSquare,
} from "lucide-react";
import { Helmet } from 'react-helmet';

export default function Contact() {

    const { carId } = usePage().props;
    const { flash } = usePage().props;

    const { data, setData, post, errors, reset, processing } = useForm({
        nom: "",
        email: "",
        telephone: "",
        date: "",
        temps: "",
        message: "",
        id_voiture: carId,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('contacts', data)
        reset()
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <Helmet>
                <title>Page de réservation</title>
            </Helmet>
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow p-8">

                    {flash.success && (
                        <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4">
                            {flash.success}
                        </div>
                    )}
                    {flash.error && (
                        <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4">
                            {flash.error}
                        </div>
                    )}

                    <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                        <Calendar className="mr-3 h-8 w-8 text-blue-600" />
                        Prendre un rendez-vous
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Nom complet
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    value={data.nom}
                                    onChange={(e) => setData('nom', e.target.value)}
                                    className="pl-10 py-[10px] block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-md border-gray-300"
                                    placeholder="Nom Complet"
                                />
                                {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="pl-10 py-[10px] block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-md border-gray-300"
                                    placeholder="email@mail.com"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Téléphone
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    name="telephone"
                                    id="telephone"
                                    required
                                    value={data.telephone}
                                    onChange={(e) => setData('telephone', e.target.value)}
                                    className="pl-10 py-[10px] block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-md border-gray-300"
                                    placeholder="06 12 34 56 78"
                                />
                                {errors.telephone && <p className="text-red-500 text-sm">{errors.telephone}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="date"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Date souhaitée
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        name="date"
                                        id="date"
                                        required
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        min={
                                            new Date()
                                                .toISOString()
                                                .split("T")[0]
                                        }
                                        className="pl-10 py-[10px] block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-md border-gray-300"
                                    />
                                    {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="time"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Heure souhaitée
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Clock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="time"
                                        name="temps"
                                        id="temps"
                                        required
                                        value={data.temps}
                                        onChange={(e) => setData('temps', e.target.value)}
                                        className="pl-10 py-[10px] block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-md border-gray-300"
                                    />
                                    {errors.temps && <p className="text-red-500 text-sm">{errors.temps}</p>}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Message (optionnel)
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute top-3 left-3 pointer-events-none">
                                    <MessageSquare className="h-5 w-5 text-gray-400" />
                                </div>
                                <textarea
                                    name="message"
                                    id="message"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    rows={4}
                                    className="pl-10 py-[10px] block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-md border-gray-300"
                                    placeholder="Informations supplémentaires..."
                                />
                                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => router.visit(`/voitures/${carId}`)}
                                className="bg-gray-100 cursor-pointer text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                {processing ? 'Traitement en cours...' : 'Confirmer le rendez-vous'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}