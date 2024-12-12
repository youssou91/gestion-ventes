import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const SuiviVentes = () => {
  // Liste des produits (lunettes de correction, lunettes de lecture, lunettes de soleil)
  const [products, setProducts] = useState([
    { id: 1, type: 'Lunettes de correction', name: 'Lunettes de vue classique', price: 50 },
    { id: 2, type: 'Lunettes de lecture', name: 'Lunettes de lecture magnifiquement légères', price: 30 },
    { id: 3, type: 'Lunettes de soleil', name: 'Lunettes de soleil aviator', price: 80 },
  ]);

  // Liste des ventes
  const [sales, setSales] = useState(() => {
    // Charger les ventes depuis localStorage
    const savedSales = localStorage.getItem('sales');
    return savedSales ? JSON.parse(savedSales) : [];
  });

  // Détails de la vente
  const [saleData, setSaleData] = useState({
    productId: '',
    quantity: 1,
    saleDate: '',
  });

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSaleData({
      ...saleData,
      [name]: value,
    });
  };

  // Enregistrer la vente
  const handleAddSale = (e) => {
    e.preventDefault();

    const product = products.find((product) => product.id === parseInt(saleData.productId));

    if (product) {
      const newSale = {
        productId: product.id,
        productName: product.name,
        quantity: saleData.quantity,
        price: product.price,
        total: product.price * saleData.quantity,
        saleDate: saleData.saleDate,
      };

      // Ajouter la vente à la liste existante
      const updatedSales = [...sales, newSale];

      // Sauvegarder les ventes dans localStorage
      localStorage.setItem('sales', JSON.stringify(updatedSales));

      // Mettre à jour l'état des ventes
      setSales(updatedSales);

      // Réinitialiser le formulaire après l'enregistrement de la vente
      setSaleData({ productId: '', quantity: 1, saleDate: '' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Suivi des Ventes</h2>

      {/* Formulaire pour ajouter une vente */}
      <form onSubmit={handleAddSale} className="space-y-4 mb-6">
        <div>
          <label className="block text-gray-700 font-medium">Produit</label>
          <select
            name="productId"
            value={saleData.productId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">Sélectionner un produit</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - {product.price} €
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Quantité</label>
          <input
            type="number"
            name="quantity"
            value={saleData.quantity}
            onChange={handleChange}
            min="1"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Date de vente</label>
          <input
            type="date"
            name="saleDate"
            value={saleData.saleDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Enregistrer la vente
        </button>
      </form>

      {/* Liste des ventes */}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Produit</th>
            <th className="px-4 py-2 text-left">Quantité</th>
            <th className="px-4 py-2 text-left">Prix Unitaire</th>
            <th className="px-4 py-2 text-left">Total</th>
            <th className="px-4 py-2 text-left">Date de vente</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{sale.productName}</td>
              <td className="px-4 py-2">{sale.quantity}</td>
              <td className="px-4 py-2">{sale.price} €</td>
              <td className="px-4 py-2">{sale.total} €</td>
              <td className="px-4 py-2">{sale.saleDate}</td>
              <td className="px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 focus:outline-none"
                  title="Modifier"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 focus:outline-none ml-2"
                  title="Supprimer"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuiviVentes;
