import { useEffect, useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import { Edit, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Voitures({ voitures, clients }) {

    const { data, setData, put, reset, progress, processing } = useForm({
        matricule: "",
        marque: "",
        modele: "",
        annee: 2025,
        kilometrage: "",
        description: "",
        prix_achat: "",
        prix_vente: "",
        prix_propose: "",
        date_achat: "",
        date_vente: "",
        etat: "",
        couleur: "",
        boite_vitesse: "",
        carburant: "",
        nombre_portes: 5,
        nombre_places: 5,
        type_vehicule: "",
        puissance_fiscale: 8,
        puissance_moteur: 190,
        equipement: "",
        images: [],
        cin_client: null,
    });
    const { flash } = usePage().props;
    const { errors } = usePage().props

    const [filter, setFilter] = useState('');
    const filteredVoitures = voitures.filter(v =>
        v.matricule.toLowerCase().startsWith(filter.toLowerCase())
    );

    const formTypes = {
        matricule: "text",
        marque: "text",
        modele: "text",
        annee: "number",
        kilometrage: "number",
        description: "text",
        prix_achat: "number",
        prix_vente: "number",
        prix_propose: "number",
        date_achat: "date",
        date_vente: "date",
        etat: "select",
        couleur: "text",
        boite_vitesse: "select",
        carburant: "select",
        nombre_portes: "number",
        nombre_places: "select",
        type_vehicule: "select",
        puissance_fiscale: "number",
        puissance_moteur: "number",
        equipement: "text",
        images: "file",
    };

    const selectOptions = {
        etat: ["neuf", "occasion"],
        boite_vitesse: ["manuelle", "automatique"],
        carburant: ["essence", "diesel", "électrique", "hybride"],
        nombre_places: [2, 3, 5],
        type_vehicule: ["coupé", "berline", "break", "cabriolet", "limousine", "SUV"],
    };

    const [editId, setEditId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editId) {
            router.post(`/voitures/${editId}`, {
                ...data,
                _method: 'put',
            }, {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    setEditId(null);
                },
            });
        } else {
            router.post("/voitures", data, {
                forceFormData: true,
                onSuccess: () => reset(),
            });
        }
    };

    const handleEdit = (voiture) => {
        setData({ ...voiture, images: "" });
        setEditId(voiture.id);
    }

    const handleDelete = (id) => {
        if (confirm("Confirmer la suppression ?")) {
            router.delete(`/voitures/${id}`);
        }
    }

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

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

            <h3 className="text-4xl font-extrabold tracking-tight text-gray-900">Gèrer une voiture</h3>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white rounded-xl shadow-lg p-6"
                encType="multipart/form-data"
            >
                {Object.keys(formTypes).map((field) => (
                    <div key={field} className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">
                            {['equipement', 'cin_client', 'date_vente', 'prix_propose', 'prix_vente', 'description'].includes(field)
                                ? capitalizeFirstLetter(field) + ' (optionnel)'
                                : capitalizeFirstLetter(field.replace("_", " "))}

                        </label>
                        {formTypes[field] === "select" ? (
                            <select
                                name={field}
                                value={data[field]}
                                onChange={(e) => setData(field, e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">-- Choisir --</option>
                                {selectOptions[field]?.map((option) => (
                                    <option key={option} value={option}>
                                        {String(option).charAt(0).toUpperCase() + String(option).slice(1)}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                name={field}
                                type={formTypes[field] || "text"}
                                value={field === "images" ? undefined : data[field]}
                                onChange={(e) =>
                                    field === "images"
                                        ? setData(field, Array.from(e.target.files))
                                        : setData(field, e.target.value)
                                }
                                {...(field === "images" ? { multiple: true, accept: "image/*" } : {})}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required={["matricule", "marque", "modele", "annee", "kilometrage", "prix_achat", "date_achat", "etat", "couleur", "boite_vitesse", "carburant", "nombre_portes", "nombre_places", "puissance_fiscale", "type_vehicule", "puissance_moteur", "images"].includes(field)}
                            />
                        )}
                        {errors.field && (
                            <span className="text-red-500 text-xs mt-1">{errors.field}</span>
                        )}

                    </div>
                ))}

                <div className="flex flex-col">
                    <label htmlFor="cin_client" className="text-sm font-semibold text-gray-700 mb-1">Cin client (optionnel)</label>
                    <select
                        name='cin_client'
                        value={data['cin_client']}
                        onChange={(e) => setData('cin_client', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">-- Sélectionner un CIN --</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.cin_client}>
                                {client.cin_client}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="col-span-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                    {processing ? 'Traitement en cours...' : (editId ? "Mettre à jour la Voiture" : "Ajouter la Voiture")}
                </button>

                {progress && (
                    <div className="col-span-full mt-2 text-sm text-green-500 from-blue-600 to-blue-800">
                        Téléchargement en cours : {progress.percentage}%
                    </div>
                )}
            </form>

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mb-8"
            >
                <label htmlFor="filter" className="block mb-2 font-semibold text-gray-700">Filtrer par matricule :</label>
                <input
                    id="filter"
                    type="text"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    placeholder="Recherche par matricule..."
                    className="w-full max-w-md rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </motion.section>

            <h3 className="text-4xl font-extrabold tracking-tight text-gray-900">Liste des voitures</h3>

            {filteredVoitures.length === 0 ? (
                <p className="text-gray-500 italic">Aucune voiture disponible.</p>
            ) : (
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Matricule
                            </th>
                            <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Modèle
                            </th>
                            <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Prix Achat
                            </th>
                            <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Prix Proposé
                            </th>
                            <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Disponibilité
                            </th>
                            <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVoitures.map((v) => (
                            <tr
                                key={v.id}
                                className="hover:bg-gray-50 border-b border-gray-200"
                            >
                                <td className="px-4 py-3 text-sm text-gray-700">{v.matricule}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{v.marque} {v.modele}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{v.prix_achat} MAD</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{v.prix_propose ? `${v.prix_propose} MAD` : 'Pas définie'}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${v.cin_client
                                            ? "bg-red-100 text-red-700"
                                            : "bg-green-100 text-green-700"
                                            }`}
                                    >
                                        {v.cin_client ? "Vendue" : "Disponible"}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 flex gap-3">

                                    <button
                                        onClick={() => handleEdit(v)}
                                        className="p-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                                        title="Modifier"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(v.id)}
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
