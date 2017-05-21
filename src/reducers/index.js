import { combineReducers } from 'redux';

const ids = (state = [], action) => action.type === 'FETCH_IMAGES_OK' ? action.result.id.map((id, i) => ({ id, data: action.result.data[i] })) : state;
const host = (state = { id: '', match: [], matchCount: 0 }, action) => action.type === 'FETCH_URLS_OK' ? action.result : state;
const fetching = (state = { isFetching: false, errMsg: '' }, action) => {
    switch (action.type) {
        case 'FETCH_IMAGES_REQUEST':
            return { isFetching: true, errMsg: '' };
        case 'FETCH_IMAGES_OK':
            return { isFetching: false, errMsg: '' };
        case 'FETCH_IMAGES_FAIL':
            return { isFetching: false, errMsg: action.message };
        default:
            return state;
    }
}

const images = combineReducers({
    ids,
    host,
    fetching
});

export default images;

export const getIsFetching = (state) => {
    return state.fetching.isFetching;
};

export const getImages = (state, idArray) => {
    let images = [];
    idArray.forEach((id) => {
        let image = state.ids.find((v) => v.id === id);
        if (image) images.push(image)
    });
    return images;
};

export const getCurrentMatch = (state) => state.host.match;
export const getCurrentId = (state) => state.host.id;
export const getLastError = (state) => state.fetching.errMsg;