import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Filler } from 'chart.js';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';


ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Filler);

const TableauDeBord = () => {
  // Liste des produits
  const [products, setProducts] = useState([
    { id: 1, name: 'Lunettes de vue classique', color: '#FF6347' }, // Tomate
    { id: 2, name: 'Lunettes de lecture magnifiquement légères', color: '#1E90FF' }, // Bleu Dodger
    { id: 3, name: 'Lunettes de soleil aviator', color: '#32CD32' }, // Vert Lime
  ]);

  // Liste des ventes
  const [sales, setSales] = useState(() => {
    const savedSales = localStorage.getItem('sales');
    return savedSales ? JSON.parse(savedSales) : [];
  });

  // Variables d'état pour la période et le graphique
  const [selectedProduct, setSelectedProduct] = useState('');
  const [salesByPeriod, setSalesByPeriod] = useState([]);
  const [maxSales, setMaxSales] = useState(null);
  const [minSales, setMinSales] = useState(null);

  // Filtrer les ventes selon la période (jour/mois)
  const handlePeriodChange = (e) => {
    const period = e.target.value;
    setSalesByPeriod(filterSalesByPeriod(period));
  };

  // Filtrer les ventes par produit
  const handleProductChange = (e) => {
    const productId = e.target.value;
    setSelectedProduct(productId);
  };

  // Filtrer les ventes selon la période
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

  // Calcul des ventes maximales et minimales
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

  // Graphique des ventes sur l'année 2024
  const dataForChart = {
    labels: Array.from({ length: 12 }, (_, index) => moment().month(index).format('MMM')),
    datasets: products.map((product) => ({
      label: product.name,
      data: Array.from({ length: 12 }, (_, index) => sales.filter(sale => sale.productId === product.id && moment(sale.saleDate).month() === index).reduce((acc, sale) => acc + sale.total, 0)),
      borderColor: product.color, // Couleur spécifique au produit
      backgroundColor: `${product.color}80`, // Une version plus transparente pour le fond
      fill: true, // Le remplissage est activé
    })),
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Tableau de Bord Analytique</h2>

      {/* Sélecteur de produit et période */}
      <div className="mb-6">
        <label className="block text-gray-700">Sélectionnez un produit</label>
        <select
          value={selectedProduct}
          onChange={handleProductChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Sélectionner un produit</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700">Période</label>
        <select
          onChange={handlePeriodChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="day">Aujourd'hui</option>
          <option value="month">Ce mois-ci</option>
        </select>
      </div>

      {/* Ventes maximales et minimales */}
      <div className="flex justify-between mb-6">
        <div className="p-4 bg-green-200 rounded-lg w-1/2 text-center">
          <h3 className="font-bold text-green-700">Vente Max</h3>
          <p>{maxSales ? `${maxSales} €` : 'Aucune vente'}</p>
          <FontAwesomeIcon icon={faArrowUp} size="2x" color="green" />
        </div>
        <div className="p-4 bg-red-200 rounded-lg w-1/2 text-center">
          <h3 className="font-bold text-red-700">Vente Min</h3>
          <p>{minSales ? `${minSales} €` : 'Aucune vente'}</p>
          <FontAwesomeIcon icon={faArrowDown} size="2x" color="red" />
        </div>
      </div>

      {/* Graphique des ventes */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Ventes sur l'année 2024</h3>
        <Line data={dataForChart} />
      </div>

      {/* Produit le plus et le moins vendu */}
      <div className="flex justify-between mb-6">
        <div className="p-4 bg-green-300 rounded-lg w-1/2 text-center">
          <h3 className="font-bold text-green-800">Produit le plus vendu</h3>
          <p>{products.find((product) => product.id === maxSales)?.name}</p>
          <p>{maxSales} €</p>
          <FontAwesomeIcon icon={faArrowUp} size="2x" color="green" />
        </div>
        <div className="p-4 bg-red-300 rounded-lg w-1/2 text-center">
          <h3 className="font-bold text-red-800">Produit le moins vendu</h3>
          <p>{products.find((product) => product.id === minSales)?.name}</p>
          <p>{minSales} €</p>
          <FontAwesomeIcon icon={faArrowDown} size="2x" color="red" />
        </div>
      </div>
    </div>
  );
};

export default TableauDeBord;
