const parseResponse = (res) => res.Message ? res.Message === 'OK' ? (null, res.Data) : (res.Message, null) : ('Unexpected JSON format', null);

export const fetchURLs = (imageFile) => {
    const formData = new FormData();
    formData.append('image-file', imageFile);
    formData.append('from', '0');
    formData.append('length', '10');
    return fetch('http://39.108.79.13:8080/gif', {
        method: 'POST',
        body: formData
    })
        .then((res) => res.json())
        .then((obj) => {
            let err, result = parseResponse(obj);
            if (err) return Promise.reject(err);
            else return Promise.resolve(result);
        });
}

export const fetchImages = (urlList) => Promise.all(urlList.map((url) => fetch(url).then((res) => res.arrayBuffer()).then((data) => new Uint8Array(data))));

export const submitMatch = (cid, sid) => {
    const formData = new FormData();
    formData.append('home', cid);
    formData.append('away', sid);
    formData.append('user-identifier', 'agb-web-client');
    return fetch('http://39.108.79.13:8080/match', {
        method: 'POST',
        body: formData
    })
        .then((res) => res.json())
        .then((obj) => {
            let err, result = parseResponse(obj);
            if (err) return Promise.reject(err);
            else return Promise.resolve(result);
        });
};