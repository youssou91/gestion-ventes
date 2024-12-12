import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Connexion from './components/Connexion';
import Inscription from './components/Inscription';
import TableauDeBord from './components/TableauDeBord';
import GestionProduits from './components/GestionProduits';
import SuiviVentes from './components/SuiviVentes';
import AppCSS from './App.css';  // Si nécessaire pour la mise en style de l'application

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Header global de l'application */}
        <Header />

        {/* Routes et contenu dynamique */}
        <div className="container">
          <Routes>
            {/* Définition des différentes routes */}
            <Route path="/" element={<TableauDeBord />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/gestion-produits" element={<GestionProduits />} />
            <Route path="/suivi-ventes" element={<SuiviVentes />} />
            {/* Vous pouvez ajouter d'autres routes ici selon les besoins */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
