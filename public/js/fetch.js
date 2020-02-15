function postData(url = '', data = {}) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
    })
    .then(response => response.json()); // парсит JSON ответ в Javascript объект
}