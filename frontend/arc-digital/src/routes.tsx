import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UpdateInventory from './pages/updateInventory'
import UserInventory from './pages/userInventory'
import Dashboard from './pages/dashboard'
import Feedback from './pages/feedback';
import PageNotFound from './pages/pageNotFound';

function Routing() {
	return (
		<BrowserRouter basename="/">
			<Routes>
				<Route path="/" Component={Dashboard} />
				<Route path="/dashboard" Component={Dashboard} />
				<Route path="/dashboard/feedback" Component={Feedback} />
				<Route path="/dashboard/updateInventory" Component={UpdateInventory} />
				<Route path="/dashboard/userInventory" Component={UserInventory} />
				<Route path="*" Component={PageNotFound} />
			</Routes>
		</BrowserRouter>
	);
}

export default Routing;
