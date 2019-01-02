export const filterTypes= {
    ADD_RIGHT:'ADD_RIGHT',
    REMOVE_RIGHT : 'REMOVE_RIGHT',
    UPDATE_COUNTRIES : 'UPDATE_COUNTRIES',
    UPDATE_EXCLUSIVE : 'UPDATE_EXCLUSIVE',
    UPDATE_INCLUDED_COUNTRIES : 'UPDATE_INCLUDED_COUNTRIES',
    UPDATE_SPORT : 'UPDATE_SPORT',
    UPDATE_EVENT : 'UPDATE_EVENT',
    CLEAR : 'CLEAR',
    CLEAR_UPDATE : 'CLEAR_UPDATE',
    UPDATE_MANY : 'UPDATE_MANY',
    UPDATE_FILTERS_CONFIG: "UPDATE_ALL",
    UPDATE_EVENT_DATE_FROM: "UPDATE_FROM",
    UPDATE_EVENT_DATE_TO: "UPDATE_TO",
};

const defaultFilter = {
    rights: [],
    countries: [],
    exclusive : false,
    includeAllCountries : false,
    sport: {
        value : null,
        label : "All sports"
    },
    event : "",
    forceUpdate : true,
    eventDateFrom: "",
    eventDateTo: ""
};

export const filter = (state = defaultFilter, action) => {
    switch (action.type) {
        case filterTypes.UPDATE_INCLUDED_COUNTRIES:
            return Object.assign({}, state, {
                includeAllCountries: action.includeAllCountries
            });
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
        case filterTypes.UPDATE_EVENT_DATE_FROM:
            return Object.assign({}, state, {eventDateFrom: action.date});
        case filterTypes.UPDATE_EVENT_DATE_TO:
            return Object.assign({}, state, {eventDateTo: action.date});
        case filterTypes.UPDATE_EXCLUSIVE:
            return Object.assign({}, state, {
                exclusive: action.exclusive
            });
        case filterTypes.UPDATE_SPORT:
            return Object.assign({}, state, {
                sport: action.sport
            });
        case filterTypes.UPDATE_FILTERS_CONFIG:
            return Object.assign({}, state, action.filters);
        case filterTypes.UPDATE_EVENT:
            return Object.assign({}, state, {
                event: action.event
            });
        case filterTypes.UPDATE_MANY:
            action.filters.forceUpdate = true;
            if (action.filters.rights) action.filters.rights = action.filters.rights.map(r=>Number(r));
            return Object.assign({}, state, action.filters);
        default:
            return state;
    }
};