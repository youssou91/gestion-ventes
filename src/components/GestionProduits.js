import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import DataTable from 'react-data-table-component';

import productsData from '../produits.json';

const GestionProduits = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal de confirmation
  const [formData, setFormData] = useState({
    id: null,
    nom: '',
    description: '',
    prix: '',
    categorie: '',
    image: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null); // Produit à supprimer

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddOrEditProduct = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProducts(
        products.map((product) =>
          product.id === formData.id
            ? { ...product, nom: formData.nom, description: formData.description, prix: formData.prix, categorie: formData.categorie, image: formData.image }
            : product
        )
      );
      setIsEditing(false);
    } else {
      setProducts([
        ...products,
        {
          id: products.length + 1,
          nom: formData.nom,
          description: formData.description,
          prix: formData.prix,
          categorie: formData.categorie,
          image: formData.image
        },
      ]);
    }

    setFormData({ id: null, nom: '', description: '', prix: '', categorie: '', image: '' });
    closeModal();
  };

  const handleEditProduct = (product) => {
    setFormData({ ...product });
    setIsEditing(true);
    openModal();
  };

  const openDeleteModal = (id) => {
    setProductToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleDeleteProduct = () => {
    setProducts(products.filter((product) => product.id !== productToDelete));
    closeDeleteModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Gestion des Produits</h2>

      {/* Bouton pour ouvrir le modal d'ajout */}
      <button
        onClick={openModal}
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mb-6 hover:bg-blue-700"
      >
        Ajouter un produit
      </button>

      {/* Modal d'ajout */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-50"> 
            <h3 className="text-2xl font-bold mb-4">Ajouter un produit</h3>

            {/* Formulaire d'ajout */}
            <form onSubmit={handleAddOrEditProduct} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Prix</label>
                <input
                  type="number"
                  name="prix"
                  value={formData.prix}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Catégorie</label>
                <select
                  name="categorie"
                  value={formData.categorie}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="Lunettes de correction">Lunettes de correction</option>
                  <option value="Lunettes de lecture">Lunettes de lecture</option>
                  <option value="Lunettes de soleil">Lunettes de soleil</option>
                  <option value="Lunettes de sport">Lunettes de sport</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                >
                  Fermer
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-50">
            <h3 className="text-2xl font-bold mb-4">Confirmer la suppression</h3>
            <p>Êtes-vous sûr de vouloir supprimer ce produit ?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={closeDeleteModal}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteProduct}
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tableau des produits */}
      <DataTable
        title="Liste des produits"
        columns={[
          { name: 'Nom', selector: row => row.nom },
          { name: 'Prix', selector: row => `${row.prix} €` },
          { name: 'Catégorie', selector: row => row.categorie },
          {
            name: 'Actions',
            cell: row => (
              <>
                <button className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                  onClick={() => handleEditProduct(row)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded"
                  onClick={() => openDeleteModal(row.id)} // Ouvre le modal de confirmation
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </>
            ),
          },
        ]}
        data={products}
        pagination
      />
    </div>
  );
};

export default GestionProduits;
