import {contentType} from "../reducers/content";

export const goToPreviousStep = () =>{
    return{
        type: contentType.GO_TO_PREVIOUS_STEP,
    }
};
