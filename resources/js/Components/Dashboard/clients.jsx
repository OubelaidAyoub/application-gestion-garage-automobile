import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useForm, router, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Clients({ clients }) {
    const { data, setData, post, put, reset, errors, processing } = useForm({
        cin_client: '',
        nom: '',
        prenom: '',
        adresse: '',
        telephone: '',
        email: '',
        genre: '',
        age: '',
    });

    const { flash } = usePage().props;

    const [editId, setEditId] = useState(null);
    const [filter, setFilter] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editId) {
            put(`/clients/${editId}`, data)
        }
        else {
            post('/clients', data);
        }
    };

    const handleEdit = (client) => {
        setData({
            cin_client: client.cin_client,
            nom: client.nom,
            prenom: client.prenom,
            adresse: client.adresse,
            telephone: client.telephone,
            email: client.email,
            genre: client.genre,
            age: client.age,
        });
        setEditId(client.id);
    };

    const handleDelete = (id) => {
        if (confirm("Confirmer la suppression ?")) {
            router.delete(`/clients/${id}`);
        }
    };

    useEffect(() => {
        if (flash.success) {
            setData({
                cin_client: '',
                nom: '',
                prenom: '',
                adresse: '',
                telephone: '',
                email: '',
                genre: '',
                age: '',
            });
            setEditId(null)
        }
    }, [flash]);

    const filteredClients = clients.filter(c =>
        c.cin_client.toLowerCase().startsWith(filter.toLowerCase())
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div>

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

                <h3 className="text-4xl font-extrabold mb-4 tracking-tight text-gray-900">Gèrer un client</h3>
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white rounded-xl shadow p-6"
                >
                    {[
                        { name: "cin_client", type: "text", label: "CIN" },
                        { name: "nom", type: "text", label: "Nom" },
                        { name: "prenom", type: "text", label: "Prénom" },
                        { name: "adresse", type: "text", label: "Adresse" },
                        { name: "telephone", type: "tel", label: "Téléphone" },
                        { name: "email", type: "email", label: "Email" },
                        { name: "age", type: "number", label: "Âge" },
                    ].map((field) => (
                        <div key={field.name} className="col-span-1">
                            <label htmlFor={field.name} className="block text-sm font-medium mb-1">
                                {field.label}
                            </label>
                            <input
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                value={data[field.name]}
                                onChange={(e) => setData(field.name, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                                required
                            />
                            {errors[field.name] && (
                                <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
                            )}
                        </div>
                    ))}

                    <div key="genre" className="col-span-1">
                        <label htmlFor="genre" className="block text-sm font-medium mb-1">
                            Genre
                        </label>
                        <select
                            name="genre"
                            id="genre"
                            value={data.genre}
                            onChange={(e) => setData("genre", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/70 bg-gray-50"
                        >
                            <option value="">-- Sélectionner le genre --</option>
                            <option value="Homme">Homme</option>
                            <option value="Femme">Femme</option>
                        </select>
                        {errors.genre && (
                            <p className="text-sm text-red-500 mt-1">{errors.genre}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="col-span-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                    >
                        {processing ? 'Processing...' : editId ? "Modifier le client" : "Ajouter le client"}
                    </button>

                </form>

            </div>

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

            <div>
                <h3 className="text-4xl font-extrabold mb-4 tracking-tight text-gray-900">Liste des clients</h3>
                {filteredClients.length === 0 ? (<p className="text-gray-500">Aucun client disponible pour le moment.</p>) : (
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">CIN</th>
                                <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Nom</th>
                                <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Prénom</th>
                                <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Adresse</th>
                                <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Téléphone</th>
                                <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                                <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Genre</th>
                                <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Âge</th>
                                <th className="border-b border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50 border-b border-gray-200">
                                    <td className="px-4 py-3 text-sm text-gray-700">{c.cin_client}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{c.nom}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{c.prenom}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{c.adresse}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{c.telephone}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{c.email}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{c.genre}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{c.age}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700 text-center flex gap-3 justify-center">
                                        <button
                                            onClick={() => handleEdit(c)}
                                            className="p-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                                            title="Modifier"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(c.id)}
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
            </div>
        </motion.div>
    );
}
