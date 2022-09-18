import BASE_URL from './domain';

class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkServerData(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  register(email, password) {
    return fetch(`https://${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
      .then(res => this._checkServerData(res))
  }

  authorize(email, password) {
    return fetch(`https://${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
      .then(res => this._checkServerData(res))
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          localStorage.setItem('email', email);
          return res;
        }
      })
  }

  checkToken(token) {
    return fetch(`https://${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => this._checkServerData(res))
      .then(res => res)
  }
}

const auth = new Auth(BASE_URL);

export default auth;
