import { useEffect, useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import { Edit, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Taches({ taches, accounts }) {
    const { auth, flash } = usePage().props;
    const user = auth.user;

    const { data, setData, post, put, delete: destroy, processing, reset, errors } = useForm({
        objectif: "",
        description: "",
        statut: "en cours",
        priorite: "moyenne",
        cin_emp_traitant: "",
    });

    const [editId, setEditId] = useState(null);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            put(`/taches/${editId}`, data);
        } else {
            post("/taches", data);
        }
    };

    const handleEdit = (tache) => {
        setData({
            objectif: tache.objectif,
            description: tache.description,
            statut: tache.statut,
            priorite: tache.priorite,
            cin_emp_traitant: tache.cin_emp_traitant,
        });
        setEditId(tache.id);
    };

    const handleDelete = (id) => {
        if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
            destroy(`/taches/${id}`);
        }
    };

    useEffect(() => {
        if (flash.success) {
            setData({
                objectif: "",
                description: "",
                statut: "en cours",
                priorite: "moyenne",
                cin_emp_traitant: "",
            });
            setEditId(null)
        }
    }, [flash]);

    const [filter, setFilter] = useState('');
    const filteredTaches = taches.filter(t =>
        t.objectif.toLowerCase().startsWith(filter.toLowerCase())
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

            <h3 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-8">Gèrer une tâche</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white rounded-xl shadow p-6">

                <div className="md:col-span-3">
                    <label className="block text-sm font-medium mb-1">Objectif</label>
                    <input
                        type="text"
                        name="objectif"
                        value={data.objectif}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-black/20 focus:ring-2" required
                    />
                    {errors.objectif && <div className="text-red-500 text-sm">{errors.objectif}</div>}
                </div>

                <div className="md:col-span-3">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-black/20 focus:ring-2" required
                    />
                    {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Statut</label>
                    <select
                        name="statut"
                        value={data.statut}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-black/20 focus:ring-2" required
                    >
                        <option value="en cours">En cours</option>
                        <option value="terminee">Terminée</option>
                    </select>
                    {errors.statut && <div className="text-red-500 text-sm">{errors.statut}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Priorité</label>
                    <select
                        name="priorite"
                        value={data.priorite}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-black/20 focus:ring-2" required
                    >
                        <option value="haute">Haute</option>
                        <option value="moyenne">Moyenne</option>
                        <option value="basse">Basse</option>
                    </select>
                    {errors.priorite && <div className="text-red-500 text-sm">{errors.priorite}</div>}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1 capitalize">Cin Employe</label>
                    <select
                        name='cin_emp_traitant'
                        value={data['cin']}
                        onChange={(e) => setData('cin_emp_traitant', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                    >
                        <option value="">-- Sélectionner un CIN --</option>
                        {accounts.map(emp => (
                            <option key={emp.id} value={emp.cin}>
                                {emp.nom} {emp.prenom} ({emp.cin})
                            </option>
                        ))}
                    </select>
                    {errors.cin_emp_traitant && <div className="text-red-500 text-sm">{errors.cin_emp_traitant}</div>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="col-span-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                    {processing ? "Traitement..." : editId ? "Modifier une tâche" : "Ajouter la tâche"}
                </button>

            </form>

            <section className="mb-8">
                <label htmlFor="filter" className="block mb-2 font-semibold text-gray-700">Filtrer par objectif :</label>
                <input
                    id="filter"
                    type="text"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    placeholder="Recherche par objectif..."
                    className="w-full max-w-md rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </section>

            <h3 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-8">Liste des tâches</h3>
            {filteredTaches.length === 0 ? (
                <p className="text-gray-500">Aucune tâche enregistrée.</p>
            ) : (
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr className="border-b border-gray-200">
                            <th className="py-2 px-4">Objectif</th>
                            <th className="py-2 px-4">Description</th>
                            <th className="py-2 px-4">Statut</th>
                            <th className="py-2 px-4">Priorité</th>
                            <th className="py-2 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTaches.length > 0 ? (
                            filteredTaches.map((t) => (
                                <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-2 px-4">{t.objectif}</td>
                                    <td className="py-2 px-4">{t.description}</td>
                                    <td className="py-2 px-4">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full font-medium ${t.statut === 'en attente'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : t.statut === 'en cours'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-green-100 text-green-800'
                                                }`}
                                        >
                                            {t.statut}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full font-medium ${t.priorite === 'haute'
                                                ? 'bg-red-100 text-red-800'
                                                : t.priorite === 'moyenne'
                                                    ? 'bg-orange-100 text-orange-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            {t.priorite}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 flex gap-3 justify-center">
                                        <button
                                            onClick={() => handleEdit(t)}
                                            className="p-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                                            title="Modifier"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(t.id)}
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
                                <td colSpan="5" className="py-4 text-center text-gray-400 italic">
                                    Aucune tâche trouvée.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            )}
        </motion.div>
    );
}
