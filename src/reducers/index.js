import { combineReducers } from 'redux';

const ids = (state = [], action) => action.type == 'FETCH_IMAGES_OK' ? action.result.id.map((id, i) => ({ id, data: action.result.data[i] })) : state;
const host = (state = {}, action) => action.type == 'FETCH_URLS_OK' ? action.result : state;
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
}