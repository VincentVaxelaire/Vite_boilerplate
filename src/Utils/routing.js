// Define the Page class
class Page {
    constructor({ title, url, htmlFile, nestedLayout = false }) {
        this.title = title;
        this.url = url;
        this.htmlFile = htmlFile;
        this.nestedLayout = nestedLayout;
    }

    loadContent() {
        // Perform a fetch request to load the HTML content
        return fetch(this.htmlFile).then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Network response was not OK');
            }
        });
    }
}

// Define the Layout class
class Layout {
    constructor(htmlFile) {
        this.htmlFile = htmlFile;
    }

    loadContent() {
        // Perform a fetch request to load the HTML content
        return fetch(this.htmlFile).then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Network response was not OK');
            }
        });
    }
}

// Define the NestedLayout class for specific page layouts
class NestedLayout extends Layout {
    constructor(htmlFile, showGlobalLayout) {
        super(htmlFile);
        this.showGlobalLayout = showGlobalLayout;
    }

    showGlobal() {
        return this.showGlobalLayout;
    }
}

// Define the App class
class App {
    constructor(mount, pages, layout) {
        this.mount = mount;
        this.pages = pages;
        this.layout = layout;
        this.currentUrl = null;

        // Bind the event listener to handle navigation
        window.addEventListener('popstate', this.handleNavigation.bind(this));
        this.mount.addEventListener('click', this.handleLinkClick.bind(this));

        // Load the initial page
        this.handleNavigation();
    }

    navigate(url) {
        // Update the browser history
        window.history.pushState(null, null, url);

        // Handle the navigation
        this.handleNavigation();
    }

    handleNavigation() {
        // Get the current URL from the browser
        const url = window.location.pathname;

        // Find the matching page based on the URL
        const page = this.pages.find((p) => p.url === url);

        if (page) {
            // Load the page content and layout
            Promise.all([
                page.loadContent(),
                page.nestedLayout ? page.nestedLayout.loadContent() : Promise.resolve(null),
                this.layout.loadContent(),
            ]).then(([htmlContent, nestedLayoutContent, layoutContent]) => {
                // Determine if a nested layout should be used or fallback to the global layout
                if (page.nestedLayout) {
                    // Check if the nested layout should show the global layout
                    if (page.nestedLayout.showGlobal()) {
                        // Update the layout with the global layout and nested layout content
                        layoutContent = layoutContent.replace(
                            '<slot></slot>',
                            nestedLayoutContent.replace('<slot></slot>', htmlContent)
                        );
                    } else {
                        // Update the layout with only the nested layout content
                        layoutContent = nestedLayoutContent.replace('<slot></slot>', htmlContent);
                    }
                } else {
                    // Update the layout with the page content only
                    layoutContent = layoutContent.replace('<slot></slot>', htmlContent);
                }

                this.mount.innerHTML = layoutContent;
            });

            this.currentUrl = url;
        }
    }

    handleLinkClick(event) {
        const target = event.target;
        if (target.tagName === 'A' && target.hasAttribute('data-navigation')) {
            event.preventDefault();
            const url = target.getAttribute('href');
            this.navigate(url);
        }
    }
}

export { App, Page, Layout, NestedLayout }