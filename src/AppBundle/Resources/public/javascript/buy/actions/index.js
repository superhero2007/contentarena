import { marketplaceTypes } from "../reducers/marketplace";

let nextTodoId = 0;

const test = text => ({
	type: marketplaceTypes.TEST,
	id: nextTodoId++,
	text,
});

export default test;
