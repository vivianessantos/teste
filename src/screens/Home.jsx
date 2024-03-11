import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectBreed from '../components/SelectBreed';
import DogImage from '../components/DogImage';
import DogInfo from '../components/DogInfo';
import bannerImage from '../assets/Banner2.png';
import DogCard from '../components/DogCard';
import api from '../services/api';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [selectedBreed, setSelectedBreed] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [dogData, setDogData] = useState(null);
  const [dogImageUrl, setDogImageUrl] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const navigate = useNavigate();

  const handleBreedSelect = async (breed) => {
    setSelectedBreed(breed);
    setShowForm(true);
    setDogBreed(breed);
    try {
      const response = await api.get(`breed/${breed}/images/random`);
      const imageUrl = response.data.message;
      setDogImageUrl(imageUrl);
    } catch (error) {
      console.error('Erro ao buscar a imagem do cachorro:', error);
    }
  };

  const handleSave = () => {
    if (selectedBreed && color && size && nickname && age) {
      const savedDogs = JSON.parse(localStorage.getItem('savedDogs')) || [];

      const newDogData = { selectedBreed, color, size, nickname, age, imageUrl: dogImageUrl };
      savedDogs.push(newDogData);

      localStorage.setItem('savedDogs', JSON.stringify(savedDogs));

      navigate('/saved-dogs');
    } else {
      alert('Por favor, preencha todos os campos antes de salvar.');
    }
  };


  return (
    <div className="container">
      <img
        src={bannerImage}
        alt="Banner"
        className={`banner ${showForm && 'hidden'}`}
      />
      <h1 className={`title ${selectedBreed && 'selected'}`}>
        Escolha a Raça do Dog
      </h1>

      <SelectBreed onSelect={handleBreedSelect} />
      {selectedBreed && (
        <div>
          <div className="dog-image-container">
            <DogImage breed={selectedBreed} className="dog-image" />
          </div>
          {showForm && (
            <div className="input-container">
              <h2 className="title">Preencha as informações do seu Dog: </h2>
              <label htmlFor="colorInput" className="label">Cor:</label>
              <input id="colorInput" className="input" type="text" value={color} onChange={(e) => setColor(e.target.value)} />
              <label htmlFor="sizeInput" className="label">Tamanho:</label>
              <select id="sizeInput" className="input" value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="">Selecione o tamanho</option>
                <option value="pequeno">Pequeno porte</option>
                <option value="medio">Médio porte</option>
                <option value="grande">Grande porte</option>
              </select>
              <label htmlFor="nicknameInput" className="label">Apelido:</label>
              <input id="nicknameInput" className="input" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
              <label htmlFor="ageInput" className="label">Idade:</label>
              <select id="ageInput" className="input" value={age} onChange={(e) => setAge(e.target.value)}>
                <option value="">Selecione a idade</option>
                {[...Array(12).keys()].map(month => (
                  <option key={`month-${month}`} value={`0-${month + 1}`}>{month + 1} meses</option>
                ))}
                {[...Array(20).keys()].map(year => (
                  <option key={`year-${year}`} value={`${year + 1}-0`}>{year + 1} anos</option>
                ))}
              </select>
              <button className="button" onClick={handleSave}>
                Salvar
              </button>
            </div>
          )}
        </div>
      )}
      <Link to="/saved-dogs" className="button-link">Consulte nossa lista de dogs</Link>
      {showCard && selectedBreed && (
        <div>
          <h2 className="title">Informações do Pet</h2>
          <h2 className="title">Raça: {selectedBreed}</h2>
          <DogCard breed={selectedBreed} imageUrl={dogImageUrl} color={color} size={size} nickname={nickname} age={age} />
        </div>
      )}
    </div>
  );
};

export default Home;

