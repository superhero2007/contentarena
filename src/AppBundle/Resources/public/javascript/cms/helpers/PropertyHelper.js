
export const getPropertyName = (property) => {
	const {
		sports,
		sportCategory,
		tournament,
	} = property;

	let name = "";

	if (sports && sports.length > 0) name += `${sports[0].name}`;

	if (sportCategory && sportCategory.length > 0) name += ` - ${sportCategory[0].name}`;

	if (tournament && tournament.length > 0) name += ` - ${tournament[0].name}`;

	return name;
};
