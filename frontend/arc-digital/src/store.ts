import { makeAutoObservable } from 'mobx';
import { setLocalstorage } from './utils';

interface User {
	branch: string;
	user_id: number;
	isAdmin: boolean;
	name: string;
	username: string;
}

class Store {
	data: Record<string, any> = {};
	isLoading: Record<string, any> = {};
	error: Record<string, any> = {};
	selectedUser: User | null = null;

	constructor() {
		makeAutoObservable(this); // Enables reactivity and automatic tracking
	}

	setSelectedUser = (user: User | null) => {
		this.selectedUser = user
		setLocalstorage('user', JSON.stringify(user))
	};

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

	// Fetch list of master stationary
	getMasterStationaryList = async () => {
		this.isLoading.masterStationaryList = true; // Set loading state
		this.error.masterStationaryList = null;

		try {
			const response = await fetch('http://127.0.0.1:8000/api/master_stationary_list'); // Your API endpoint
			const data = await response.json();
			this.data.masterStationaryList = data;
			this.isLoading.masterStationaryList = false;
		} catch (error) {
			this.isLoading.masterStationaryList = false;
			this.error.masterStationaryList = 'Failed to fetch data';
		}
	};

	// Fetch list of master fruits
	getMasterFruitList = async () => {
		this.isLoading.masterFruitList = true; // Set loading state
		this.error.masterFruitList = null;

		try {
			const response = await fetch('http://127.0.0.1:8000/api/master_fruit_list'); // Your API endpoint
			const data = await response.json();
			this.data.masterFruitList = data;
			this.isLoading.masterFruitList = false;
		} catch (error) {
			this.isLoading.masterFruitList = false;
			this.error.masterFruitList = 'Failed to fetch data';
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
			return Promise.resolve(data?.message)
		} catch (error) {
			this.isLoading.feedback = false;
			return await Promise.reject('There was some issue while saving the feedback.')
		}
	};

		// add inventory
	updateInventory = async (payload: Record<string, any>, url:string) => {
		this.isLoading.updateInventory = true; // Set loading state
		this.error.updateInventory = null;

		try {
			const response = await fetch(`http://127.0.0.1:8000/api/${url}`, {
				method: 'POST', // Set the HTTP method to POST
				headers: {
					'Content-Type': 'application/json' // Specify that we're sending JSON
				},
				body: JSON.stringify(payload) // Convert the data object to a JSON string
			});

			const data = await response.json();
			this.data.updateInventory = data;
			this.isLoading.updateInventory = false;
			if(data?.message){
				return Promise.resolve({success: data?.message})
			}
			return Promise.resolve({error:data?.error})
		} catch (error) {
			this.isLoading.updateInventory = false;
			return Promise.reject('There was some issue while saving the inventory.')
		}
	};

		// Fetch list of feedbacks
		getFeedbacks = async () => {
			this.isLoading.feedbacks = true; // Set loading state
			this.error.feedbacks = null;
	
			try {
				const response = await fetch('http://127.0.0.1:8000/api/feedbacks'); // Your API endpoint
				const data = await response.json();
				this.data.feedbacks = data;
				this.isLoading.feedbacks = false;
			} catch (error) {
				this.isLoading.feedbacks = false;
				this.error.feedbacks = 'Failed to fetch data';
			}
		};

		// Fetch list of orders
		getOrders = async () => {
			this.isLoading.orders = true; // Set loading state
			this.error.orders = null;
	
			try {
				const response = await fetch('http://127.0.0.1:8000/api/orders'); // Your API endpoint
				const data = await response.json();
				this.data.orders = data;
				this.isLoading.orders = false;
			} catch (error) {
				this.isLoading.orders = false;
				this.error.orders = 'Failed to fetch data';
			}
		};
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Store(); // Export a singleton instance of the store
