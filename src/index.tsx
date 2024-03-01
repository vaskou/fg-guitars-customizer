import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import store from './redux/store';
import App from "./App";
import './main.scss';

const element = document.getElementById('app') as Element;

const root = createRoot(element);
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);