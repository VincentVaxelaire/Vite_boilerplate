import './style.css'

import { router } from './_lib/router.js';
import { canvas } from './js/canvas.js';

canvas(document.querySelector('#webgl'));
router.init();