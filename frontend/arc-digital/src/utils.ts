export const upperCaseFirstLetter = (str: string) => {
	if (!str || typeof str !== 'string') {
		return ''; // Return an empty string if the input is invalid
	}
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(); // Capitalize the first letter and concatenate with the rest of the string
};

export const setLocalstorage = (id:string, value:any) => localStorage.setItem(id, value)
export const getLocalstorage = (id:string) => localStorage.getItem(id)
export const clearLocalStorage = (id:string) => localStorage.removeItem(id)