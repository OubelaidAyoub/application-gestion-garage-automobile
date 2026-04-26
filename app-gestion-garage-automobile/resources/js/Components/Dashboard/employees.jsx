import { useEffect, useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Employees({ accounts, postes }) {
    const { flash } = usePage().props;
    const [pwdVerif, setPwdVerif] = useState('');
    const [editId, setEditId] = useState(null);
    const [pwdValidation, setPwdValidation] = useState('')
    const [showPassword, setShowPassword] = useState('')

    const { data, setData, post, put, delete: destroy, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        cin: '',
        nom: '',
        prenom: '',
        age: '',
        adresse: '',
        genre: '',
        telephone: '',
        role: '',
        id_poste: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editId) {
            put(`/users/${editId}`, data);
        } else {
            if (pwdVerif === data.password) {
                post('/users', data);
            } else {
                setData('password', '')
                setPwdVerif('')
                setPwdValidation('Le mot de passe n\'est pas bien confirmé')
            }
        }
    };

    const handleEdit = (account) => {
        setData({
            name: account.name,
            email: account.email,
            password: account.password,
            cin: account.cin,
            nom: account.nom,
            prenom: account.prenom,
            age: account.age,
            adresse: account.adresse,
            genre: account.genre,
            telephone: account.telephone,
            role: account.role,
            id_poste: account.id_poste,
        });
        setPwdVerif(account.password);
        setEditId(account.id);
    };

    const handleDelete = (id) => {
        if (confirm("Confirmer la suppression ?")) {
            destroy(`/users/${id}`);
        }
    };

    useEffect(() => {
        if (flash.success) {
            setData({
                name: '',
                email: '',
                password: '',
                cin: '',
                nom: '',
                prenom: '',
                age: '',
                adresse: '',
                genre: '',
                telephone: '',
                role: '',
                id_poste: '',
            });
        }
        setEditId(null)
        setPwdValidation('')
        setPwdVerif('');
    }, [flash]);

    const [filter, setFilter] = useState('');
    const filteredEmployees = accounts.filter(e =>
        e.cin.toLowerCase().startsWith(filter.toLowerCase())
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

            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-8">Gèrer des employés</h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white mb-8 rounded-xl shadow p-8 space-y-8 max-w-6xl mx-auto">
                <h2 className="text-xl font-semibold text-gray-800">{editId ? "Modifier un employé" : "Ajouter un employé"}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur</label>
                            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className={input} required />
                            {errors.nom && <div className="text-red-500 text-sm">{errors.nom}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className={input} required />
                            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    required
                                    className="w-full pr-10 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vérification mot de passe</label>
                            <input type="password" value={pwdVerif} onChange={e => setPwdVerif(e.target.value)} className={input} required />
                            {pwdValidation && <div className="text-red-500 text-sm">{pwdValidation}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CIN</label>
                            <input type="text" value={data.cin} onChange={e => setData('cin', e.target.value)} className={input} required />
                            {errors.cin && <div className="text-red-500 text-sm">{errors.cin}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                            <input type="text" value={data.nom} onChange={e => setData('nom', e.target.value)} className={input} required />
                            {errors.nom && <div className="text-red-500 text-sm">{errors.nom}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                            <input type="text" value={data.prenom} onChange={e => setData('prenom', e.target.value)} className={input} required />
                            {errors.prenom && <div className="text-red-500 text-sm">{errors.prenom}</div>}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Âge</label>
                            <input type="number" value={data.age} onChange={e => setData('age', e.target.value)} className={input} required />
                            {errors.age && <div className="text-red-500 text-sm">{errors.age}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                            <input type="text" value={data.adresse} onChange={e => setData('adresse', e.target.value)} className={input} required />
                            {errors.adresse && <div className="text-red-500 text-sm">{errors.adresse}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                            <select value={data.genre} onChange={e => setData('genre', e.target.value)} className={input} required >
                                <option value="">-- Sélectionner le genre --</option>
                                <option value="Homme">Homme</option>
                                <option value="Femme">Femme</option>
                            </select>
                            {errors.genre && <div className="text-red-500 text-sm">{errors.genre}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                            <input type="text" value={data.telephone} onChange={e => setData('telephone', e.target.value)} className={input} required />
                            {errors.telephone && <div className="text-red-500 text-sm">{errors.telephone}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <select value={data.role} onChange={e => setData('role', e.target.value)} className={input} required >
                                <option value="">-- Sélectionner un role --</option>
                                <option value="user">Utilisateur</option>
                                <option value="admin">Administrateur</option>
                            </select>
                            {errors.role && <div className="text-red-500 text-sm">{errors.role}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
                            <select name="id_poste" value={data.id_poste} onChange={e => setData('id_poste', e.target.value)} className={input} required >
                                <option value="">-- Sélectionner un poste --</option>
                                {postes.map(p => (
                                    <option key={p.id} value={p.id}>
                                        {p.nom_poste}
                                    </option>
                                ))}
                            </select>
                            {errors.id_poste && <div className="text-red-500 text-sm">{errors.id_poste}</div>}
                        </div>
                    </div>
                    <button type="submit" className="col-span-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition">
                        {processing ? 'Traitement...' : editId ? "Modifier le compte employé" : "Ajouter un compte employé"}
                    </button>
                </div>

            </form>

            <section className="mb-8">
                <label htmlFor="filter" className="block mb-2 font-semibold text-gray-700">Filtrer par CIN :</label>
                <input
                    id="filter"
                    type="text"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    placeholder="Recherche par CIN..."
                    className="w-full max-w-md rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </section>
            <h2 className="text-xl font-semibold mt-10 mb-4 text-gray-700">Liste des employés</h2>

            <div className="overflow-x-auto bg-white shadow">
                {filteredEmployees.lenght === 0 ? 'Aucun compte employé est disponible' :
                    <table className="min-w-full text-sm text-left divide-y divide-gray-200 border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                {[
                                    "Nom d'utilisateur", "Email", "CIN", "Nom", "Prénom",
                                    "Âge", "Adresse", "Genre", "Téléphone", "Rôle", "ID Poste", "Actions"
                                ].map((header, idx) => (
                                    <th key={idx} className={`px-4 py-3 ${["Âge", "ID Poste", "Actions"].includes(header) ? "text-center" : "text-left"} text-sm font-semibold text-gray-700`}>
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 divide-y divide-gray-100">
                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map((acc) => (
                                    <tr key={acc.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">{acc.name}</td>
                                        <td className="px-4 py-3">{acc.email}</td>
                                        <td className="px-4 py-3">{acc.cin}</td>
                                        <td className="px-4 py-3">{acc.nom}</td>
                                        <td className="px-4 py-3">{acc.prenom}</td>
                                        <td className="px-4 py-3 text-center">{acc.age}</td>
                                        <td className="px-4 py-3">{acc.adresse}</td>
                                        <td className="px-4 py-3">{acc.genre}</td>
                                        <td className="px-4 py-3">{acc.telephone}</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${acc.role === 'admin' ? 'bg-red-100 text-red-800'
                                                : acc.role === 'user' ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-200 text-gray-700'
                                                }`}>
                                                {acc.role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">{acc.id_poste}</td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(acc)}
                                                    className="p-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                                                    title="Modifier"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(acc.id)}
                                                    className="p-1 rounded bg-red-600 text-white hover:bg-red-700"
                                                    title="Supprimer"
                                                >
                                                    <Trash2 size={16} />
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="12" className="text-center py-4 text-gray-400 italic">
                                        Aucun employé trouvé.
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

const input = "border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-900";
