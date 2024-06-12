import React from 'react';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import { Slide } from 'react-toastify';

export const categories = [
	{
		id: 1,
		name: 'Breakfast'
	},
	{
		id: 2,
		name: 'Lunch'
	},
	{
		id: 3,
		name: 'Dinner'
	}
];

export const cardsData = [
	{
		id: 'kjah23sd',
		title: 'Feedback',
		description:
			"Your feedback is important to us! To ensure that we continue providing high-quality meals for our employees, we encourage you to share your thoughts on our Lunch, Breakfast, and Dinner services. By completing this form, you help us understand what we're doing well and where we can improve.",
		route: '/dashboard/postFeedback',
		color: '#ecff4b',
		icon: <ChatOutlinedIcon />
	},
	{
		id: '@#dah23sd',
		title: 'Inventory',
		description:
			'To keep track of office supplies and ensure proper inventory management, we request that you complete this form whenever you take an item from the office, such as fruits, stationery, or other supplies.',
		route: '/dashboard/updateInventory',
		color: '#86d4f6',
		icon: <InventoryOutlinedIcon />
	},
	{
		id: '@#dah23sd',
		title: 'Hidden',
		description:
			'Coming Sooooooooon.',
		route: '/dashboard/register',
		color: '#f68686',
		icon: <></>
	}
];

export const toastOption = {
	pauseOnHover: true,
	transition: Slide,
	closeOnClick: false
}