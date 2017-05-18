const fetchImageData = (urlList) => {

}

const parseURLJSON = (prJSON) => {
    return prJSON.then((content) => {
        if (content.Message != 'OK') return {type: 'FETCH_URL_FAIL'};
    });
}

export const fetchMatchURLs = (imageData) => {
    let form = new FormData();
    form.append('image-file', imageData);
    form.append('from', '0');
    form.append('length', '10');
    return fetch('http://localhost:8080/gif', { method: 'POST', body: form })
    .then((res) => {
        if (res.status != 200) return {type: 'FETCH_URL_FAIL'}
        return parseURLJSON(res.json());
    });
}