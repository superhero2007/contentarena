const content = (state = {
    listingInfo : {
        step: 1,
        rights_package : [],
        category : null,
        sports : [],
        seasons: []
    },

    selectorInfo : {
        type: "sport",
        open : false,
        selectorItems: [],
        popularItems: []
    },

}, action) => {

    let listingInfo = {};

    switch (action.type) {
        case 'CONTENT_INIT':
            return Object.assign({}, state, {
                listingInfo: Object.assign({}, state.listingInfo,action.content)
            });
        case 'GO_TO_NEXT_STEP':

            listingInfo = {
                step: state.listingInfo.step + 1
            };

            return Object.assign({}, state, {
                listingInfo: Object.assign({}, state.listingInfo, listingInfo)
            });
        case 'GO_TO_PREVIOUS_STEP':
            listingInfo = {
                step: state.listingInfo.step -1
            };
            return Object.assign({}, state, {
                listingInfo: Object.assign({}, state.listingInfo, listingInfo)
            });

        case 'ADD_NEW_SPORT':
            return Object.assign({}, state, { listingInfo: Object.assign({}, state.listingInfo,{ newSport: true }) });

        case 'REMOVE_NEW_SPORT':
            return Object.assign({}, state, { listingInfo: Object.assign({}, state.listingInfo,{ newSport: false }) });

        case 'ADD_NEW_TOURNAMENT':
            return Object.assign({}, state, {listingInfo: Object.assign({}, state.listingInfo,{
                newTournament: true,
                tournament : null
            }) });

        case 'REMOVE_NEW_TOURNAMENT':
            return Object.assign({}, state, {listingInfo: Object.assign({}, state.listingInfo,{
                newTournament: false, custom_tournament: null
            }) });

        case 'UPDATE_CONTENT_VALUE':
            listingInfo = {};
            listingInfo[action.key] = action.value;

            return Object.assign({}, state, {
                listingInfo: Object.assign({}, state.listingInfo, listingInfo)
            });

        case 'SELECT_TOURNAMENT':
            listingInfo = {};
            listingInfo.tournament = action.tournament;
            listingInfo.sports = (action.tournament.sport ) ? [action.tournament.sport] : [];
            listingInfo.sport_category = action.tournament.sportCategory;

            return Object.assign({}, state, {
                listingInfo: Object.assign({}, state.listingInfo, listingInfo)
            });

        case 'OPEN_SELECTOR':
            return Object.assign({}, state, {
                selectorInfo: {
                    selectorType: action.selectorType,
                    open : true,
                    selectorItems: action.selectorItems,
                    popularItems: action.popularItems,
                    activeFilter : action.activeFilter,
                    multiple : action.multiple,
                    showNewSport : action.showNewSport,
                    index : action.index,
                    showNewTournament : action.showNewTournament,
                    selected : state.listingInfo[action.selectorType]
                }
            });
        case 'CLOSE_SELECTOR':
            return Object.assign({}, state, {
                selectorInfo: {
                    selectorType: "",
                    open : false,
                    selectorItems: [],
                    popularItems: []
                }
            });

        case 'APPLY_SELECTION':

            listingInfo = {};
            listingInfo[action.selectorType] = (action.multiple ) ? [action.selectedItem] : action.selectedItem;

            if ( action.multiple ){
                listingInfo[action.selectorType] = [...state.listingInfo[action.selectorType], action.selectedItem];
            } else {
                listingInfo[action.selectorType] = action.selectedItem;
            }


            return Object.assign({}, state, {
                listingInfo: Object.assign({}, state.listingInfo, listingInfo),
                selectorInfo: {
                    selectorType: "",
                    open : false,
                    selectorItems: [],
                    popularItems: []
                }
            });

        case 'SUPER_RIGHTS_UPDATED':


            let rights_package = state.listingInfo.rights_package;
            let index = ContentArena.Utils.getIndex(action.rights_package.id, rights_package, "id");
            if (  index === -1 ){
                rights_package.push(action.rights_package)
            } else {
                rights_package.splice(index, 1)
            }

            listingInfo.rights_package = rights_package;

            return Object.assign({}, state, {
                listingInfo : Object.assign({}, state.listingInfo, listingInfo)
            });
        default:
            return state;
    }
};

export default content
