import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';

const myInitialState = {
    airports: {
        from: null,
        to: null,
        distance: null
    },
    coordinates: {
        lat: undefined,
        lng: undefined
    }
};

export function initializeStore(initialState = myInitialState) {
    return createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware())
    )
}