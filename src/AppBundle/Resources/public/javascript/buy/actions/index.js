import { marketplaceTypes } from "../reducers/marketplace";

let nextTodoId = 0;

export const test = text => ({
	type: marketplaceTypes.TEST,
	id: nextTodoId++,
	text,
});
