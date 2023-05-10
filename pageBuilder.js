import fs from 'fs';

const template = fs.readFileSync('./dist/index.html', 'utf8');
const pages = fs.readdirSync('./public');

pages.forEach(page => {
    const pageContent = fs.readFileSync(`./public/${page}`, 'utf8');
    if (!page.endsWith('.html')) return;
    // get the content inside <slot> tags in <head> and <body>
    const headContent = pageContent.match(/<slot name="head">([\s\S]*?)<\/slot>/)[1];
    const mainContent = pageContent.match(/<slot name="main">([\s\S]*?)<\/slot>/)[1];
    const output = template
        .replace('<slot name="head"></slot>', headContent)
        .replace('<slot name="main"></slot>', mainContent);
    fs.writeFileSync(`./dist/${page}`, output);
    console.log(`Generated file: ${page}`);
});