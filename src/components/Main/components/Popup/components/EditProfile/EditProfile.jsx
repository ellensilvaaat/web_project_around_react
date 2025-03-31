import React, { useState } from "react";
import line from "/src/images/Line.png";

export default function EditProfile({ currentUser, onUpdateUser, onClose }) {
  const [isSaving, setIsSaving] = useState(false);
  const [nameError, setNameError] = useState("");
  const [jobError, setJobError] = useState("");
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const validateName = (value) => {
    if (!value.trim()) return "Preencha esse campo.";
    if (value.length < 2) return "O nome deve ter pelo menos 2 caracteres.";
    if (value.length > 40) return "O nome deve ter no máximo 40 caracteres.";
    return "";
  };

  const validateJob = (value) => {
    if (!value.trim()) return "Preencha esse campo.";
    if (value.length < 2) return "A profissão deve ter pelo menos 2 caracteres.";
    if (value.length > 200) return "A profissão deve ter no máximo 200 caracteres.";
    return "";
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    const error = validateName(value);
    setNameError(error);
    document.getElementById("locationName-error-name").style.display = error ? "block" : "none";
  };

  const handleJobChange = (event) => {
    const value = event.target.value;
    setJob(value);
    const error = validateJob(value);
    setJobError(error);
    document.getElementById("locationName-error-job").style.display = error ? "block" : "none";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nameValidationError = validateName(name);
    const jobValidationError = validateJob(job);

    setNameError(nameValidationError);
    setJobError(jobValidationError);

    document.getElementById("locationName-error-name").style.display = nameValidationError ? "block" : "none";
    document.getElementById("locationName-error-job").style.display = jobValidationError ? "block" : "none";

    if (nameValidationError || jobValidationError) return;

    setIsSaving(true);

    setTimeout(() => {
      onUpdateUser({ name, job });
      setIsSaving(false);
      onClose();
    }, 1000);
  };

  return (
    <div id="Modal" className="form modal_opened">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        
        <form id="form" onSubmit={handleSubmit} autoComplete="off">
          <h2 className="modal-content__title">Editar perfil</h2>

          <div className="modal-content__field">
            <input
              type="text"
              name="name"
              className="modal-content__name"
              placeholder="Jacques Cousteau"
              autoComplete="off"
              value={name}
              minLength="2"
              maxLength="40"
              required
              onChange={handleNameChange}  // 🔥 Validação em tempo real
            />
            <img className="modal-content__line" src={line} alt="line" />
            <div 
              className="error-message" 
              id="locationName-error-name"
              style={{ color: "red", marginTop: "5px", display: nameError ? "block" : "none" }}
            >
              {nameError}
            </div>
          </div>

          <div className="modal-content__field">
            <input
              type="text"
              name="job"
              className="modal-content__text"
              placeholder="Explorador"
              autoComplete="off"
              value={job}
              minLength="2"
              maxLength="200"
              required
              onChange={handleJobChange}  // 🔥 Validação em tempo real
            />
            <img className="modal-content__line" src={line} alt="line" />
            <div 
              className="error-message" 
              id="locationName-error-job"
            >
              {jobError}
            </div>
          </div>

          <button type="submit" className="modal-content__button">
            {isSaving ? "Salvando..." : "Salvar"}
          </button>
        </form>
      </div>
      <div className="overlay" onClick={onClose}></div>
    </div>
  );
}








