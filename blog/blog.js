const blogPages = document.getElementById('blog-pages');
const pageTemplate = document.getElementById('blog-page-template');

const pages = [
    // {
    //     title: "Windoes Shortcuts",
    //     desc: "Useful shortcuts for your daily user",
    //     onclick: "html/Productivity/ShortcutGuide.html"
    // },
]

pages.forEach(page => {
    const instance = document.importNode(pageTemplate.content, true);
    instance.querySelector('.blog-title').innerHTML = page.title;
    instance.querySelector('.blog-desc').innerHTML = page.desc;
    instance.firstElementChild.onclick = (e) => window.open(page.onclick, '_blank');
    blogPages.append(instance);
});