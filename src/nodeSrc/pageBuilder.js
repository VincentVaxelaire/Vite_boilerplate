// import fs from 'fs';

// const template = fs.readFileSync('./dist/index.html', 'utf8');
// const pages = fs.readdirSync('./public');

// pages.forEach(page => {
//     const pageContent = fs.readFileSync(`./public/${page}`, 'utf8');
//     if (!page.endsWith('.html')) return;
//     // get the content inside <slot> tags in <head> and <body>
//     const headContent = pageContent.match(/<slot name="head">([\s\S]*?)<\/slot>/)[1];
//     const mainContent = pageContent.match(/<slot name="main">([\s\S]*?)<\/slot>/)[1];
//     const output = template
//         .replace('<slot name="head"></slot>', headContent)
//         .replace('<slot name="main"></slot>', mainContent);
//     fs.writeFileSync(`./dist/${page}`, output);
//     console.log(`Generated file: ${page}`);
// });

import fs from 'fs';

// Read the template file
const template = fs.readFileSync('./index.html', 'utf8');

// Read the page files in the ./public/routes directory
const pages = fs.readdirSync('./public/routes');

// Loop through each page file
pages.forEach((page) => {
    // Get the path to the page file or directory
    const pagePath = `./public/routes/${page}`;

    // Check if the file or directory exists
    if (!fs.existsSync(pagePath)) return;

    // Check if the path is a directory
    if (fs.lstatSync(pagePath).isDirectory()) {
        // Read the index.html file inside the directory
        const pageContent = fs.readFileSync(`${pagePath}/index.html`, 'utf8');

        // Get the content inside <slot> tags in <head> and <body>
        const headContent = pageContent.match(/<slot name="head">([\s\S]*?)<\/slot>/)[1];
        const mainContent = pageContent.match(/<slot name="main">([\s\S]*?)<\/slot>/)[1];

        // Replace the placeholders in the template with the page content
        const output = template
            .replace('<slot name="head"></slot>', headContent)
            .replace('<slot name="main"></slot>', mainContent);

        // Write the generated file to the ./dist directory
        fs.writeFileSync(`./dist/${page}`, output);

        console.log(`Generated file: ${page}`);
    } else if (page.endsWith('.html')) {
        // Read the page file
        const pageContent = fs.readFileSync(pagePath, 'utf8');

        // Replace the placeholders in the template with the page content
        const output = template.replace('<slot name="main"></slot>', pageContent);

        // Write the generated file to the ./dist directory
        fs.writeFileSync(`./dist/${page}`, output);

        console.log(`Generated file: ${page}`);
    }
});