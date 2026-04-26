import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { router, useForm, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Promotion({ promotions, voitures, voituresPromotionnees }) {

  const [editId, setEditId] = useState(null);
  const [selectedCars, setSelectedCars] = useState([]);
  const { flash } = usePage().props;

  const [selectedPromo, setSelectedPromo] = useState('')

  const { data, setData, post, put, delete: destroy, errors, processing } = useForm({
    nom: "",
    description: "",
    date_debut: "",
    date_fin: "",
    pourcentage_reduction: "",
  });


  function Submit(e) {
    e.preventDefault();
    if (!data.nom.trim() || !data.description.trim()) return;
    if (editId) {
      put(`/promotions/${editId}`, data);
    } else {
      post('/promotions', data);
    }
  }

  const handleDelete = (id) => {
    if (confirm("Confirmer la suppression ?")) {
      destroy(`/promotions/${id}`);
    }
  };

  const handleEdit = (promo) => {
    setData({
      nom: promo.nom,
      description: promo.description,
      date_debut: promo.date_debut,
      date_fin: promo.date_fin,
      pourcentage_reduction: promo.pourcentage_reduction,
    });
    setEditId(promo.id);
  };

  const assignPromotion = () => {
    if (!selectedPromo || selectedCars.length === 0) return;

    router.post('/promotionner', {
      promotion_id: selectedPromo,
      voiture_ids: selectedCars,
    }, {
      onSuccess: () => {
        setSelectedCars([]);
        setSelectedPromo('');
      },
    });
  };

  useEffect(() => {
    if (flash.success) {
      setData({
        nom: "",
        description: "",
        date_debut: "",
        date_fin: "",
        pourcentage_reduction: "",
      });
      setEditId(null)
    }
  }, [flash]);

  function prixApresReduction(prixOriginal, pourcentageReduction) {
    return prixOriginal * (1 - pourcentageReduction / 100);
  }

  const [filter, setFilter] = useState("")
  const filteredPromotions = promotions.filter(p =>
    p.nom.toLowerCase().startsWith(filter.toLowerCase())
  );

  const [filter1, setFilter1] = useState("")
  const filteredCarsPromotioned = voituresPromotionnees.filter(vp =>
    vp.matricule.toLowerCase().startsWith(filter1.toLowerCase())
  );

  const supVoiturePromotionnee = (id_voiture, date_fin) => {
    const today = new Date().toISOString().split('T')[0]
    const endDate = new Date(date_fin).toISOString().split('T')[0]

    if (endDate <= today) {
      router.post(`deletePromo/${id_voiture}`);
      alert('La voiture ne peut pas être affectée car la date de fin de la promo est expirée')
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >

      {useEffect(() => {
        voituresPromotionnees.forEach(vp => {
          supVoiturePromotionnee(vp.id_voiture, vp.date_fin);
        });
      }, [voituresPromotionnees])}

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

      <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">Gèrer une promotion</h2>

      <form onSubmit={Submit} className="bg-white rounded-xl shadow p-6 space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(data).map((key) => (
            <div key={key} className="flex flex-col space-y-1">
              <label htmlFor={key} className="text-sm font-medium capitalize text-gray-700">
                {key.replace(/_/g, ' ')}
              </label>
              <input
                id={key}
                name={key}
                type={key.includes('date') ? 'date' : key === 'pourcentage_reduction' ? 'number' : 'text'}
                value={data[key]}
                onChange={(e) => setData(key, e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                required
              />
              {errors[key] && <span className="text-sm text-red-500">{errors[key]}</span>}
            </div>
          ))}
          <button
            type="submit"
            disabled={processing}
            className="col-span-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {processing ? 'Traitement...' : editId ? "Modifier la promotion" : "Ajouter la promotion"}
          </button>
        </div>

      </form>

      <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">Attribuer une promotion aux voitures</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow">
        <select
          value={selectedPromo}
          onChange={(e) => setSelectedPromo(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Choisir une promotion</option>
          {promotions.map((promo, i) => (
            <option key={i} value={promo.id}>{promo.nom}</option>
          ))}
        </select>

        <select
          multiple
          value={selectedCars}
          onChange={(e) =>
            setSelectedCars(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="px-3 py-2 border border-gray-300 rounded-md h-32"
        >
          <option disabled>Voitures disponibles</option>
          {voitures.map((car, i) => (
            <option key={i} value={car.id}>{car.marque + ' ' + car.modele + ' --- ' + car.matricule}</option>
          ))}
        </select>

        <button onClick={assignPromotion} className="col-span-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition">
          Attribuer Promotion
        </button>

      </div>

      <section className="mb-8">
        <label htmlFor="filter" className="block mb-2 font-semibold text-gray-700">Filtrer par nom de la promotion :</label>
        <input
          id="filter"
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Recherche par nom de la promotion..."
          className="w-full max-w-md rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </section>

      <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">Liste des promotions</h2>
      {filteredPromotions.length === 0 ? <p className="text-gray-500">Aucune promotion est disponible</p> :
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Nom</th>
              <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
              <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Date début</th>
              <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Date fin</th>
              <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Réduction</th>
              <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPromotions.map((promo, i) => (
              <tr key={i} className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3 text-sm text-gray-700">{promo.nom}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{promo.description}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{promo.date_debut}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{promo.date_fin}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{promo.pourcentage_reduction}%</td>
                <td className="px-4 py-3 text-sm text-gray-700 flex gap-3">
                  <button
                    onClick={() => handleEdit(promo)}
                    className="p-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                    title="Modifier"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(promo.id)}
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

      }

      <section className="mb-8">
        <label htmlFor="filter1" className="block mb-2 font-semibold text-gray-700">Filtrer par matricule :</label>
        <input
          id="filter1"
          type="text"
          value={filter1}
          onChange={e => setFilter1(e.target.value)}
          placeholder="Recherche par matricule..."
          className="w-full max-w-md rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </section>

      <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">Voitures Promotionnées</h2>

      {filteredCarsPromotioned.length === 0 ? <p className="text-gray-500">Aucune voiture promotionnee est disponible</p> :
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Matricule</th>
              <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Marque</th>
              <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Modèle</th>
              <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Prix d'achat</th>
              <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Prix proposé</th>
              <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Promotion</th>
              <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Réduction</th>
              <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Prix avec réduction</th>
              <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Date début</th>
              <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Date fin</th>
            </tr>
          </thead>
          <tbody>
            {filteredCarsPromotioned.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 border-b border-gray-200">
                <td className="px-4 py-3 text-sm text-gray-700">{item.matricule}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.marque}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.modele}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.prix_achat} MAD</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.prix_propose} MAD</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.promotion_nom}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.pourcentage_reduction}%</td>
                <td className="px-4 py-3 text-sm font-semibold text-green-700">{prixApresReduction(item.prix_propose, item.pourcentage_reduction)} DH</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.date_debut}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.date_fin}</td>
              </tr>
            ))}
          </tbody>
        </table>

      }
    </motion.div>
  );
}
