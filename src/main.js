import './style.css'

import { router, navigateTo } from './js/router.js'
import { canvas } from './js/canvas.js'

canvas(document.querySelector('#webgl'));

window.addEventListener('popstate', () => {
    router()
})

document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('[data-navigation]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault()

            navigateTo(e.target.href)
        })
    })

    router()
})