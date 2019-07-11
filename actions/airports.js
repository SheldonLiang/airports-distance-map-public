export const setFrom = from => {
    return {
        type: 'SET_FROM',
        from
    };
};
export const setTo = to => {
    return {
        type: 'SET_TO',
        to
    };
};
export const setDistance = distance => {
    return {
        type: 'SET_DISTANCE',
        distance
    };
};