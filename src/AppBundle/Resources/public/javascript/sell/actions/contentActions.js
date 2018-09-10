import {contentType} from "../reducers/content";

export const scrollTopMainContent = () => {
    const mainContent = document.querySelectorAll('body > .main-content')[0];

    if (mainContent) {
        mainContent.scrollIntoView();
    }
};

export const goToPreviousStep = () =>{
    scrollTopMainContent();

    return{
        type: contentType.GO_TO_PREVIOUS_STEP,
    }
};

export const goToNextStep = () =>{
    scrollTopMainContent();

    return{
        type: contentType.GO_TO_NEXT_STEP,
    }
};

export const goToStep = ( step) =>{
    scrollTopMainContent();
    
    return{
        type: contentType.GO_TO_STEP,
        step
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
