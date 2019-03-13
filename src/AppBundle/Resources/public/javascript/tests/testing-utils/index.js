import getElementWithContext from "react-test-context-provider";

const contextObject = { t: key => key };

const withContext = component => getElementWithContext(contextObject, component);

export default withContext;
