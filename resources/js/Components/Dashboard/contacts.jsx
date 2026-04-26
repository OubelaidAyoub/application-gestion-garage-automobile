import React, { useState } from 'react';
import { motion } from "framer-motion";

export default function RendezVousTable({ contacts }) {

  const [filter, setFilter] = useState('');
  const filteredRendezVous = contacts.filter(c =>
    c.telephone.toLowerCase().startsWith(filter.toLowerCase())
  );


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >

      <section className="mb-8">
        <label htmlFor="filter" className="block mb-2 font-semibold text-gray-700">Filtrer par num tel :</label>
        <input
          id="filter"
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Recherche par num tel..."
          className="w-full max-w-md rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </section>

      <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-8">Liste des rendez-vous</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Nom</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Email</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Téléphone</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Date</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Heure</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Message</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Matricule</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Modèle</th>
            </tr>
          </thead>
          <tbody>
            {filteredRendezVous.length > 0 ? (
              filteredRendezVous.map((rdv, index) => (
                <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">{rdv.nom}</td>
                  <td className="px-4 py-2">{rdv.email}</td>
                  <td className="px-4 py-2">{rdv.telephone}</td>
                  <td className="px-4 py-2">{rdv.date}</td>
                  <td className="px-4 py-2">{rdv.temps}</td>
                  <td className="px-4 py-2">{rdv.message || '—'}</td>
                  <td className="px-4 py-2">{rdv.matricule}</td>
                  <td className="px-4 py-2">{rdv.marque + ' ' + rdv.modele}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-4 text-center text-gray-500 italic">
                  Aucun rendez-vous trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </motion.div>
  );
}
