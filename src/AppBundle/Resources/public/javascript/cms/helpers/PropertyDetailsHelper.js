
export const getRightsValue = (config, rights, context) => {
	const { key } = config;

	if (rights.length === 0) return;

	let values = [];
	for (const value of rights) {
		values = [...values, value.selectedRights[key]];
	}

	values = [...new Set(values)];

	return values.length > 1 ? "Multiple values selected" : context.t(`RIGHTS_${values[0]}`);
};
