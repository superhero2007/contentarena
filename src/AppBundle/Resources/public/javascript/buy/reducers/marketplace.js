
export const marketplaceTypes= {
    TEST:'TEST',
};

export const marketplace = (state = {
    testItem: "marketplaceReducer"

}, action) => {

    switch (action.type) {
        case marketplaceTypes.TEST:
            return Object.assign({}, state, {
                test: action.text,
                id : action.id
            });
        default:
            return state;
    }
};