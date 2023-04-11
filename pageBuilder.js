import fs from 'fs';

const template = fs.readFileSync('./dist/index.html', 'utf8');
const pages = fs.readdirSync('./public');

pages.forEach(page => {
    const pageContent = fs.readFileSync(`./public/${page}`, 'utf8');
    if (!page.endsWith('.html')) return;
    const headContent = pageContent.match(/<head>([\s\S]*?)<\/head>/)[1];
    const mainContent = pageContent.match(/<body>([\s\S]*?)<\/body>/)[1];
    const output = template
        .replace('<slot name="head"></slot>', headContent)
        .replace('<slot name="main"></slot>', mainContent);
    fs.writeFileSync(`./dist/${page}`, output);
    console.log(`Generated file: ${page}`);
});