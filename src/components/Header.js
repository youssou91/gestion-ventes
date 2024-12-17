import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBell, faUser, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/connexion');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white shadow-md">
      <div className="flex items-center">
      <a href="/" className="flex  text-white hover:text-gray-300">
          <img src="/gest_ventes.png" alt="Logo" className="w-10 h-10 mr-2" />
          <h1 className="text-xl font-bold">Gest_Ventes</h1>
        </a>
      </div>

      <nav className="flex space-x-6">
        <a href="/gestion-produits" className="text-white hover:text-gray-300"> Produits</a>
        <a href="/suivi-ventes" className="text-white hover:text-gray-300"> Ventes</a>
       
      </nav>

      <div className="flex items-center space-x-4">
       

        {currentUser ? (
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faUser} className="text-white text-lg" />
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
          <div className="flex items-center space-x-2">
            <a href="/inscription" className="text-white hover:text-gray-300">Inscription</a>
            <button
              onClick={() => navigate('/connexion')}
              className="text-white hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Connexion
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
