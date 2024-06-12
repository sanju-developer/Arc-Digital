import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const UpdateInventory = React.lazy(() => import('./pages/updateInventory'))
const UserInventory = React.lazy(() => import('./pages/userInventory'))
const Dashboard = React.lazy(() => import('./pages/dashboard'))
const PostFeedback = React.lazy(() => import('./pages/postFeedback'))
const PageNotFound = React.lazy(() => import('./pages/pageNotFound'))
const Orders = React.lazy(() => import('./pages/orders'))
const Feedbacks = React.lazy(() => import('./pages/feedbacks'))

function Routing() {
	return (
		<BrowserRouter basename="/">
			<React.Suspense fallback={<p>Loading...</p>}>
				<Routes>
					<Route path="/" Component={Dashboard} />
					<Route path="/dashboard" Component={Dashboard} />
					<Route path="/dashboard/postFeedback" Component={PostFeedback} />
					<Route path="/dashboard/updateInventory" Component={UpdateInventory} />
					<Route path="/dashboard/userInventory" Component={UserInventory} />
					<Route path="/dashboard/orders" Component={Orders} />
					<Route path="/dashboard/feedbacks" Component={Feedbacks} />
					<Route path="*" Component={PageNotFound} />
				</Routes>
			</React.Suspense>
		</BrowserRouter>
	);
}

export default Routing;
