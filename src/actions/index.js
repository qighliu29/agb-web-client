import * as api from '../api';
import { getIsFetching } from '../reducers';

export const fetchMatchImages = (imageData) => (dispatch, getState) => {
    if (getIsFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_IMAGES_REQUEST',
    });

    return api.fetchURLs(imageData)
        .then((content) => {
            dispatch({
                type: 'FETCH_URLS_OK', result: {
                    id: content.ID,
                    matchArray: content.MatchArray.map((img) => img.ID),
                    matchCount: content.MatchCount
                }
            });
            return api.fetchImages(content.Data.MatchArray.map((elem) => elem.URL))
                .then((dataArray) => dispatch({
                    type: 'FETCH_IMAGES_OK',
                    result: {
                        id: content.Data.MatchArray.map((elem) => elem.ID),
                        data: dataArray
                    }
                }));
        })
        .catch((err) => dispatch({ type: 'FETCH_IMAGES_FAIL', message: err }));
};

export const submitMatchImage = (imageIndex) => (dispatch, getState) => {
    return api.submitMatch(getCurrentImage(getState()), getImage(getState(), imageIndex))
        .then((res) => res.ok ? res.json().then((content) => content.Message && content.Message == 'OK' ? dispatch({ type: 'SUBMIT_MATCH_OK' }) : dispatch({ type: 'SUBMIT_MATCH_FAIL' })) : dispatch({ type: 'UNEXPECTED_RES_TYPE' }))
        .catch((err) => dispatch({ type: 'FETCH_NET_ERROR' }));
};