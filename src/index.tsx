import './main.scss';
import {render} from '@wordpress/element';
// import App from './App';

window.addEventListener(
    'load',
    function () {
        render(
            <div>test1</div>,
            document.querySelector('#app')
        );
    },
    false
);