import { useState, useMemo } from "react";
import { BarChart, Users, Car, Coins, ClipboardList } from "lucide-react";
import Chart from './chart';
import { motion, AnimatePresence } from "framer-motion";
import { router, usePage, Head } from "@inertiajs/react";

export default function ApercuDashboard({ voitures, clients, credits, accounts, avances, promotions, postes, taches, annee, caMensuel }) {
  const [search, setSearch] = useState('');
  const { auth } = usePage().props;
  const user = auth.user;
  const { flash } = usePage().props

  const chiffreAffaire = useMemo(() => voitures.reduce((total, voiture) => {
    if (voiture.cin_client && voiture.prix_vente) {
      return total + Number(voiture.prix_vente);
    }
    return total;
  }, 0), [voitures]);

  const capital = useMemo(() => voitures.reduce((total, voiture) => {
    return total + Number(voiture.prix_achat);
  }, 0), [voitures]);

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  const filteredTaches = useMemo(() => {
    if (!search.trim()) return taches;
    return taches.filter(tache =>
      tache.objectif.toLowerCase().startsWith(search.toLowerCase())
    );
  }, [search, taches]);

  const adminCards = [
    { label: "Chiffre d'affaire", value: chiffreAffaire.toLocaleString() + " MAD", icon: <Coins className="w-6 h-6 text-yellow-500" /> },
    { label: "Capital", value: capital.toLocaleString() + " MAD", icon: <Coins className="w-6 h-6 text-red-500" /> },
    { label: "Postes", value: postes.length.toLocaleString(), icon: <ClipboardList className="w-6 h-6 text-teal-500" /> },
  ];

  const commonCards = [
    { label: "Employés", value: accounts.length.toLocaleString(), icon: <Users className="w-6 h-6 text-blue-500" /> },
    { label: "Clients", value: clients.length.toLocaleString(), icon: <Users className="w-6 h-6 text-green-500" /> },
    { label: "Crédits", value: credits.length.toLocaleString(), icon: <BarChart className="w-6 h-6 text-purple-500" /> },
    { label: "Avances", value: avances.length.toLocaleString(), icon: <Coins className="w-6 h-6 text-pink-500" /> },
    { label: "Promotions", value: promotions.length.toLocaleString(), icon: <BarChart className="w-6 h-6 text-indigo-500" /> },
    { label: "Voitures disponibles", value: voitures.length.toLocaleString(), icon: <Car className="w-6 h-6 text-gray-700" /> },
  ];

  const userTaches = useMemo(() => {
    return filteredTaches.filter(t => t.cin_emp_traitant === user.cin);
  }, [filteredTaches, user.cin]);

  return (
    <div className="space-y-10 p-6">
    <Head title="Dashboard | Apercu" />
    

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

      <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">L'aperçu</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {commonCards.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-white rounded-xl shadow-md p-5 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
            title={`${item.label} : ${item.value}`}
            tabIndex={0}
          >
            <div className="p-3 rounded-full bg-gray-100">
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">{item.label}</p>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
            </div>
          </div>
        ))}

        {user.role === 'admin' && adminCards.map((item, idx) => (
          <div
            key={`admin-${idx}`}
            className="flex items-center gap-4 bg-white rounded-xl shadow-md p-5 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
            title={`${item.label} : ${item.value}`}
            tabIndex={0}
          >
            <div className="p-3 rounded-full bg-gray-100">
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">{item.label}</p>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-3xl font-extrabold tracking-tight mb-4 text-gray-900">Tâches disponibles</h3>
        <input
          type="text"
          placeholder="Rechercher une tâche..."
          className="w-full mb-6 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Recherche des tâches"
        />
        {userTaches.length === 0 ? (
          <p className="text-gray-500 text-center">Aucune tâche disponible pour le moment.</p>
        ) : (

          <ul className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-blue-400">
            {userTaches.map(tache => (
              user.cin === tache.cin_emp_traitant && tache.statut != 'terminee' && (
                <li
                  key={tache.id}
                  className="border border-gray-200 rounded-lg px-5 py-3 hover:bg-blue-50 transition cursor-pointer"
                  tabIndex={0}
                  role="button"
                  aria-pressed="false"
                  onKeyDown={(e) => { if (e.key === 'Enter') alert(`Tâche: ${tache.objectif}`); }}
                  onClick={() => alert(`Tâche: ${tache.objectif}`)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-900">{tache.objectif}</span>
                    <span className="text-sm text-gray-500">{formatDate(tache.created_at)}</span>
                  </div>
                  <p className="text-gray-700">{tache.description}</p>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    router.post(`/taches/${tache.id}/terminer`, {
                      statut: 'Terminée'
                    }, {
                      preserveScroll: true,
                      onSuccess: () => console.log(`Tâche ${tache.id} terminée`)
                    });
                  }}>
                    <input
                      type="submit"
                      value="Terminé"
                      className="bg-blue-500 mt-4 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg px-4 py-2 cursor-pointer transition duration-200"
                    />
                  </form>
                </li>
              )
            ))}
          </ul>
        )}
      </div>

      {user.role === 'admin' && (
        <div className="bg-white p-6 rounded-xl shadow min-h-[350px]">
          <h3 className="text-3xl font-extrabold tracking-tight mb-4 text-gray-900">Chiffre d'affaire mensuel ({annee})</h3>
          <Chart annee={annee} caMensuel={caMensuel} className="w-full h-72" />
        </div>
      )}
    </div>
  );
}
