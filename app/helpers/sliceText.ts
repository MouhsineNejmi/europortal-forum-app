export const sliceText = (text: string, numOfCharacters = 100) => {
	if (text.length > numOfCharacters) {
		return text.slice(0, numOfCharacters) + "...";
	}

	return text;
};
