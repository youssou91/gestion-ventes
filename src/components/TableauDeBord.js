import React, { useState, useEffect } from 'react';
import { Line, Bar, Radar } from 'react-chartjs-2'; // Importer d'autres types de graphiques
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, RadialLinearScale, BarElement, LineElement, PointElement, Filler } from 'chart.js';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

// Enregistrer les éléments et le scale nécessaire pour le radar
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, RadialLinearScale, BarElement, LineElement, PointElement, Filler);

const TableauDeBord = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Lunettes de vue classique', color: '#FF6347' },
    { id: 2, name: 'Lunettes de lecture magnifiquement légères', color: '#1E90FF' },
    { id: 3, name: 'Lunettes de soleil aviator', color: '#32CD32' },
  ]);

  const [sales, setSales] = useState(() => {
    const savedSales = localStorage.getItem('sales');
    return savedSales ? JSON.parse(savedSales) : [];
  });

  const [selectedProduct, setSelectedProduct] = useState('');
  const [salesByPeriod, setSalesByPeriod] = useState([]);
  const [maxSales, setMaxSales] = useState(null);
  const [minSales, setMinSales] = useState(null);
  const [chartType, setChartType] = useState('line'); // Nouvel état pour le type de graphique

  const handlePeriodChange = (e) => {
    const period = e.target.value;
    setSalesByPeriod(filterSalesByPeriod(period));
  };

  const handleProductChange = (e) => {
    const productId = e.target.value;
    setSelectedProduct(productId);
  };

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value); // Changer le type de graphique
  };

  const filterSalesByPeriod = (period) => {
    const filteredSales = sales.filter((sale) => {
      const saleDate = moment(sale.saleDate);
      if (period === 'day') {
        return saleDate.isSame(moment(), 'day');
      } else if (period === 'month') {
        return saleDate.isSame(moment(), 'month');
      }
      return true;
    });
    return filteredSales;
  };

  useEffect(() => {
    if (salesByPeriod.length > 0) {
      const salesGroupedByProduct = salesByPeriod.reduce((acc, sale) => {
        if (!acc[sale.productId]) acc[sale.productId] = 0;
        acc[sale.productId] += sale.total;
        return acc;
      }, {});

      const maxProductId = Object.keys(salesGroupedByProduct).reduce((maxId, id) =>
        salesGroupedByProduct[id] > salesGroupedByProduct[maxId] ? id : maxId
      );
      const minProductId = Object.keys(salesGroupedByProduct).reduce((minId, id) =>
        salesGroupedByProduct[id] < salesGroupedByProduct[minId] ? id : minId
      );

      setMaxSales(salesGroupedByProduct[maxProductId]);
      setMinSales(salesGroupedByProduct[minProductId]);
    }
  }, [salesByPeriod]);

  const dataForChart = {
    labels: Array.from({ length: 12 }, (_, index) => moment().month(index).format('MMM')),
    datasets: products.map((product) => ({
      label: product.name,
      data: Array.from({ length: 12 }, (_, index) => sales.filter(sale => sale.productId === product.id && moment(sale.saleDate).month() === index).reduce((acc, sale) => acc + sale.total, 0)),
      borderColor: product.color,
      backgroundColor: `${product.color}80`,
      fill: true,
    })),
  };

  return (
    <div className="max-w-6xl mx-auto mt-1 p-8 bg-gray-50 rounded-3xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-3">Tableau de Bord Analytique</h2>

      <div className="flex flex-wrap justify-between gap-6 mb-8">
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">Sélectionnez un produit</label>
          <select
            value={selectedProduct}
            onChange={handleProductChange}
            className="mt-1 block w-full px-4 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">Tous les produits</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">Période</label>
          <select
            onChange={handlePeriodChange}
            className="mt-1 block w-full px-4 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            <option value="day">Aujourd'hui</option>
            <option value="month">Ce mois-ci</option>
          </select>
        </div>
      </div>

      {/* Ajout d'une section pour choisir le type de graphique */}
      <div className="w-full md:w-1/2 mb-6">
        <label className="block text-sm font-medium text-gray-700">Type de graphique</label>
        <select
          onChange={handleChartTypeChange}
          value={chartType}
          className="mt-1 block w-full px-4 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
          <option value="line">Ligne</option>
          <option value="bar">Barres</option>
          <option value="radar">Radar</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex flex-col items-center justify-center p-6 bg-green-100 rounded-2xl shadow-md">
          <FontAwesomeIcon icon={faArrowUp} size="2x" className="text-green-600 mb-4" />
          <h3 className="text-lg font-bold text-green-800">Vente Max</h3>
          <p className="text-2xl font-semibold">{maxSales ? `${maxSales} €` : 'Aucune vente'}</p>
        </div>
        <div className="flex flex-col items-center justify-center p-6 bg-red-100 rounded-2xl shadow-md">
          <FontAwesomeIcon icon={faArrowDown} size="2x" className="text-red-600 mb-4" />
          <h3 className="text-lg font-bold text-red-800">Vente Min</h3>
          <p className="text-2xl font-semibold">{minSales ? `${minSales} €` : 'Aucune vente'}</p>
        </div>
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-md">
        <h3 className="text-xl font-bold mb-6 text-gray-800">Ventes sur l'année 2024</h3>
        {chartType === 'line' && <Line data={dataForChart} />}
        {chartType === 'bar' && <Bar data={dataForChart} />}
        {chartType === 'radar' && <Radar data={dataForChart} />}
      </div>
    </div>
  );
};

export default TableauDeBord;
