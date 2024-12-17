import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faHome, faPhone } from '@fortawesome/free-solid-svg-icons';

const Inscription = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    adresse: '',
    telephone: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Charger les données existantes depuis le localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Vérifier si l'email est déjà utilisé
    const emailExists = existingUsers.some(
      (user) => user.email === formData.email
    );

    if (emailExists) {
      setMessage('Cet email est déjà utilisé.');
      return;
    }

    // Ajouter le nouvel utilisateur
    const updatedUsers = [...existingUsers, formData];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setMessage('Compte créé avec succès !');
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      password: '',
      adresse: '',
      telephone: '',
    });
  };

  return (
    <div className="max-w-md mx-auto mt-1 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">Créer un compte</h2>
      {message && <p className="text-center text-green-600 font-semibold mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label className="block text-gray-700 font-medium">Nom</label>
          <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring focus-within:ring-blue-200">
            <FontAwesomeIcon icon={faUser} className="ml-3 text-gray-400" />
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-none focus:outline-none"
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-gray-700 font-medium">Prénom</label>
          <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring focus-within:ring-blue-200">
            <FontAwesomeIcon icon={faUser} className="ml-3 text-gray-400" />
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-none focus:outline-none"
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-gray-700 font-medium">Email</label>
          <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring focus-within:ring-blue-200">
            <FontAwesomeIcon icon={faEnvelope} className="ml-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-none focus:outline-none"
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-gray-700 font-medium">Mot de passe</label>
          <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring focus-within:ring-blue-200">
            <FontAwesomeIcon icon={faLock} className="ml-3 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-none focus:outline-none"
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-gray-700 font-medium">Adresse</label>
          <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring focus-within:ring-blue-200">
            <FontAwesomeIcon icon={faHome} className="ml-3 text-gray-400" />
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-none focus:outline-none"
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-gray-700 font-medium">Téléphone</label>
          <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring focus-within:ring-blue-200">
            <FontAwesomeIcon icon={faPhone} className="ml-3 text-gray-400" />
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-none focus:outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Inscription;
