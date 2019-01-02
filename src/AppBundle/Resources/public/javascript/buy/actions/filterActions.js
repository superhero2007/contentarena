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

export const updateIncludedCountries = includeAllCountries => ({
    type: filterTypes.UPDATE_INCLUDED_COUNTRIES,
    includeAllCountries,
});

export const updateMany = filters => ({
    type: filterTypes.UPDATE_MANY,
    filters,
});

export const updateSport = sport => ({
    type: filterTypes.UPDATE_SPORT,
    sport
});

export const updateAllFilters = filters => ({
    type: filterTypes.UPDATE_FILTERS_CONFIG,
    filters
});

export const updateEvent = event => ({
    type: filterTypes.UPDATE_EVENT,
    event
});

export const clearFilter = () => ({
    type: filterTypes.CLEAR
});

export const clearUpdateFilter = () => ({
    type: filterTypes.CLEAR_UPDATE
});

export const updateEventDateFrom = (date) => ({
    type: filterTypes.UPDATE_EVENT_DATE_FROM,
    date
});

export const updateEventDateTo = (date) => ({
    type: filterTypes.UPDATE_EVENT_DATE_TO,
    date
});