import {selectorType} from "./selector";

export const contentType= {
    CONTENT_INIT:'CONTENT_INIT',
    GO_TO_NEXT_STEP: 'GO_TO_NEXT_STEP',
    GO_TO_PREVIOUS_STEP: 'GO_TO_PREVIOUS_STEP',
    ADD_NEW : 'ADD_NEW',
    REMOVE_NEW : 'REMOVE_NEW',
    SUPER_RIGHTS_UPDATED: 'SUPER_RIGHTS_UPDATED',
    UPDATE_CONTENT_VALUE : 'UPDATE_CONTENT_VALUE',
    SELECT_TOURNAMENT : 'SELECT_TOURNAMENT',
    REMOVE_FROM_MULTIPLE : 'REMOVE_FROM_MULTIPLE',
    APPLY_SELECTION : 'APPLY_SELECTION'
};

export const content = (state = {
    step: 1,
    rightsPackage : [],
    tournament : [],
    sportCategory : [],
    sports : [],
    seasons: []
}, action) => {

    let newState = {};

    switch (action.type) {
        case contentType.CONTENT_INIT:
            return Object.assign({}, state, action.content);
        case contentType.GO_TO_NEXT_STEP:
            return Object.assign({}, state, {
                step:state.step + 1
            });
        case contentType.GO_TO_PREVIOUS_STEP:
            return Object.assign({}, state, {
                step: state.step -1
            });
        case contentType.REMOVE_NEW:
            newState = {};
            newState[action.selectorType] = [...state[action.selectorType]];
            newState[action.selectorType].splice(action.index, 1);

            return Object.assign({}, state, newState);
        case contentType.ADD_NEW:
            newState = {};
            newState[action.selectorType] = [...state[action.selectorType]];
            newState[action.selectorType][action.index] = {
                custom : true,
                name: ""
            };

            if ( action.clean ){
                action.clean.forEach((selectorType)=>{
                    newState[selectorType] = $.isArray(state[selectorType]) ? [] : null;
                });
            }

            return Object.assign({}, state, newState);

        case contentType.UPDATE_CONTENT_VALUE:
            newState = {};
            newState[action.key] = action.value;

            return Object.assign({}, state, newState);
        case contentType.SELECT_TOURNAMENT:
            newState = {};
            newState.tournament = [action.tournament];
            newState.sports = (action.tournament.sport ) ? [action.tournament.sport] : [];
            newState.sportCategory = [action.tournament.sportCategory];

            return Object.assign({}, state, newState);
        case contentType.APPLY_SELECTION:

            newState = {};

            let selectedItems = Array.from( action.selectedItems.values() );

            newState[action.selectorType] = [...state[action.selectorType]];

            if ( action.multiple ){
                newState[action.selectorType] = selectedItems;
            } else {
                newState[action.selectorType][action.index] = selectedItems[0];
            }

            if ( action.clean ){
                action.clean.forEach((selectorType)=>{
                    newState[selectorType] = $.isArray(state[selectorType]) ? [] : null;
                });
            }

            return Object.assign({}, state, newState);
        case contentType.REMOVE_FROM_MULTIPLE:
            newState = {};
            newState[action.selectorType] = [...state[action.selectorType]];
            newState[action.selectorType].splice(action.index,1);
            return Object.assign({}, state, newState);
        case contentType.SUPER_RIGHTS_UPDATED:

            let rightsPackage = state.rightsPackage;
            let index = ContentArena.Utils.getIndex(action.rightsPackage.id, rightsPackage, "id");
            if (  index === -1 ){
                rightsPackage.push(action.rightsPackage)
            } else {
                rightsPackage.splice(index, 1)
            }

            return Object.assign({}, state, {
                rightsPackage : rightsPackage
            });
        default:
            return state;
    }
};