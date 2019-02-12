export const marketplaceTypes = {
    FETCH_LISTING_REQUEST: "FETCH_LISTING_REQUEST",
    FETCH_LISTING_ERROR: "FETCH_LISTING_ERROR",
    FETCH_LISTING_SUCCESS: "FETCH_LISTING_SUCCESS"
};

export const initialState = {
    listingsData: {
        success: false,
        loading: false,
        error: null,
        listings: [],
        totalItems: null
    }
};

export function marketplace(state = initialState, action) {
    switch (action.type) {
        case marketplaceTypes.FETCH_LISTING_REQUEST:
        case marketplaceTypes.FETCH_LISTING_ERROR:
        case marketplaceTypes.FETCH_LISTING_SUCCESS:
            return {
                ...state,
                listingsData: updateListings(state.listingsData, action)
            };

        default:
            return state;
    }
}

const updateListings = (state = initialState.listingsData, action) => {
    switch (action.type) {
        case marketplaceTypes.FETCH_LISTING_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                listings: [],
                totalItems: null
            };
        case marketplaceTypes.FETCH_LISTING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
                listings: action.listings,
                totalItems: action.totalItems
            };
        case marketplaceTypes.FETCH_LISTING_ERROR:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
                listings: [],
                totalItems: null
            };
        default:
            return state;
    }
};
