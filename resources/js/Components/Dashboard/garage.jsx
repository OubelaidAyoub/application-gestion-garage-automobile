import { Edit } from "lucide-react";
import { router, useForm, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Garage({ garage }) {
    const { data, setData, put, errors, processing, reset } = useForm({
        nom: "",
        adresse: "",
        telephone: "",
        email: "",
        ville: "",
    });

    const { flash } = usePage().props

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/garage/${garage.id}`, data);
    };

    const handleEdit = () => {
        setData({
            nom: garage.nom,
            adresse: garage.adresse,
            telephone: garage.telephone,
            email: garage.email,
            ville: garage.ville,
        });
    };

    useEffect(() => {
        if (flash.success) {
            setData({
                nom: "",
                adresse: "",
                telephone: "",
                email: "",
                ville: "",
            });
        }
    }, [flash]);


    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >

            <AnimatePresence>
                {flash.success && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4 rounded-2xl border border-green-300 bg-green-50 text-green-800 px-4 py-3 shadow-md"
                    >
                        <p>{flash.success}</p>
                    </motion.div>
                )}

                {flash.error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4 rounded-2xl border border-red-300 bg-red-50 text-red-800 px-4 py-3 shadow-md"
                    >
                        <p>{flash.error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <h3 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-8">Informations du garage</h3>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white rounded-xl shadow p-6">
                {Object.keys(data).map((field) => (
                    <div key={field} className="col-span-1">
                        <label className="text-sm font-semibold text-gray-700 mb-2 capitalize">{field}</label>
                        <input
                            name={field}
                            type="text"
                            value={data[field]}
                            onChange={(e) => setData(field, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/20"

                        />
                        {errors[field] && <p className="text-sm text-red-500">{errors[field]}</p>}
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={processing}
                    className="col-span-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                    {processing ? "Mise à jour..." : "Mettre à jour le garage"}
                </button>

            </form>


            <table className="min-w-full text-sm border-collapse divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nom du garage</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Adresse</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Téléphone</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ville</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3">{garage.nom}</td>
                        <td className="px-4 py-3">{garage.adresse}</td>
                        <td className="px-4 py-3">{garage.telephone}</td>
                        <td className="px-4 py-3">{garage.email}</td>
                        <td className="px-4 py-3">{garage.ville}</td>
                        <td className="px-4 py-3 text-center">
                            <button
                                onClick={handleEdit}
                                className="p-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                                title="Modifier"
                            >
                                <Edit size={16} />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </motion.div>
    );
}
