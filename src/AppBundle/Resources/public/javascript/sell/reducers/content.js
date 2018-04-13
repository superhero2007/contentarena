const content = (state = {
    step: 1,
    rights_package : [],
    selectorInfo : {
        type: "sport",
        open : false,
        selectorItems: [],
        popularItems: []
    },
    category : null,
    sports : []
}, action) => {

    switch (action.type) {
        case 'CONTENT_INIT':
            return Object.assign({}, state, action.content);
        case 'GO_TO_NEXT_STEP':
            return Object.assign({}, state, {
                step: state.step + 1
            });
        case 'GO_TO_PREVIOUS_STEP':
            return Object.assign({}, state, {
                step: state.step - 1
            });

        case 'UPDATE_CONTENT_VALUE':
            let newState = {};
            newState[action.key] = action.value;
            return Object.assign({}, state, newState);


        case 'OPEN_SELECTOR':
            return Object.assign({}, state, {
                selectorInfo: {
                    selectorType: action.selectorType,
                    open : true,
                    selectorItems: action.selectorItems,
                    popularItems: action.popularItems,
                    activeFilter : action.activeFilter,
                    multiple : action.multiple
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

            let selection = {
                selectorInfo: {
                    selectorType: "",
                    open : false,
                    selectorItems: [],
                    popularItems: []
                }
            };

            selection[action.selectorType] = (action.multiple ) ? [action.selectedItem] : action.selectedItem;

            return Object.assign({}, state, selection);

        case 'SUPER_RIGHTS_UPDATED':

            console.log("SUPER_RIGHTS_UPDATED");
            let rights_package = state.rights_package;
            let index = ContentArena.Utils.getIndex(action.rights_package.id, rights_package, "id");
            if (  index === -1 ){
                rights_package.push(action.rights_package)
            } else {
                rights_package.splice(index, 1)
            }

            return Object.assign({}, state, {
                rights_package: rights_package
            });
        default:
            return state;
    }
};

export default content
