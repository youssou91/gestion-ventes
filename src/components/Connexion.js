import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';


const Connexion = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = existingUsers.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setMessage('Connexion réussie !');
    } else {
      setMessage('Email ou mot de passe incorrect.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <FontAwesomeIcon icon={faUser} className="mr-2" />
        Connexion
      </h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <FontAwesomeIcon icon={faEnvelope} className="absolute top-9 left-3 text-gray-500" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 pl-10 border border-gray-300 rounded"
          />
        </div>
        <div className="relative">
          <label className="block mb-1 text-sm font-medium">Mot de passe</label>
          <FontAwesomeIcon icon={faLock} className="absolute top-9 left-3 text-gray-500" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 pl-10 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Connexion;
