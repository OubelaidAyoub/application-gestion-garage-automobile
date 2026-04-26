import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../Components/Dashboard/Sidebar';
import { usePage } from '@inertiajs/react';
import { Helmet } from 'react-helmet';

import Voiture from '../Components/Dashboard/voitures';
import Credit from '../Components/Dashboard/credits';
import Avance from '../Components/Dashboard/avances';
import Client from '../Components/Dashboard/clients';
import Promo from '../Components/Dashboard/promotions';
import Maintenance from '../Components/Dashboard/maintenance';
import Emp from '../Components/Dashboard/employees';
import Garage from '../Components/Dashboard/garage';
import Poste from '../Components/Dashboard/postes';
import Tache from '../Components/Dashboard/taches';
import ApercuDashboard from '../Components/Dashboard/apercu';
import Contact from '../Components/Dashboard/contacts';
import Profile from '../Components/Dashboard/profile'

export default function Dashboard() {
  const { 
    promotions, garage, clients, avances, voitures, credits, maintenances, accounts, postes, voituresPromotionnees, taches, annee, caMensuel, contacts
  } = usePage().props;

  const [activeSection, setActiveSection] = useState(() => {
    return localStorage.getItem('activeSection') || 'apercu';
  });

  localStorage.setItem('activeSection', activeSection)

  const { auth } = usePage().props

  return (
    <div className="flex h-screen bg-white">
      <Helmet>
        <title>Dashboard | Carwow</title>
      </Helmet>
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} garage={garage} />

      <main className="flex-1 overflow-y-auto p-8">
        <Profile  user={auth.user}/>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          {activeSection === 'apercu' && (
            <ApercuDashboard
              voitures={voitures}
              clients={clients}
              credits={credits}
              accounts={accounts}
              avances={avances}
              promotions={promotions}
              postes={postes}
              taches={taches}
              annee={annee}
              caMensuel={caMensuel}
            />
          )}
          {activeSection === 'voitures' && <Voiture voitures={voitures} clients={clients} />}
          {activeSection === 'credit' && <Credit credits={credits} voitures={voitures} clients={clients} />}
          {activeSection === 'avances' && <Avance avances={avances} clients={clients} voitures={voitures} />}
          {activeSection === 'clients' && <Client clients={clients} />}
          {activeSection === 'promo' && <Promo promotions={promotions} voitures={voitures} voituresPromotionnees={voituresPromotionnees} />}
          {activeSection === 'maintenance' && <Maintenance maintenances={maintenances} voitures={voitures} />}
          {activeSection === 'emp' && <Emp accounts={accounts} postes={postes} />}
          {activeSection === 'taches' && <Tache taches={taches} accounts={accounts} />}
          {activeSection === 'poste' && <Poste postes={postes} />}
          {activeSection === 'rendez-vous' && <Contact contacts={contacts} />}
          {activeSection === 'garage' && <Garage garage={garage} />}
        </motion.div>
      </main>
    </div>
  );
}
