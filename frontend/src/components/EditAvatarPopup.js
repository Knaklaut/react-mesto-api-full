import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onOverlayClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <section onClick={onOverlayClose}>
      <PopupWithForm title="Обновить аватар" name="avatar-update" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
        <label className="form__item">
          <input className="form__input" name="avatar" type="url" placeholder="Ссылка на картинку" required ref={avatarRef} />
          <span className="form__input-error" id="error-avatar"></span>
        </label>
      </PopupWithForm>
    </section>
  )
}

export default EditAvatarPopup;
