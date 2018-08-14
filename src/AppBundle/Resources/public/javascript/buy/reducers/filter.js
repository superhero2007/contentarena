
export const filterTypes= {
    ADD_RIGHT:'ADD_RIGHT',
    REMOVE_RIGHT : 'REMOVE_RIGHT',
    UPDATE_COUNTRIES : 'UPDATE_COUNTRIES',
    UPDATE_EXCLUSIVE : 'UPDATE_EXCLUSIVE',
    UPDATE_SPORT : 'UPDATE_SPORT',
    UPDATE_EVENT : 'UPDATE_EVENT',
    CLEAR : 'CLEAR',
    CLEAR_UPDATE : 'CLEAR_UPDATE',
    UPDATE_MANY : 'UPDATE_MANY'
};

const defaultFilter = {
    rights: [],
    countries: [],
    exclusive : false,
    sport: {
        value : null,
        label : "All sports"
    },
    event : "",
    forceUpdate : true

};

export const filter = (state = defaultFilter, action) => {

    switch (action.type) {
        case filterTypes.CLEAR:
            return Object.assign({}, state, defaultFilter);
        case filterTypes.CLEAR_UPDATE:
            return Object.assign({}, state, {
                forceUpdate: false
            });
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
                countries: action.countries.map(c=>c.value)
            });
        case filterTypes.UPDATE_EXCLUSIVE:
            return Object.assign({}, state, {
                exclusive: action.exclusive
            });
        case filterTypes.UPDATE_SPORT:
            return Object.assign({}, state, {
                sport: action.sport
            });
        case filterTypes.UPDATE_EVENT:
            return Object.assign({}, state, {
                event: action.event
            });
        case filterTypes.UPDATE_MANY:
            action.filters.forceUpdate = true;
            if (action.filters.rights) action.filters.rights = action.filters.rights.map(r=>Number(r));
            return Object.assign({}, defaultFilter, action.filters);
        default:
            return state;
    }
};