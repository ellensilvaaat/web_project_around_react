import React, { useState } from "react";

export default function EditAvatar({ currentAvatar, onUpdateAvatar, onClose }) {
  const [avatarLink, setAvatarLink] = useState(currentAvatar || "");
  const [avatarError, setAvatarError] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const validateUrl = (value) => {
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
    if (!value.trim()) return "Por favor, insira um link válido.";
    if (!urlPattern.test(value)) return "O link deve ser uma URL válida de imagem.";
    return "";
  };

  const handleAvatarChange = (event) => {
    const value = event.target.value;
    setAvatarLink(value);
    setIsTouched(true);

    const error = validateUrl(value);
    setAvatarError(error);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const error = validateUrl(avatarLink);
    setAvatarError(error);

    if (error) return;

    onUpdateAvatar(avatarLink);
    handleClose();
  };

  const handleClose = () => {
    setAvatarLink(currentAvatar || ""); // Reseta para o avatar atual
    setAvatarError("");
    setIsTouched(false);
    onClose();
  };

  return (
    <div id="modal-avatar" className="popup-avatar popup-avatar_opened">
      <div className="popup-avatar__content">
        <button className="popup__close-button" onClick={handleClose}>&times;</button>
        <h2 className="popup-avatar__title">Alterar foto do perfil</h2>
        <form id="form-avatar" className="popup-avatar__form" onSubmit={handleSubmit}>
          <div className="modal-content__field">
            <input
              type="url"
              id="avatar-link"
              className="popup-avatar__input"
              placeholder="https://somewebsite.com/someimage.jpg"
              value={avatarLink}
              onChange={handleAvatarChange}
              required
            />
            <div className="line-separator"></div>
            {avatarError && isTouched && (
              <div className="error-message popup__error_visible" id="locationName-error">
                {avatarError}
              </div>
            )}
          </div>
          
          <button type="submit" className="popup-avatar__save">Salvar</button>
        </form>
      </div>
      <div className="overlay" onClick={handleClose}></div>
    </div>
  );
}


