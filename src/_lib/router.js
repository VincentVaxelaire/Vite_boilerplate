import { routes } from '../routes.js';

let currentRoute = null;

function initRouter() {
  window.addEventListener('popstate', () => {
    navigate();
  });

  document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('[data-navigation]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(e.target.href);
      })
    });

    navigate();
  });
}

function navigateTo(url) {
  history.pushState(null, null, url);
  navigate();
}

async function navigate() {
  const potentialMatches = routes.map(route => {
    return {
      route,
      isMatch: location.pathname === route.path
    };
  });

  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)

  if (!match) {
    match = {
      route: routes[routes.length - 1],
      isMatch: true
    }
  }

  if (currentRoute === match.route) {
    return;
  }

  currentRoute = match.route;

  const view = await fetch(match.route.view)
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const app = document.querySelector('slot[name="main"]');
      app.innerHTML = doc.querySelector('slot[name="main"]').innerHTML;

      const head = document.querySelector('slot[name="head"]');
      head.innerHTML = doc.querySelector('slot[name="head"]').innerHTML;
    })
    .catch(error => console.log(error));

  const event = new CustomEvent('navigation', { detail: { page: location.pathname } });
  window.dispatchEvent(event);
}

export { initRouter, navigateTo };