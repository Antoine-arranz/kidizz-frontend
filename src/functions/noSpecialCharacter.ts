export const noSpecialCharacter = (searchInput: string | null): boolean => {
	const regexp = new RegExp(/([(&#)_{[|\\@<>)\]=}+%*$!/:;.?",])+/, 'g');
	return searchInput ? !regexp.test(searchInput) : true;
};
