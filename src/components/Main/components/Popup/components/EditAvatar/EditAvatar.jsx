import React, { useState } from "react";
import line from "/src/images/Line.png";

export default function EditAvatar({ currentAvatar, onUpdateAvatar, onClose }) {
  const [avatarLink, setAvatarLink] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [isTouched, setIsTouched] = useState(false); // 🔥 Controle de quando o usuário começa a digitar

  const validateUrl = (value) => {
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
    if (!value.trim()) return "Por favor, insira um link válido.";
    if (!urlPattern.test(value)) return "O link deve ser uma URL válida de imagem.";
    return "";
  };

  const handleAvatarChange = (event) => {
    const value = event.target.value;
    setAvatarLink(value);
    setIsTouched(true); // 🔥 Marca que o usuário começou a digitar

    const error = validateUrl(value);
    setAvatarError(error);

    const errorElement = document.getElementById("locationName-error");
    if (errorElement) {
      if (error && isTouched) {
        errorElement.classList.add("popup__error_visible");
      } else {
        errorElement.classList.remove("popup__error_visible");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const error = validateUrl(avatarLink);
    setAvatarError(error);

    if (error) {
      document.getElementById("locationName-error").classList.add("popup__error_visible");
      return;
    }

    onUpdateAvatar(avatarLink); // ✅ Atualiza o avatar
    onClose(); // ✅ Fecha o popup
  };

  const handleClose = () => {
    setAvatarLink(""); // 🔥 Limpa o link quando o popup fecha
    setAvatarError(""); // 🔥 Remove mensagem de erro quando o popup fecha
    setIsTouched(false); // 🔥 Reseta o estado de digitação
    onClose();
  };

  return (
    <div id="modal-avatar" className="popup-avatar popup-avatar_opened">
      <div className="popup-avatar__content">
        <button className="popup__close-button" onClick={handleClose}>&times;</button>
        <h2 className="popup-avatar__title">Alterar foto do perfil</h2>

        <form id="form-avatar" className="popup-avatar__form" onSubmit={handleSubmit}>
          <input
            type="url"
            id="avatar-link"
            className="popup-avatar__input"
            placeholder="https://somewebsite.com/someimage.jpg"
            value={avatarLink}
            onChange={handleAvatarChange}
            required
          />
          <img className="modal-content__line" src={line} alt="line" />
          
          <div 
            className={`error-message ${avatarError && isTouched ? "popup__error_visible" : ""}`} 
            id="locationName-error"
          >
            {avatarError}
          </div>

          <button type="submit" className="popup-avatar__save">Salvar</button>
        </form>
      </div>
      <div className="overlay" onClick={handleClose}></div>
    </div>
  );
}

