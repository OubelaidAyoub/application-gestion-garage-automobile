import {
  Car, CreditCard, Wallet, User, Percent, ChartNoAxesCombined,
  Settings, Wrench, BadgeInfo, BriefcaseBusiness, ListChecks, CalendarClock
} from 'lucide-react';
import { router, usePage } from '@inertiajs/react';

export default function Sidebar({ activeSection, setActiveSection, garage }) {
  const handleLogout = () => {
    router.post('/logout');
  };

  const { auth } = usePage().props;
  const user = auth.user;
  const isAdmin = user.role === 'admin';

  return (
    <div className="w-64 h-full bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col overflow-y-auto scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-900 shadow-lg">
      <div className="p-6 border-b border-gray-700">
        <h1 className='text-3xl font-bold text-white'>{garage.nom} Dashboard</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <SidebarButton icon={<ChartNoAxesCombined size={20} />} label="Aperçu" value="apercu" {...{ activeSection, setActiveSection }} />
          <SidebarButton icon={<Car size={20} />} label="Voitures" value="voitures" {...{ activeSection, setActiveSection }} />
          <SidebarButton icon={<CreditCard size={20} />} label="Crédits" value="credit" {...{ activeSection, setActiveSection }} />
          <SidebarButton icon={<Wallet size={20} />} label="Avances" value="avances" {...{ activeSection, setActiveSection }} />
          <SidebarButton icon={<User size={20} />} label="Clients" value="clients" {...{ activeSection, setActiveSection }} />
          <SidebarButton icon={<Percent size={20} />} label="Promotions" value="promo" {...{ activeSection, setActiveSection }} />
          <SidebarButton icon={<Wrench size={20} />} label="Maintenances" value="maintenance" {...{ activeSection, setActiveSection }} />
          <SidebarButton icon={<CalendarClock size={20} />} label="Rendez-vous" value="rendez-vous" {...{ activeSection, setActiveSection }} />
          {isAdmin && (
            <>
              <SidebarButton icon={<BriefcaseBusiness size={20} />} label="Postes" value="poste" {...{ activeSection, setActiveSection }} />
              <SidebarButton icon={<Settings size={20} />} label="Employés" value="emp" {...{ activeSection, setActiveSection }} />
              <SidebarButton icon={<ListChecks size={20} />} label="Tâches" value="taches" {...{ activeSection, setActiveSection }} />
              <SidebarButton icon={<BadgeInfo size={20} />} label="Garage Info" value="garage" {...{ activeSection, setActiveSection }} />
            </>
          )}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Carwow
        </div>
      </div>
    </div>
  );
}

function SidebarButton({ icon, label, value, activeSection, setActiveSection }) {
  return (
    <li>
      <button
        onClick={() => setActiveSection(value)}
        className={`cursor-pointer w-full flex items-center text-left p-3 rounded-lg transition-colors duration-200 ease-in-out transform hover:scale-105 ${activeSection === value
          ? 'bg-white text-black shadow-md'
          : 'text-gray-300 hover:bg-gray-800'
          }`}
      >
        <span className="mr-3">{icon}</span>
        <span className="font-medium">{label}</span>
      </button>
    </li>
  );
}
