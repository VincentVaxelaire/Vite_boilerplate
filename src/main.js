import { App, Page, Layout, NestedLayout } from './Utils/routing.js'

const pages = [
    new Page({
        title: 'Home Page',
        url: '/',
        htmlFile: './routes/index.html',
    }),
    new Page({
        title: 'About Page',
        url: '/about',
        htmlFile: './routes/about/index.html',
    }),
    new Page({
        title: 'Contact Page',
        url: '/contact',
        htmlFile: './routes/contact/index.html',
        nestedLayout: new NestedLayout('./routes/contact/layout.html', true),
    }),
];

// Create the app instance
new App(document.getElementById('app'), pages, new Layout('./routes/layout.html'));