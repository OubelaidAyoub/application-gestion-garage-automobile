import { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Edit, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Postes({ postes }) {
    const [editId, setEditId] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, reset } = useForm({
        nom_poste: "",
        salaire: "",
        description: "",
    });
    const { flash } = usePage().props;

    const inputClass = "border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600 w-full";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            put(`/postes/${editId}`, data);
        } else {
            post("/postes", data);
        }
    };

    const handleEdit = (poste) => {
        setData({
            nom_poste: poste.nom_poste,
            salaire: poste.salaire,
            description: poste.description,
        });
        setEditId(poste.id);
    };

    const handleDelete = (id) => {
        if (confirm("Confirmer la suppression ?")) {
            destroy(`/postes/${id}`);
        }
    };

    useEffect(() => {
        if (flash.success) {
            setData({
                nom_poste: "",
                salaire: "",
                description: "",
            });
            setEditId(null)
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

            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-8">Gestion des Postes</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-lg mb-10">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom du poste</label>
                    <input
                        type="text"
                        value={data.nom_poste}
                        onChange={(e) => setData("nom_poste", e.target.value)}
                        className={inputClass}
                        required
                    />
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salaire</label>
                    <input
                        type="number"
                        value={data.salaire}
                        onChange={(e) => setData("salaire", e.target.value)}
                        className={inputClass}
                        required
                    />
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                        type="text"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className={inputClass}
                    />
                </div>

                <button
                    type="submit"
                    className="col-span-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                    {processing ? 'Traitement...' : editId ? "Modifier le poste de travail" : "Ajouter un poste de travail"}
                </button>

            </form>

            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-8">Liste des postes</h2>

            <div className="overflow-x-auto bg-white shadow-xl">
                {postes.lenght === 0 ? 'Aucune poste est disponible' :
                    <table className="min-w-full divide-y divide-gray-200 text-sm border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nom du poste</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Salaire</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 divide-y divide-gray-100">
                            {postes.length > 0 ? (
                                postes.map((poste) => (
                                    <tr key={poste.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">{poste.nom_poste}</td>
                                        <td className="px-4 py-3">{poste.salaire} DH</td>
                                        <td className="px-4 py-3">{poste.description}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700 flex gap-3 justify-center">
                                            <button
                                                onClick={() => handleEdit(poste)}
                                                className="p-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                                                title="Modifier"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(poste.id)}
                                                className="p-1 rounded bg-red-600 text-white hover:bg-red-700"
                                                title="Supprimer"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-gray-400 italic">
                                        Aucun poste disponible.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                }
            </div>
        </motion.div>
    );
}
