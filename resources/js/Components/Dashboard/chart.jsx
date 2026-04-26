// src/Components/Dashboard/Chart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Type } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Chart({ annee, caMensuel }) {

  const labels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

  const data = {
    labels,
    datasets: [
      {
        label: `Chiffre d’affaires ${annee}`,
        data: labels.map((_, index) => caMensuel[index + 1] || 0),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Chiffre d’affaires mensuel' },
    },
  };

  return (
    <div className="w-full max-w-4xl h-96 m-auto">
      <Bar data={data} options={options} />
    </div>
  );
}
