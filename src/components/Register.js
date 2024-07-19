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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' ou 'success'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // État pour contrôler l'affichage du formulaire
  const navigate = useNavigate();

  const validatePassword = (password) => {
    // Exemple de critères : au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setMessage('Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.');
      setMessageType('error');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      setMessageType('error');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post('http://192.168.86.55:5000/api/utilisateurs/enregistrer', {
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

      setMessage('Inscription réussie! Vous serez redirigé vers la page de connexion.');
      setMessageType('success');
      setIsRegistered(true); // Masquer le formulaire après l'inscription réussie

      setTimeout(() => {
        navigate('/Login');
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Une erreur est survenue';
      setMessage(errorMessage);
      setMessageType('error');
      console.log(error);
    } finally {
      setIsSubmitting(false);
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
        setMessageType('error');
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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="register-container">
      <h2>Inscription</h2>
      {message && (
        <p className={messageType === 'success' ? 'success-message' : 'error-message'}>
          {message}
        </p>
      )}
      {!isRegistered && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nom :</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label>Prénom :</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label>Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              required
              placeholder='ex: nom@gmail.com'
              autoComplete='username'
              disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
              <span
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          <div className="password-container">
            <label>Confirmer le mot de passe :</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete='new-password'
                required
                disabled={isSubmitting}
              />
              <span
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
              >
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Inscription en cours...' : "S'inscrire"}
          </button>
        </form>
      )}
      { !isRegistered && (
      <p>Vous avez déjà un compte ? <Link to="/Login">Se connecter</Link></p>
      )}
    </div>
  );
};

export default Register;
