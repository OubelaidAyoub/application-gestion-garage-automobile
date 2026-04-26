import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useForm, router, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Credits({ credits, clients, voitures }) {

    const { data, setData, delete: destroy, processing, reset, errors } = useForm({
        montant_paye: '',
        montant_restant: '',
        date_debut: '',
        date_fin: '',
        delai_total: '',
        montant_a_rembourser: '',
        periode_remboursement: '',
        etat: 'en cours',
        cin_client: '',
        id_voiture: '',
    });

    const [editId, setEditId] = useState(null);
    const { flash } = usePage().props;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const voiture = voitures.find((v) => v.id == data.id_voiture);
        if (!voiture || voiture.prix_vente == null) {
            alert("La voiture sélectionnée n'est pas encore vendue !");
            return;
        }

        const prixVente = voiture.prix_vente;

        const montant_restant = calculeMontantRestant(prixVente, data.montant_paye);
        const delai_total = calculeDelaisTotal(montant_restant, data.montant_a_rembourser, data.periode_remboursement)
        const date_fin = calculeDateFin(data.date_debut, delai_total);
        const etat = calculeEtat(montant_restant);

        const updatedData = {
            ...data,
            date_fin,
            montant_restant,
            etat,
            delai_total,
        };

        try {
            await router.visit(editId ? `/credits/${editId}` : "/credits", {
                method: editId ? "put" : "post",
                data: updatedData,
                onSuccess: () => {
                    reset();
                    setEditId(null);
                },
            });
        } catch (err) {
            console.error("Erreur de soumission :", err);
        }
    };

    const handleEdit = (credit) => {
        setData({
            montant_paye: credit.montant_paye,
            date_debut: credit.date_debut,
            montant_a_rembourser: credit.montant_a_rembourser,
            periode_remboursement: credit.periode_remboursement,
            cin_client: credit.cin_client,
            id_voiture: credit.id_voiture,
        });
        setEditId(credit.id);
    };

    const handleDelete = (id) => {
        if (confirm("Voulez-vous supprimer ce crédit ?")) {
            destroy(`/credits/${id}`);
        }
    };

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function calculeDateFin(date_debut, delai_total) {
        const dateDebut = new Date(date_debut);
        dateDebut.setDate(dateDebut.getDate() + parseInt(delai_total));
        return dateDebut.toISOString().split('T')[0];
    }

    function calculeMontantRestant(prixVente, montantPaye) {
        return parseFloat(prixVente) - parseFloat(montantPaye);
    }

    function calculeEtat(montantRestant) {
        return montantRestant > 0 ? 'en cours' : 'remboursé';
    }

    function calculeDelaisTotal(montantRestant, montantaRembourse, periodeRemboursement) {
        return Math.ceil(montantRestant / montantaRembourse * periodeRemboursement); //Pour retoune un floar arrondi
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

            <h3 className="text-4xl font-extrabold tracking-tight text-gray-900">Gèrer un crédit</h3>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-xl shadow p-6"
            >
                {[
                    { name: "montant_paye", type: "number", label: "Montant payé (DH)" },
                    { name: "date_debut", type: "date", label: "Date de début du crédit" },
                    { name: "montant_a_rembourser", type: "number", label: "Montant à rembourser" },
                    { name: "periode_remboursement", type: "number", label: "Période de remboursement (jours)" },
                ].map(({ name, type, label }) => (
                    <div key={name} className="flex flex-col gap-1">
                        <label htmlFor={name} className="text-sm font-medium text-gray-700">
                            {capitalizeFirstLetter(label)}
                        </label>
                        <input
                            id={name}
                            name={name}
                            type={type}
                            value={data[name]}
                            onChange={(e) => setData(name, e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                            required
                        />
                        {errors[name] && (
                            <span className="text-sm text-red-500">{errors[name]}</span>
                        )}
                    </div>
                ))}

                <div className="flex flex-col gap-1">
                    <label htmlFor="cin_client" className="text-sm font-medium text-gray-700">
                        CIN client
                    </label>
                    <select
                        id="cin_client"
                        name="cin_client"
                        value={data['cin_client']}
                        onChange={(e) => setData('cin_client', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                    >
                        <option value="">-- Sélectionner un CIN --</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.cin_client}>
                                {client.cin_client} {client.nom} {client.prenom}
                            </option>
                        ))}
                    </select>
                    {errors.cin_client && (
                        <span className="text-sm text-red-500">{errors.cin_client}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="id_voiture" className="text-sm font-medium text-gray-700 capitalize">
                        Matricule voiture
                    </label>
                    <select
                        id="id_voiture"
                        name="id_voiture"
                        value={data['id_voiture']}
                        onChange={(e) => setData('id_voiture', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                    >
                        <option value="">-- Sélectionner une voiture --</option>
                        {voitures.map((voiture) => (
                            <option key={voiture.id} value={voiture.id}>
                                {voiture.matricule} - {voiture.marque} {voiture.modele} ({voiture.annee})
                            </option>
                        ))}
                    </select>
                    {errors.id_voiture && (
                        <span className="text-sm text-red-500">{errors.id_voiture}</span>
                    )}
                </div>

                <button
                    disabled={processing}
                    type="submit"
                    className="col-span-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                    {processing ? "Traitement..." : editId ? "Modifier Crédit" : "Ajouter Crédit"}
                </button>
            </form>

            <h3 className="text-4xl font-extrabold tracking-tight text-gray-900">Liste des crédits</h3>

            {credits.length === 0 ? (
                <p className="text-gray-500">Aucun crédit disponible pour le moment.</p>
            ) : (
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            {["Payé", "Restant", "Début", "Fin", "Délai total", "À rembourser chaque période", "Période", "CIN", "Voiture", "État", "Actions"].map((header) => (
                                <th key={header} className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {credits.length > 0 ? (
                            credits.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50 border-b border-gray-200">
                                    <td className="px-4 py-3 text-sm text-gray-700">{c.montant_paye} DH</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{c.montant_restant} DH</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{c.date_debut}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{c.date_fin}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{c.delai_total} jours</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{c.montant_a_rembourser} DH</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{c.periode_remboursement} jours</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{c.cin_client}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {'[' + c.matricule + ']'} - {c.marque} {c.modele}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${c.etat === 'en cours' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                            }`}>
                                            {c.etat === 'en cours' ? "En cours" : "Remboursé"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 flex gap-3 justify-center">
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
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="text-center py-4 text-gray-400 italic">
                                    Aucun crédit trouvé.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            )}
        </motion.div>
    );
}
