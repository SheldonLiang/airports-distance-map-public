export default (state = { from: null, to: null, distance: null }, payload) => {
    switch (payload.type) {
        case 'SET_FROM': return { ...state, from: payload.from };
        case 'SET_TO': return { ...state, to: payload.to };
        case 'SET_DISTANCE': return { ...state, distance: payload.distance };
        default: return state;
    }
}