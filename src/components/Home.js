import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import axiosInstance from '../services/axiosSetup';
import '../styles/Home.css';

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); // Nouvel état pour les erreurs
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/some-protected-route');
        setData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setError('Erreur lors de la récupération des données'); // Définir le message d'erreur
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    // Effacer le token du stockage local
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    // Rediriger vers la page de connexion
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <h1>Gestion des Membres de la Famille</h1>
        {error ? (
          <p className="error">{error}</p> // Afficher l'erreur s'il y en a une
        ) : data ? (
          <p>Données: {JSON.stringify(data)}</p>
        ) : (
          <p>Chargement...</p>
        )}
      </header>
      <nav className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/settings" onClick={toggleMenu}>Paramètres</Link></li>
          <li><Link to="/profile" onClick={toggleMenu}>Profil</Link></li>
          <li><button onClick={handleLogout}>Déconnexion</button></li>
        </ul>
      </nav>
      <main className="home-main">
        <section className="home-section">  
          <h1>Bienvenue à Gestion de la Famille !</h1>
          <p>Une application pour gérer les membres de votre famille et vos amis proches.</p>
          <div className="home-buttons">
            <Link to="/add-member" className="home-button">Ajouter un Membre de la Famille</Link>
            <Link to="/add-friend" className="home-button">Ajouter un Ami Proche</Link>
            <Link to="/members-list" className="home-button">Liste des Membres</Link>
            <Link to="/generated-trees" className="home-button">Arbres Générés</Link>
            <button onClick={handleLogout} className="home-button">Quitter</button>
          </div>
        </section>
      </main>
      <footer className="home-footer">
        <p>&copy; 2024 Gestion de la Famille. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Home;
