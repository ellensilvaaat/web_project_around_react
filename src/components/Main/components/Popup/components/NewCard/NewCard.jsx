import React, { useState } from "react";
import line from "/src/images/Line.png";

export default function NewCard({ onAddPlace, onClose }) {
  const [locationName, setLocationName] = useState("");
  const [locationImage, setLocationImage] = useState("");
  const [nameError, setNameError] = useState("");
  const [imageError, setImageError] = useState("");
  const [isTouchedName, setIsTouchedName] = useState(false);
  const [isTouchedImage, setIsTouchedImage] = useState(false);

  const validateName = (value) => {
    if (!value.trim()) return "Preencha esse campo.";
    if (value.length < 2) return "O nome deve ter pelo menos 2 caracteres.";
    if (value.length > 30) return "O nome deve ter no máximo 30 caracteres.";
    return "";
  };

  const validateImage = (value) => {
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
    if (!value.trim()) return "Preencha esse campo.";
    if (!urlPattern.test(value)) return "O link deve ser uma URL válida de imagem.";
    return "";
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setLocationName(value);
    setIsTouchedName(true);

    const error = validateName(value);
    setNameError(error);
  };

  const handleImageChange = (event) => {
    const value = event.target.value;
    setLocationImage(value);
    setIsTouchedImage(true);

    const error = validateImage(value);
    setImageError(error);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nameValidationError = validateName(locationName);
    const imageValidationError = validateImage(locationImage);

    if (nameValidationError || imageValidationError) {
      setNameError(nameValidationError);
      setImageError(imageValidationError);
      return;
    }

    onAddPlace({
      name: locationName,
      link: locationImage,
    });

    setLocationName("");
    setLocationImage("");
    setNameError("");
    setImageError("");
    setIsTouchedName(false);
    setIsTouchedImage(false);
    onClose();
  };

  return (
    <div id="addModal" className="form show-modal">
      <div className="modal-content addModal">
        <span className="close" onClick={onClose}>&times;</span>
        <h2 className="modal-content__title">Adicionar Novo Local</h2>

        <form id="addForm" className="popup-avatar__form" onSubmit={handleSubmit}>
          <div className="modal-content__field">
            <input
              type="text"
              id="locationName"
              className="modal-content__name"
              placeholder="Nome do local"
              value={locationName}
              onChange={handleNameChange}
              required
              minLength="2"
              maxLength="30"
            />
            <img className="modal-content__line" src={line} alt="line" />
            {nameError && isTouchedName && (
              <div className="error-message">{nameError}</div>
            )}
          </div>

          <div className="modal-content__field">
            <input
              type="url"
              id="locationImage"
              className="modal-content__text"
              placeholder="Link da imagem"
              value={locationImage}
              onChange={handleImageChange}
              required
            />
            <img className="modal-content__line" src={line} alt="line" />
            {imageError && isTouchedImage && (
              <div className="error-message">{imageError}</div>
            )}
          </div>

          <button type="submit" className="modal-content__button">Criar</button>
        </form>
      </div>
      <div className="overlay" onClick={onClose}></div>
    </div>
  );
}
