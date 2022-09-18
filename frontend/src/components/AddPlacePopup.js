import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  const [ name, setName ] = useState('');
  const [ link, setLink ] = useState('');

  function handleChange(evt) {
    const el = evt.target;
    if (el.name === 'photo-name') setName(el.value);
    if (el.name === 'photo-link') setLink(el.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddCard({
      name: name,
      link: link
    });
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm title="Новое место" name="photo-add" buttonText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <label className="form__item">
        <input className="form__input" name="photo-name" type="text" value={name || ''} placeholder="Название" minLength="2" maxLength="30" required onChange={handleChange} />
        <span className="form__input-error" id="error-photo-name">Заполните это поле.</span>
      </label>
      <label className="form__item">
        <input className="form__input" name="photo-link" type="url" value={link || ''} placeholder="Ссылка на картинку" required onChange={handleChange} />
        <span className="form__input-error" id="error-photo-link">Заполните это поле.</span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
