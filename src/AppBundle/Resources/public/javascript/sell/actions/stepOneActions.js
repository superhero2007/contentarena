export const updateFromMultiple = (type, index, key, value) =>{
    return{
        type: 'UPDATE_FROM_MULTIPLE',
        selectorType: type,
        index: index,
        key: key,
        value: value
    }
};

export const updateAttachments = (name, index, value) =>{
    return{
        type: 'UPDATE_ATTACHMENTS',
        name: name,
        index: index,
        value: value
    }
};

export const openSportSelector = (index, selectedItems) =>{
    return{
        type : 'OPEN_SELECTOR',
        selectorItems : ContentArena.Data.FullSports,
        popularItems : ContentArena.Data.TopSports,
        selectorType : "sports",
        activeFilter : "popular",
        clean: ["tournament", "seasons", "sportCategory"],
        selectedItems : selectedItems,
        showNewSport : true,
        index : index
    }
};

export const openCategorySelector = selectedItems =>{
    return{
        type: 'OPEN_SELECTOR',
        selectorItems: ContentArena.Data.Categories,
        selectorType: "sportCategory",
        activeFilter : "ag",
        showAllCountries : true,
        showNewCategory : true,
        selectedItems: selectedItems,
        index: 0,
        clean: ["tournament", "seasons", "customCategory", "customTournament"]
    }
};

export const openTournamentSelector = selectedItems =>{
    return{
        type: 'OPEN_SELECTOR',
        selectorItems: ContentArena.Data.Tournaments,
        selectorType: "tournament",
        activeFilter : "ag",
        index: 0,
        selectedItems: selectedItems,
        showNewTournament : true,
        clean: ["seasons"]
    }
};

export const openSeasonSelector = (index, selectedItems) =>{
    return{
        type: 'OPEN_SELECTOR',
        selectorItems: ContentArena.Data.Seasons,
        selectorType: "seasons",
        multiple: true,
        index: index,
        showNewSeason : true,
        clean : [],
        selectedItems : selectedItems
    }
};

export const removeFromMultiple = (index, selectorType) =>{
    return{
        type: 'REMOVE_FROM_MULTIPLE',
        selectorType: selectorType,
        index: index
    }
};

export const updateContentValue = (key, value) =>{
    return{
        type: 'UPDATE_CONTENT_VALUE',
        key: key,
        value : value
    }
};

export const removeNewSport = index =>{
    return{
        type: 'REMOVE_NEW',
        index : index,
        selectorType : "sports",
    }
};

export const removeNewTournament = index =>{
    return{
        type: 'REMOVE_NEW',
        index : index,
        selectorType : "tournament",
    }
};

export const removeNewCategory = index =>{
    return{
        type: 'REMOVE_NEW',
        index : index,
        selectorType : "sportCategory",
    }
};

export const removeNewSeason = index =>{
    return{
        type: 'REMOVE_NEW',
        index : index,
        selectorType : "seasons",
    }
};

export const addNewSeason = index =>{
    return{
        type: 'ADD_NEW',
        index : index,
        selectorType: "seasons",
        clean : []
    }
};

export const addNewCategory = () =>{
    return{
        type : 'ADD_NEW',
        index : 0,
        selectorType: "sportCategory",
        clean : ["tournament", "seasons"]
    }
};

export const addNewTournament = () =>{
    return{
        type : 'ADD_NEW',
        index : 0,
        selectorType: "tournament",
        clean : ["seasons"]
    }
};

export const reset = () =>{
    return{
        type : 'RESET'
    }
};







