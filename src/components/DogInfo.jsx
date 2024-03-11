import React from 'react';
import './DogInfo.css';


const DogInfo = ({ color, size, nickname, age }) => {
  return (
    <div className="dog-info">
      <p><strong>Cor:</strong> {color}</p>
      <p><strong>Tamanho:</strong> {size}</p>
      <p><strong>Apelido:</strong> {nickname}</p>
      <p><strong>Idade:</strong> {age}</p>
    </div>
  );
};

export default DogInfo;
