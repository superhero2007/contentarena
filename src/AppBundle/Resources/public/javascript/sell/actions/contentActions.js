import {contentType} from "../reducers/content";

export const goToPreviousStep = () =>{
    return{
        type: contentType.GO_TO_PREVIOUS_STEP,
    }
};

export const goToNextStep = () =>{
    return{
        type: contentType.GO_TO_NEXT_STEP,
    }
};

export const stepChangeReset = () =>{
    return{
        type: contentType.STEP_CHANGE_RESET,
    }
};

export const updateContentValue = (key, value) => {
    return{
        type: 'UPDATE_CONTENT_VALUE',
        key: key,
        value : value
    }
};
