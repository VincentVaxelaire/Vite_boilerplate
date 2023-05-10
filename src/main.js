import './style.css'

import { initRouter } from './_lib/router.js';
import { canvas } from './js/canvas.js';

canvas(document.querySelector('#webgl'));

initRouter();