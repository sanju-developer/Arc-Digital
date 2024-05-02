import { makeAutoObservable, observable, action } from 'mobx';

class Store {
	data: Record<string, any> = {};
	isLoading: boolean = false;
	error: Record<string, any> = {};

	constructor() {
		makeAutoObservable(this); // Enables reactivity and automatic tracking
	}

	// Action to fetch data from a remote API
	getUsers = async () => {
		this.isLoading = true; // Set loading state
		this.error.users = null;

		try {
			const response = await fetch('http://127.0.0.1:8000/api/users'); // Your API endpoint
			const data = await response.json();

			this.data.users = data;
			this.isLoading = false;
		} catch (error) {
			this.isLoading = false;
			this.error.users = 'Failed to fetch data';
		}
	};
}

export default new Store(); // Export a singleton instance of the store
