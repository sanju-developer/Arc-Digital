import { makeAutoObservable, observable, action } from 'mobx';

class Store {
	data: Record<string, any> = {};
	isLoading: Record<string, any> = {};
	error: Record<string, any> = {};
	selectedUser: Record<string, any> = {};

	constructor() {
		makeAutoObservable(this); // Enables reactivity and automatic tracking
	}

	setSelectedUser = (user: Record<string, any>) => (this.selectedUser = user);

	// Fetch list of categories
	getCategories = async () => {
		this.isLoading.categories = true; // Set loading state
		this.error.categories = null;

		try {
			const response = await fetch('http://127.0.0.1:8000/api/categories'); // Your API endpoint
			const data = await response.json();
			this.data.categories = data;
			this.isLoading.categories = false;
		} catch (error) {
			this.isLoading.categories = false;
			this.error.categories = 'Failed to fetch data';
		}
	};

	// Fetch list of users
	getUsers = async () => {
		this.isLoading.users = true; // Set loading state
		this.error.users = null;

		try {
			const response = await fetch('http://127.0.0.1:8000/api/users'); // Your API endpoint
			const data = await response.json();
			this.data.users = data;
			this.isLoading.users = false;
		} catch (error) {
			this.isLoading.users = false;
			this.error.users = 'Failed to fetch data';
		}
	};

	// add feedback
	addFeedback = async (payload: Record<string, any>) => {
		this.isLoading.feedback = true; // Set loading state
		this.error.feedback = null;

		try {
			const response = await fetch('http://127.0.0.1:8000/api/feedback', {
				method: 'POST', // Set the HTTP method to POST
				headers: {
					'Content-Type': 'application/json' // Specify that we're sending JSON
				},
				body: JSON.stringify(payload) // Convert the data object to a JSON string
			});

			const data = await response.json();
			this.data.feedback = data;
			this.isLoading.feedback = false;
		} catch (error) {
			this.isLoading.feedback = false;
			this.error.feedback = 'Failed to fetch data';
		}
	};
}

export default new Store(); // Export a singleton instance of the store
