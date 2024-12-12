import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  // Récupérer l'utilisateur connecté depuis le localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    // Retirer l'utilisateur actuel du localStorage
    localStorage.removeItem('currentUser');
    // Redirection vers la page de connexion après déconnexion
    navigate('/connexion');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white shadow-md">
      <div className="flex items-center">
        <img src="/path-to-your-logo.png" alt="Logo" className="w-10 h-10 mr-2" />
        <h1 className="text-xl font-bold">Gest_Ventes</h1>
      </div>

      <nav className="flex space-x-6">
        <a href="/gestion-produits" className="text-white hover:text-gray-300">Gestion Produits</a>
        <a href="/inscription" className="text-white hover:text-gray-300">Inscription</a>
        <a href="/suivi-ventes" className="text-white hover:text-gray-300">Suivi des Ventes</a>
        <a href="/" className="text-white hover:text-gray-300">Tableau de Bord</a>
      </nav>

      <div className="flex items-center space-x-4">
        <button className="relative">
          <FontAwesomeIcon icon={faBell} className="text-white text-lg" />
          <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">3</span>
        </button>

        {currentUser ? (
          <div className="flex items-center space-x-2">
            <span className="text-white">{currentUser.name}</span>
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Déconnexion
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/connexion')}
            className="text-white hover:text-gray-300"
          >
            Connexion
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
