const content = (state = {
    listingInfo : {
        step: 1,
        rightsPackage : [],
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

        case 'ADD_NEW_SEASON':
            return Object.assign({}, state, {listingInfo: Object.assign({}, state.listingInfo,{
                newSeason: true
            }) });

        case 'REMOVE_NEW_TOURNAMENT':
            return Object.assign({}, state, {listingInfo: Object.assign({}, state.listingInfo,{
                newTournament: false, customTournament: null
            }) });

        case "REMOVE_NEW_SEASON":
            return Object.assign({}, state, {listingInfo: Object.assign({}, state.listingInfo,{
                    newSeason: false, customSeason: null
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
            listingInfo.sportCategory = action.tournament.sportCategory;

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
                    showNewSeason : action.showNewSeason,
                    selected : state.listingInfo[action.selectorType],
                    clean : action.clean
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
                listingInfo[action.selectorType] = [...state.listingInfo[action.selectorType]];
                listingInfo[action.selectorType][action.index] = action.selectedItem;
            } else {
                listingInfo[action.selectorType] = action.selectedItem;
            }

            if ( action.clean ){
                action.clean.forEach((selectorType)=>{
                    listingInfo[selectorType] = $.isArray(state.listingInfo[selectorType]) ? [] : null;
                });
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

        case 'REMOVE_FROM_MULTIPLE':

            listingInfo = {};
            listingInfo[action.selectorType] = [...state.listingInfo[action.selectorType]];
            listingInfo[action.selectorType].splice(action.index,1);
            return Object.assign({}, state, {
                listingInfo: Object.assign({}, state.listingInfo, listingInfo)
            });

        case 'SUPER_RIGHTS_UPDATED':


            let rightsPackage = state.listingInfo.rightsPackage;
            let index = ContentArena.Utils.getIndex(action.rightsPackage.id, rightsPackage, "id");
            if (  index === -1 ){
                rightsPackage.push(action.rightsPackage)
            } else {
                rightsPackage.splice(index, 1)
            }

            listingInfo.rightsPackage = rightsPackage;

            return Object.assign({}, state, {
                listingInfo : Object.assign({}, state.listingInfo, listingInfo)
            });
        default:
            return state;
    }
};

export default content
