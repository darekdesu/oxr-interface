const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
};

const parseJSON = (response) => response.text()
    .then((text) => {
        try {
            return JSON.parse(text);
        } catch (err) {
            return {};
        }
    });

export const get = (url) => fetch(url, {
    headers: {
        Accept: 'application/json'
    }
})
    .then(checkStatus)
    .then(parseJSON);
