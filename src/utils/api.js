const onResponce = (res) => {
    return res.json();
}

class Api {
    constructor() {
        this._baseUrl = 'https://api.react-learning.ru';
        this._headers = {
            'content-type': 'application/json'  
        }
    }

    setToken(token) {
        this._headers = {
            'content-type': 'application/json',
            Authorization: token       
        }
    }

    getToken() {
        return this._headers.Authorization
    }

    getProductList() {
        return fetch(`${this._baseUrl}/products`, {
            headers: this._headers
        }).then(onResponce)
    }

    signIn(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({email, password})
        }).then(onResponce)
    }

    signUp(email, group, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({email, group, password})
        }).then(onResponce)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }).then(onResponce)
    }

    getProductById(idProduct) {
        return fetch(`${this._baseUrl}/products/${idProduct}`, {
            headers: this._headers
        }).then(onResponce)
    }

    setUserInfo(dataUser) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(dataUser)
        }).then(onResponce)
    }

    search(searchQuery, page, limit) {
        return fetch(`${this._baseUrl}/products?page=${page}&limit=${limit}&query=${searchQuery}`, {
            headers: this._headers
        }).then(onResponce)
    }

    changeLikeProduct(productId, isLike) {
        return fetch(`${this._baseUrl}/products/likes/${productId}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: this._headers
        }).then(onResponce)
    }
}

const api = new Api();

export default api;