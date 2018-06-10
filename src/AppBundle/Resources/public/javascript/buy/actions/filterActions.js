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