import getElementWithContext from 'react-test-context-provider';

const contextObject = {t: key => key};

export const withContext = (component) => {
    return getElementWithContext(contextObject, component)
};