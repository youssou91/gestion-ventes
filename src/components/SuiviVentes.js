import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import produits from "../produits.json"; // Importation du fichier JSON

const SuiviVentes = () => {
  const [products] = useState(produits); // Utiliser les produits importés depuis le fichier JSON

  const [sales, setSales] = useState(() => {
    const savedSales = localStorage.getItem("sales");
    return savedSales ? JSON.parse(savedSales) : [];
  });

  const [saleData, setSaleData] = useState({
    productId: "",
    quantity: 1,
    saleDate: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSaleData({ ...saleData, [name]: value });
  };

  const handleAddSale = (e) => {
    e.preventDefault();
    const product = products.find((product) => product.id === parseInt(saleData.productId));
    if (product) {
      const newSale = {
        productId: product.id,
        productName: product.nom, // Utilise "nom" pour le nom du produit
        quantity: parseInt(saleData.quantity),
        price: product.prix, // Utilise "prix" pour le prix du produit
        total: product.prix * saleData.quantity,
        saleDate: saleData.saleDate,
      };

      const updatedSales = [...sales, newSale];
      localStorage.setItem("sales", JSON.stringify(updatedSales));
      setSales(updatedSales);
      setSaleData({ productId: "", quantity: 1, saleDate: "" });
      setIsModalOpen(false);
    }
  };

  const handleDelete = (index) => {
    const updatedSales = sales.filter((_, i) => i !== index);
    localStorage.setItem("sales", JSON.stringify(updatedSales));
    setSales(updatedSales);
  };

  const columns = [
    { name: "Produit", selector: (row) => row.productName, sortable: true },
    { name: "Quantité", selector: (row) => row.quantity, sortable: true },
    { name: "Prix Unitaire (€)", selector: (row) => row.price, sortable: true },
    { name: "Total (€)", selector: (row) => row.total, sortable: true },
    { name: "Date de vente", selector: (row) => row.saleDate, sortable: true },
    {
      name: "Actions",
      cell: (row, index) => (
        <div className="flex space-x-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700"
            title="Voir"
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button
            onClick={() => handleDelete(index)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-red-700"
            title="Supprimer"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-1 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-3">Suivi des Ventes</h2>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 mb-4"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Ajouter une vente
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Ajouter une Vente</h3>
            <form onSubmit={handleAddSale} className="space-y-4">
              <div>
                <label className="block text-gray-700">Produit</label>
                <select
                  name="productId"
                  value={saleData.productId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Sélectionner un produit</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.nom} - {product.prix} €
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Quantité</label>
                <input
                  type="number"
                  name="quantity"
                  value={saleData.quantity}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Date de vente</label>
                <input
                  type="date"
                  name="saleDate"
                  value={saleData.saleDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={sales}
        pagination
        highlightOnHover
        className="mt-6"
      />
    </div>
  );
};

export default SuiviVentes;
