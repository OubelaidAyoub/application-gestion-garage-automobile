import { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useForm, router, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Avances({ avances, clients, voitures }) {
    const { data, setData, post, put, delete: destroy, errors, processing } = useForm({
        montant: '',
        duree: '',
        date_avance: '',
        cin_client: '',
        id_voiture: '',
    });

    const [editId, setEditId] = useState(null);
    const [filter, setFilter] = useState('');
    const { flash } = usePage().props;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editId) {
            put(`/avances/${editId}`, data);
        } else {
            post('/avances', data);
        }
    };

    const handleEdit = (avance) => {
        setData({
            montant: avance.montant,
            duree: avance.duree,
            date_avance: avance.date_avance,
            cin_client: avance.cin_client,
            id_voiture: avance.id_voiture,
        });
        setEditId(avance.id);
    };

    const handleDelete = (id) => {
        if (confirm("Voulez-vous vraiment supprimer cette avance ?")) {
            destroy(`/avances/${id}`);
        }
    };


    useEffect(() => {
        if (flash.success) {
            setData({
                montant: '',
                duree: '',
                date_avance: '',
                cin_client: '',
                id_voiture: '',
            });
            setEditId(null)
        }
    }, [flash]);

    const filteredAvances = avances.filter(a =>
        a.cin_client.toLowerCase().startsWith(filter.toLowerCase())
    );

    const supVoitureAvance = (id_avance, dateDebut, duree) => {
        const debutDate = new Date(dateDebut);
        const endDate = new Date(debutDate);
        endDate.setDate(endDate.getDate() + duree);

        const todayStr = new Date().toISOString().split('T')[0];
        const endDateStr = endDate.toISOString().split('T')[0];

        if (endDateStr <= todayStr) {
            router.delete(`/avances/${id_avance}`);
        }
    };

    function joursRestants(dateDebut, duree) {
        const debutDate = new Date(dateDebut);
        const endDate = new Date(debutDate);
        endDate.setDate(endDate.getDate() + duree);

        const today = new Date();
        const diffTime = endDate - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >

            {avances.map(a => { supVoitureAvance(a.id, a.date_avance, a.duree) })}

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

            <h3 className="text-4xl font-extrabold tracking-tight text-gray-900">Gèrer une avance</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white rounded-xl shadow p-6">
                {/* Montant */}
                <div>
                    <label htmlFor="montant" className="block text-sm font-medium mb-1">Montant</label>
                    <input
                        id="montant"
                        name="montant"
                        type="number"
                        value={data.montant}
                        onChange={(e) => setData("montant", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                        required
                    />
                    {errors.montant && <p className="text-sm text-red-500 mt-1">{errors.montant}</p>}
                </div>

                {/* Durée */}
                <div>
                    <label htmlFor="duree" className="block text-sm font-medium mb-1">Durée (en jours)</label>
                    <input
                        id="duree"
                        name="duree"
                        type="number"
                        value={data.duree}
                        onChange={(e) => setData("duree", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                        required
                    />
                    {errors.duree && <p className="text-sm text-red-500 mt-1">{errors.duree}</p>}
                </div>

                {/* Date de l'avance */}
                <div>
                    <label htmlFor="date_avance" className="block text-sm font-medium mb-1">Date de l'avance</label>
                    <input
                        id="date_avance"
                        name="date_avance"
                        type="date"
                        value={data.date_avance}
                        onChange={(e) => setData("date_avance", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                        required
                    />
                    {errors.date_avance && <p className="text-sm text-red-500 mt-1">{errors.date_avance}</p>}
                </div>

                {/* CIN client */}
                <div className="flex flex-col">
                    <label htmlFor="cin_client" className="text-sm font-medium text-gray-700 mb-1 capitalize">Cin_client</label>
                    <select
                        name="cin_client"
                        value={data.cin_client}
                        onChange={(e) => setData("cin_client", e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                        required
                    >
                        <option value="">-- Sélectionner un CIN --</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.cin_client}>
                                {client.cin_client}
                            </option>
                        ))}
                    </select>
                    {errors.cin_client && <p className="text-sm text-red-500 mt-1">{errors.cin_client}</p>}
                </div>

                {/* Voiture */}
                <div className="flex flex-col">
                    <label htmlFor="id_voiture" className="text-sm font-medium text-gray-700 mb-1 capitalize">Voiture</label>
                    <select
                        name="id_voiture"
                        value={data.id_voiture}
                        onChange={(e) => setData("id_voiture", e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                        required
                    >
                        <option value="">-- Sélectionner une voiture --</option>
                        {voitures.map(v => (
                            <option key={v.id} value={v.id}>
                                {v.matricule}
                            </option>
                        ))}
                    </select>
                    {errors.id_voiture && <p className="text-sm text-red-500 mt-1">{errors.id_voiture}</p>}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={processing}
                    className="col-span-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                    {processing ? "Traitement..." : editId ? "Modifier Avance" : "Ajouter Avance"}
                </button>
            </form>


            <section className="mb-8">
                <label htmlFor="filter" className="block mb-2 font-semibold text-gray-700">Filtrer par CIN client :</label>
                <input
                    id="filter"
                    type="text"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    placeholder="Recherche par CIN client..."
                    className="w-full max-w-md rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </section>
            <h3 className="text-4xl font-extrabold tracking-tight text-gray-900">Liste des avances</h3>
            {filteredAvances.length === 0 ? (<p className="text-gray-500">Aucune avance disponible pour le moment.</p>) : (
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Montant</th>
                            <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Durée</th>
                            <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Date de recevabilité</th>
                            <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Jours Restant</th>
                            <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">CIN Client</th>
                            <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Matricule</th>
                            <th className="border-b border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAvances.map((a) => (
                            <tr key={a.id} className="hover:bg-gray-50 border-b border-gray-200">
                                <td className="px-4 py-3 text-sm text-gray-700">{a.montant} MAD</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{a.duree} jours</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{a.date_avance}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{joursRestants(a.date_avance, a.duree)} jours</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{a.cin_client}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{a.matricule}</td>
                                <td className="px-4 py-3 text-sm text-gray-700 text-center flex gap-3 justify-center">
                                    <button
                                        onClick={() => handleEdit(a)}
                                        className="p-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                                        title="Modifier"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(a.id)}
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
