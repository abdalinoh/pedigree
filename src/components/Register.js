import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // État pour la visibilité du mot de passe
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://192.168.86.55:5000/api/utilisateurs/enregistrer',
       {
        nom: lastName,
        prenom: firstName,
        email,
        mot_de_passe: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Réponse du serveur:', response);

      alert('Inscription réussie!');
      setMessage('Inscription réussie! Vous pouvez maintenant vous connecter.');
      setTimeout(() => navigate('/Login'), 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Une erreur est survenue';
      setMessage(errorMessage);
      console.log(error);
    }
  };

  const handleEmailBlur = async () => {
    if (!email) return;

    try {
      const response = await axios.post('http://192.168.86.55:5000/api/utilisateurs/verifier-email', { email }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.exists) {
        setMessage('Email déjà utilisé. Veuillez en choisir un autre.');
      } else {
        setMessage('');
      }
    } catch (error) {
      console.log('Erreur lors de la vérification de l\'email:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-container">
      <h2>Inscription</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Prénom :</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
            required placeholder='ex: nom@gmail.com'
            autoComplete='username'
          />
        </div>
        <div className="password-container">
          <label>Mot de passe :</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='new-password'
              required
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      <p>Vous avez déjà un compte ? <Link to="/Login">Se connecter</Link></p>
    </div>
  );
};

export default Register;
