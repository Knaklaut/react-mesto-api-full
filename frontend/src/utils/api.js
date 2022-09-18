import BASE_URL from './constants';

class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkServerData(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards(token) {
    return fetch(`https://${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
      .then(res => this._checkServerData(res))
  }

  getProfile(token) {
    return fetch(`https://${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
      .then(res => this._checkServerData(res))
  }

  editProfile(name, about, token) {
    return fetch(`https://${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, about })
    })
      .then(res => this._checkServerData(res))
  }

  editAvatar(avatar, token) {
    return fetch(`https://${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatar })
    })
      .then(res => this._checkServerData(res))
  }

  addCard(name, link, token) {
    return fetch(`https://${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    })
      .then(res => this._checkServerData(res))
  }

  deleteCard(id, token) {
    return fetch(`https://${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._checkServerData(res))
  }

  addLike(id, token) {
    return fetch(`https://${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._checkServerData(res))
  }

  deleteLike(id, token) {
    return fetch(`https://${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._checkServerData(res))
  }
}

const api = new Api(BASE_URL);

export default api;
