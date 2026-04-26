import { useEffect, useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import { Edit, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


export default function Maintenance({ maintenances, voitures }) {
    const { data, setData, post, put, delete: destroy, processing, errors } = useForm({
        type_maintenance: "vidange",
        description: "",
        frais_maintenance: "",
        id_voiture: "",
    });
    const { flash } = usePage().props;

    const [editId, setEditId] = useState(null);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editId) {
            put(`/maintenances/${editId}`, data);
        } else {
            post("/maintenances", data);
        }
    };

    const handleEdit = (m) => {
        setData({
            type_maintenance: m.type_maintenance,
            frais_maintenance: m.frais_maintenance,
            description: m.description,
            id_voiture: m.id_voiture,
        });
        setEditId(m.id);
    };

    const handleDelete = (id) => {
        if (confirm("Confirmer la suppression ?")) {
            destroy(`/maintenances/${id}`);
        }
    };

    useEffect(() => {
        if (flash.success) {
            setData({
                type_maintenance: "vidange",
                description: "",
                frais_maintenance: "",
                id_voiture: "",
            });
            setEditId(null)
        }
    }, [flash]);

    const [filter, setFilter] = useState('');

    const filteredMaintenances = maintenances.filter(m =>
        m.matricule.toLowerCase().startsWith(filter.toLowerCase())
    );

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

            <h3 className="text-4xl font-extrabold tracking-tight text-gray-900">Gèrer une Maintenance</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white rounded-xl shadow p-6">

                <div className="md:col-span-3">
                    <label className="block text-sm font-medium mb-1">Type de maintenance</label>

                    <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                        name="type_maintenance"
                        value={data.type_maintenance}
                        onChange={handleChange}
                        required
                    >
                        <option value="vidange">Vidange</option>
                        <option value="reparation">Reparation</option>
                        <option value="entretien">Entretien</option>
                    </select>
                    {errors.type_maintenance && <div className="text-red-500 text-sm">{errors.type_maintenance}</div>}
                </div>

                <div className="md:col-span-3">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                        required
                    />
                    {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Frais de maintenance</label>
                    <input
                        type="number"
                        name="frais_maintenance"
                        value={data.frais_maintenance}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                        required
                    />
                    {errors.frais_maintenance && <div className="text-red-500 text-sm">{errors.frais_maintenance}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Voiture</label>
                    <select
                        name='id_voiture'
                        value={data['id_voiture']}
                        onChange={(e) => setData('id_voiture', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                        required
                    >
                        <option value="">-- Sélectionner une voiture --</option>
                        {voitures.map(v => (
                            <option key={v.id} value={v.id}>
                                {v.matricule}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="col-span-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                    {editId ? "Modifier" : "Ajouter"} Maintenance
                </button>

            </form>

            <section className="mb-8">
                <label htmlFor="filter" className="block mb-2 font-semibold text-gray-700">Filtrer par matricule :</label>
                <input
                    id="filter"
                    type="text"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    placeholder="Recherche par matricule..."
                    className="w-full max-w-md rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </section>

            <h3 className="text-4xl font-extrabold tracking-tight text-gray-900">Liste des maintenances</h3>
            {filteredMaintenances.length === 0 ? (
                <p className="text-gray-500">Aucune maintenance enregistrée.</p>
            ) : (
                <table className="w-full text-left text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-300">
                            <th className="py-2 px-4 font-semibold text-gray-700">Type</th>
                            <th className="py-2 px-4 font-semibold text-gray-700">Description</th>
                            <th className="py-2 px-4 font-semibold text-gray-700">Frais</th>
                            <th className="py-2 px-4 font-semibold text-gray-700">Matricule</th>
                            <th className="py-2 px-4 font-semibold text-gray-700">Modèle</th>
                            <th className="py-2 px-4 font-semibold text-gray-700 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMaintenances.map((m) => (
                            <tr key={m.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-2 px-4">{m.type_maintenance}</td>
                                <td className="py-2 px-4">{m.description}</td>
                                <td className="py-2 px-4">{m.frais_maintenance} DH</td>
                                <td className="py-2 px-4">{m.matricule}</td>
                                <td className="py-2 px-4">{`${m.marque} ${m.modele}`}</td>
                                <td className="px-4 py-3 text-sm text-gray-700 flex gap-3 justify-center">
                                    <button
                                        onClick={() => handleEdit(m)}
                                        className="p-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                                        title="Modifier"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(m.id)}
                                        className="p-1 rounded bg-red-600 text-white hover:bg-red-700"
                                        title="Supprimer"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </motion.div>
    );
}
