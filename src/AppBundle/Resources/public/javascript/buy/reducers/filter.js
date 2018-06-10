
export const filterTypes= {
    ADD_RIGHT:'ADD_RIGHT',
    REMOVE_RIGHT : 'REMOVE_RIGHT',
    UPDATE_COUNTRIES : 'UPDATE_COUNTRIES',
    UPDATE_EXCLUSIVE : 'UPDATE_EXCLUSIVE'
};

export const filter = (state = {
    rights: [],
    countries: [],
    exclusive : false

}, action) => {

    switch (action.type) {
        case filterTypes.ADD_RIGHT:
            return Object.assign({}, state, {
                rights: [...state.rights, action.id]
            });
        case filterTypes.REMOVE_RIGHT:

            let index = state.rights.indexOf(action.id);
            state.rights.splice(index, 1);
            return Object.assign({}, state, {
                rights: [...state.rights]
            });
        case filterTypes.UPDATE_COUNTRIES:
            return Object.assign({}, state, {
                countries: action.countries
            });
        case filterTypes.UPDATE_EXCLUSIVE:
            return Object.assign({}, state, {
                exclusive: action.exclusive
            });
        default:
            return state;
    }
};