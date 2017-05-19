export const fetchURLs = (imageData) => {
    const formData = new FormData();
    formData.append('image-file', imageData);
    formData.append('from', '0');
    formData.append('length', '10');
    return fetch('http://localhost:8080/gif', {
        method: 'POST',
        body: formData
    })
        .then((res) => res.json())
        .then((obj) => obj.Message && obj.Message == 'OK' ? obj.Data : Promise.reject());
}

export const fetchImages = (urlList) => Promise.all(urlList.map((url) => fetch(url).then((res) => res.arrayBuffer()).then((data) => new Uint8Array(data))));

export const submitMatch = (curImg, selImg) => {
    const formData = new formData();
    formData.append('home', curImg.id);
    formData.append('away', selImg.id);
    formData.append('user-identifier', 'agb-web-client');
    return fetch('http://localhost:8080/match', {
        method: 'POST',
        body: formData
    })
        .then((res) => res.json())
        .then((obj) => obj.Message && obj.Message == 'OK' ? obj.Data : Promise.reject());
};