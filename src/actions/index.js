import * as api from '../api';
import { getIsFetching, getCurrentId } from '../reducers';

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
                    match: content.MatchArray.map((img) => img.ID),
                    matchCount: content.MatchCount
                }
            });
            return api.fetchImages(content.MatchArray.map((elem) => elem.URL))
                .then((dataArray) => dispatch({
                    type: 'FETCH_IMAGES_OK',
                    result: {
                        id: content.MatchArray.map((elem) => elem.ID),
                        data: dataArray
                    }
                }));
        })
        .catch((err) => dispatch({ type: 'FETCH_IMAGES_FAIL', message: err.toString() }));
};

export const submitMatchImage = (sid) => (dispatch, getState) => {
    return api.submitMatch(getCurrentId(getState()), sid)
        // .then(() => dispatch({ type: 'PUSH_MATCH_OK' }))
        // .catch(() => dispatch({ type: 'PUSH_MATCH_FAIL' }));
        .then(() => console.log('PUSH_MATCH_OK'))
        .catch(() => console.log('PUSH_MATCH_FAIL'));
};