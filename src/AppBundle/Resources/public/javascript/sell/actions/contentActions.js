import {contentType} from "../reducers/content";

export const goToPreviousStep = () =>{
    return{
        type: contentType.GO_TO_PREVIOUS_STEP,
    }
};

export const updateContentValue = (key, value) => dispatch({
    type: 'UPDATE_CONTENT_VALUE',
    key: key,
    value : value
});
