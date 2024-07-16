import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://192.168.86.55:5000/api/utilisateurs/connexion', {
        email,
        mot_de_passe: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Réponse du serveur:', response);
      setMessage('Connexion réussie!');
      alert('Connexion réussie! ')
      setTimeout(() => navigate('/Home'), 3000); // Redirige vers la page d'accueil après 3 secondes
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Une erreur est survenue';
      setMessage(errorMessage);
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required placeholder='ex: nom@gmail.com'
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <p>Pas encore inscrit ? <Link to="/Register">S'inscrire</Link></p>
    </div>
  );
};

export default Login;
