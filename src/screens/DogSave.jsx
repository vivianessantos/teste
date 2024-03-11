import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DogCard from '../components/DogCard';
import './DogSave.css';

const DogSave = () => {
  const [savedDogs, setSavedDogs] = useState([]);
  const [breedFilter, setBreedFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [nicknameFilter, setNicknameFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');

  useEffect(() => {
    const savedDogsData = JSON.parse(localStorage.getItem('savedDogs')) || [];
    setSavedDogs(savedDogsData);

    const breeds = [...new Set(savedDogsData.map(dog => dog.selectedBreed))];
    setBreedOptions(breeds);

    const colors = [...new Set(savedDogsData.map(dog => dog.color))];
    setColorOptions(colors);

    const sizes = [...new Set(savedDogsData.map(dog => dog.size))];
    setSizeOptions(sizes);

    const nicknames = [...new Set(savedDogsData.map(dog => dog.nickname))];
    setNicknameOptions(nicknames);

    const ages = [...new Set(savedDogsData.map(dog => dog.age))];
    setAgeOptions(ages);
  }, []);


  const [breedOptions, setBreedOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [nicknameOptions, setNicknameOptions] = useState([]);
  const [ageOptions, setAgeOptions] = useState([]);


  const applyFilters = (dog) => {
    return (
      (!breedFilter || dog.selectedBreed === breedFilter) &&
      (!colorFilter || dog.color === colorFilter) &&
      (!sizeFilter || dog.size === sizeFilter) &&
      (!nicknameFilter || dog.nickname === nicknameFilter) &&
      (!ageFilter || dog.age === ageFilter)
    );
  };

  return (
    <div className='dogs-container'>
      <div className="title-button-container">
        <h1 className="title-save">Lista de Cães Salvos</h1>
        <div className="button-container">
          <Link to="/" className="button">Voltar para a Home</Link>
        </div>
      </div>
      <div className="filter-container">
        <select value={breedFilter} onChange={(e) => setBreedFilter(e.target.value)}>
          <option value="">Limpar Raça</option>
          {breedOptions.map((breed, index) => (
            <option key={index} value={breed}>{breed}</option>
          ))}
        </select>
        <select value={colorFilter} onChange={(e) => setColorFilter(e.target.value)}>
          <option value="">Limpar Cor</option>
          {colorOptions.map((color, index) => (
            <option key={index} value={color}>{color}</option>
          ))}
        </select>
        <select value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)}>
          <option value="">Limpar Tamanho</option>
          {sizeOptions.map((size, index) => (
            <option key={index} value={size}>{size}</option>
          ))}
        </select>
        <select value={nicknameFilter} onChange={(e) => setNicknameFilter(e.target.value)}>
          <option value="">Limpar Apelido</option>
          {nicknameOptions.map((nickname, index) => (
            <option key={index} value={nickname}>{nickname}</option>
          ))}
        </select>
        <select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
          <option value="">Limpar Idade</option>
          {ageOptions.map((age, index) => (
            <option key={index} value={age}>{age}</option>
          ))}
        </select>
      </div>
      <div className="saved-dogs-container">
        {savedDogs.filter(applyFilters).map((dog, index) => (
          <div className="dog-cards" key={index}>
            <DogCard
              breed={dog.selectedBreed}
              color={dog.color}
              size={dog.size}
              nickname={dog.nickname}
              age={dog.age}
              imageUrl={dog.imageUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DogSave;
