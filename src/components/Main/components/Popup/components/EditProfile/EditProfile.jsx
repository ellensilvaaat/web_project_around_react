import React, { useState } from "react";

export default function EditProfile({ currentUser, onUpdateUser, onClose }) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [nameError, setNameError] = useState("");
  const [jobError, setJobError] = useState("");
  const [isTouchedName, setIsTouchedName] = useState(false);
  const [isTouchedJob, setIsTouchedJob] = useState(false);

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
    setIsTouchedName(true);

    const error = validateName(value);
    setNameError(error);
  };

  const handleJobChange = (event) => {
    const value = event.target.value;
    setJob(value);
    setIsTouchedJob(true);

    const error = validateJob(value);
    setJobError(error);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nameValidationError = validateName(name);
    const jobValidationError = validateJob(job);

    if (nameValidationError || jobValidationError) {
      setNameError(nameValidationError);
      setJobError(jobValidationError);
      return;
    }

    onUpdateUser({
      name: name || currentUser.name,  
      job: job || currentUser.job      
    });
    handleClose();
  };

  const handleClose = () => {
    setName("");
    setJob("");
    setNameError("");
    setJobError("");
    setIsTouchedName(false);
    setIsTouchedJob(false);
    onClose();
  };

  return (
    <div id="Modal" className="form modal_opened">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        
        <form id="form" onSubmit={handleSubmit} autoComplete="off">
          <h2 className="modal-content__title">Editar perfil</h2>

          <div className="modal-content__field">
            <input
              type="text"
              name="name"
              className="modal-content__name"
              placeholder="Jacques Cousteau"
              defaultValue=""  
              onChange={handleNameChange}
              required
              minLength="2"
              maxLength="40"
            />
            <div className="line-separator"></div>
            {nameError && isTouchedName && (
              <div className="error-message popup__error_visible">{nameError}</div>
            )}
          </div>

          <div className="modal-content__field">
            <input
              type="text"
              name="job"
              className="modal-content__text"
              placeholder="Explorador"
              defaultValue=""  
              onChange={handleJobChange}
              required
              minLength="2"
              maxLength="200"
            />
            <div className="line-separator"></div>
            {jobError && isTouchedJob && (
              <div className="error-message popup__error_visible">{jobError}</div>
            )}
          </div>

          <button type="submit" className="modal-content__button">Salvar</button>
        </form>
      </div>
      <div className="overlay" onClick={handleClose}></div>
    </div>
  );
}










