import { routes } from '../routes.js';

class Router {
  static instance;

  static getInstance() {
    if (!Router.instance) {
      Router.instance = new Router();
    }
    return Router.instance;
  }

  constructor() {
    this.currentRoute = null;
  }

  init() {
    window.addEventListener('popstate', () => {
      this.navigate();
    });

    document.addEventListener('DOMContentLoaded', () => {
      const navLinks = document.querySelectorAll('[data-navigation]');
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.navigateTo(e.target.href);
        })
      });

      this.navigate();
    });
  }

  navigateTo(url) {
    history.pushState(null, null, url);
    this.navigate();
  }

  async navigate() {
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

    if (this.currentRoute === match.route) {
      return;
    }

    this.currentRoute = match.route;

    const view = await fetch(match.route.view)
      .then(res => res.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const app = document.querySelector('slot[name="main"]');
        app.innerHTML = doc.querySelector('slot[name="main"]').innerHTML;
      })
      .catch(error => console.log(error));

    const event = new CustomEvent('navigation', { detail: { page: location.pathname } });
    window.dispatchEvent(event);
  }
}

export const router = Router.getInstance();