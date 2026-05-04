const fs = require('fs');
const path = require('path');

const dir = '/Users/vythuy/Documents/Web';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // 1. Add style.css if not present
    if (!content.includes('style.css')) {
        content = content.replace('</head>', '    <link rel="stylesheet" href="style.css">\n</head>');
    }

    // 2. Add mobile-menu.js if not present
    if (!content.includes('mobile-menu.js')) {
        content = content.replace('</body>', '    <script src="mobile-menu.js" defer></script>\n</body>');
    }

    // 3. Add firebase-sync.js if not present
    if (!content.includes('firebase-sync.js')) {
        content = content.replace('</body>', '    <script type="module" src="firebase-sync.js"></script>\n</body>');
    }

    // 4. Optimize images for PageSpeed (add loading="lazy" if not present)
    content = content.replace(/<img\s+([^>]+)>/gi, (match, attrs) => {
        if (!attrs.includes('loading="lazy"')) {
            return `<img ${attrs} loading="lazy">`;
        }
        return match;
    });

    // 5. Defer tailwind script (actually it's CDN, might cause FOUC if deferred, but PageSpeed likes it deferred. Let's just defer tailwind script if not deferred)
    // Actually tailwind needs to be loaded sync so the page renders with styles, or else FOUC. We'll skip deferring Tailwind.

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log(`Updated ${file}`);
});
