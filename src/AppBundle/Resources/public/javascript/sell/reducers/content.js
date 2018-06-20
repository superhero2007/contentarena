export const contentType= {
    CONTENT_INIT:'CONTENT_INIT',
    STEP_CHANGE_RESET : 'STEP_CHANGE_RESET',
    GO_TO_STEP: 'GO_TO_STEP',
    GO_TO_NEXT_STEP: 'GO_TO_NEXT_STEP',
    GO_TO_PREVIOUS_STEP: 'GO_TO_PREVIOUS_STEP',
    ADD_NEW : 'ADD_NEW',
    REMOVE_NEW : 'REMOVE_NEW',
    SUPER_RIGHTS_UPDATED: 'SUPER_RIGHTS_UPDATED',
    UPDATE_CONTENT_VALUE : 'UPDATE_CONTENT_VALUE',
    SELECT_TOURNAMENT : 'SELECT_TOURNAMENT',
    REMOVE_FROM_MULTIPLE : 'REMOVE_FROM_MULTIPLE',
    UPDATE_FROM_MULTIPLE : 'UPDATE_FROM_MULTIPLE',
    APPLY_SELECTION : 'APPLY_SELECTION',
    UPDATE_PROGRAMS : 'UPDATE_PROGRAMS',
    UPDATE_SALES_PACKAGES : 'UPDATE_SALES_PACKAGES',
    ADD_SALES_PACKAGES : 'ADD_SALES_PACKAGES'

};

export const content = (state = {
    step: 1,
    rightsPackage : [],
    tournament : [],
    sportCategory : [],
    sports : [],
    seasons: [],
    programs : [],
    salesPackages : [],
    endDateLimit : 30,
    counter : 0,
    currency : "EUR",
    startDateMode : "LICENSE",
    stepChange : false,
    vat : "no"
}, action) => {

    let newState = {};

    switch (action.type) {
        case contentType.CONTENT_INIT:
            return Object.assign({}, state, action.content);
        case contentType.GO_TO_NEXT_STEP:
            return Object.assign({}, state, {
                step:state.step + 1,
                stepChange : true
            });
        case contentType.GO_TO_STEP:
            return Object.assign({}, state, {
                step: action.step,
                stepChange : true
            });
        case contentType.STEP_CHANGE_RESET:
            return Object.assign({}, state, {
                stepChange : false
            });
        case contentType.GO_TO_PREVIOUS_STEP:
            return Object.assign({}, state, {
                step: state.step -1,
                stepChange : true
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
        case contentType.UPDATE_FROM_MULTIPLE:
            newState = {};
            newState[action.selectorType] = [...state[action.selectorType]];
            newState[action.selectorType][action.index][action.key] = action.value;
            return Object.assign({}, state, newState);
        case contentType.SUPER_RIGHTS_UPDATED:

            if ( action.reset ) return Object.assign({}, state, {rightsPackage : [] });
            return Object.assign({}, state, {
                rightsPackage : Array.from(action.rightsPackage.values())
            });
        case contentType.UPDATE_PROGRAMS:

            let programs = [...state.programs];

            if ( action.name === "remove" ) {

                if ( programs.length >= 1 ) {
                    programs.splice(action.index,1)
                }  else {
                    programs[0]= {name: '', saved: false}
                }
            }
            //if ( action.name === "add" ) programs = [...programs,action.program];
            if ( action.name === "add" ) programs = [action.program];
            if ( action.name === "save" ) programs[action.index] = action.program;


            return Object.assign({}, state, {
                programs : programs
            });
        case contentType.UPDATE_SALES_PACKAGES:

            let salesPackages = [...state.salesPackages];

            if ( action.name === "remove" ) {

                if ( salesPackages.length >= 1 ) {
                    salesPackages.splice(action.index,1)
                }
            }

            if ( action.name === "removeAll" ) {
                salesPackages = [];
            }

            if ( action.name === "save" ) salesPackages[action.index] = action.salesPackage;

            return Object.assign({}, state, {
                salesPackages : salesPackages
            });

        case contentType.ADD_SALES_PACKAGES:
            return Object.assign({}, state, {
                salesPackages : [...state.salesPackages,...action.salesPackages]
            });

        default:
            return state;
    }
};