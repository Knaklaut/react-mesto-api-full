const baseUrl = 'https://api.knaklaut.nomoredomains.sbs';

// Класс Api описывает функциональность для обмена данными с сервером
class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._likesUrl = `${this._baseUrl}/cards/likes`;
  }

  _checkServerData(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo(token) {
    return fetch(this._userUrl, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
    .then(res => this._checkServerData(res));
  }

  getInitialCards(token) {
    return fetch(this._cardsUrl, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
    .then(res => this._checkServerData(res));
  }

  updateUserInfo({ name, about }, token) {
    return fetch(this._userUrl, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, about: about })
    })
    .then(res => this._checkServerData(res));
  }

  changeAvatar({ avatar }, token) {
    return fetch(`${this._userUrl}/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatar: avatar })
    })
    .then(res => this._checkServerData(res));
  }

  postNewCard({ name, link }, token) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, link: link })
    })
    .then(res => this._checkServerData(res));
  }

  addLike(cardId, token) {
    return fetch(`${this._likesUrl}/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(res => this._checkServerData(res));
  }

  deleteLike(cardId, token) {
    return fetch(`${this._likesUrl}/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(res => this._checkServerData(res));
  }

  deleteCard(cardId, token) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => this._checkServerData(res));
  }
}

// Создание экземпляра класса Api
const api = new Api(baseUrl);

export default api;