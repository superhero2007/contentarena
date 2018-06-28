import { filterTypes } from '../reducers/filter';

export const addRight = id => ({
    type: filterTypes.ADD_RIGHT,
    id,
});

export const removeRight = id => ({
    type: filterTypes.REMOVE_RIGHT,
    id,
});

export const updateCountries = countries => ({
    type: filterTypes.UPDATE_COUNTRIES,
    countries,
});

export const updateExclusive = exclusive => ({
    type: filterTypes.UPDATE_EXCLUSIVE,
    exclusive,
});

export const updateSport = sport => ({
    type: filterTypes.UPDATE_SPORT,
    sport
});

export const updateEvent = event => ({
    type: filterTypes.UPDATE_EVENT,
    event
});

export const clearFilter = () => ({
    type: filterTypes.CLEAR
});