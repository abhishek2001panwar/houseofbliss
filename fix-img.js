const fs = require('fs');

const files = [
  "app/about/page.tsx",
  "app/blogs/page.tsx",
  "app/components/about.tsx",
  "app/components/gallery.tsx",
  "app/components/service1.tsx",
  "app/photography/page.tsx",
  "app/photography/[id]/page.tsx",
  "app/portfolio/page.tsx",
  ...Array.from({length: 10}, (_, i) => `app/service${i+1}/page.tsx`)
];

let replaced = 0;

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  let orig = content;

  // Add import if needed
  if (content.includes('<img') && !content.includes('next/image')) {
    if (content.includes('import React')) {
      content = content.replace(/import React(.*?)\n/, 'import React$1\nimport Image from "next/image";\n');
    } else {
      content = 'import Image from "next/image";\n' + content;
    }
  }

  // Replace <img ... style={{... height: "124%" ...}} />
  content = content.replace(/<img([^>]*?)style=\{\{([\s\S]*?)\}\}([^>]*?)\/>/g, (match, prefix, styleContent, suffix) => {
    if (styleContent.includes('height: "124%"')) {
      return `<Image${prefix}style={{${styleContent}}}${suffix} width={1200} height={1600} />`;
    }
    return match;
  });

  // Replace all remaining <img ... />
  // We match `<img ` and replace it with `<Image width={1600} height={1600} `
  content = content.replace(/<img /g, '<Image width={1600} height={1600} ');
  content = content.replace(/<img\n/g, '<Image width={1600} height={1600}\n');

  if (content !== orig) {
    fs.writeFileSync(file, content);
    console.log('Fixed', file);
    replaced++;
  }
}
console.log('Done', replaced);
