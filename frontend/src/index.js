import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Shop } from './shop';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<Shop />
		</Provider>
	</BrowserRouter>,
);
