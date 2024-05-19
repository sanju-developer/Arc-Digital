import React from 'react';
import { ToastContainer } from 'react-toastify';

import Routing from './routes';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
	return (
		<React.Fragment>
			<ToastContainer hideProgressBar />

			<Routing />
		</React.Fragment>
	);
}

export default App;
