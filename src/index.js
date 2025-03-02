import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import store from './store/store.js';
import App from './App.js';
import Home from './pages/Home.jsx';
import ResultDetail from './pages/ResultDetail';
import ResultJodi from './pages/ResultJodi';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/', // This sets Home as the default route
                element: <Home />,
            },
            {
                path: "result/:gameName/jodi",
                element: <ResultJodi />,
            },
            {
                path: "result/:gameName/panel",
                element: <ResultDetail />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
