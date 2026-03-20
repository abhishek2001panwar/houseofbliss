const fs = require('fs');
const glob = require('crypto').randomBytes; // well I don't need glob, I can just read dirs

const files = [
  "app/about/page.tsx",
  "app/blogs/page.tsx",
  "app/components/about.tsx",
  "app/components/gallery.tsx",
  "app/components/service1.tsx",
  "app/photography/page.tsx",
  "app/portfolio/page.tsx",
  "app/service1/page.tsx",
  "app/service2/page.tsx",
  "app/service3/page.tsx",
  "app/service4/page.tsx",
  "app/service5/page.tsx",
  "app/service6/page.tsx",
  "app/service7/page.tsx",
  "app/service8/page.tsx",
  "app/service9/page.tsx",
  "app/service10/page.tsx"
];

let replacedCount = 0;

for (const file of files) {
  if (!fs.existsSync(file)) continue;

  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Ensure Import
  if (content.includes('<img') && !content.includes('next/image')) {
    if (content.includes('import React')) {
      content = content.replace(/import React(.*?)\n/, 'import React$1\nimport Image from "next/image";\n');
    } else {
      content = 'import Image from "next/image";\n' + content;
    }
    changed = true;
  }

  // 1. the manual style one in service/about parallax ParallaxImg
  if (content.includes('width: "100%",\n            height: "124%",')) {
      content = content.replace(
        /<img\s+src=\{src\}\s+alt=\{alt\}\s+style=\{\{(.*?)\}\}\s*\/>/gs, 
        '<Image src={src} alt={alt} width={1200} height={1600} style={{$1}} />'
      );
      changed = true;
  }

  // 2. Generic <img src={...} className="..." />
  // Careful not to match if it spans weirdly, we match simple tags
  const imgRegex = /<img\s+([^>]*?)(\/?)>/g;
  content = content.replace(imgRegex, (match, attrs, selfClose) => {
    if (match.includes('width={') || match.includes('fill')) return match; // Already handled or ignored?
    // We can just add fill and sizes if they don't have style width/height inside
    // Because sometimes img is in a container. Let's just use width={1200} height={1200} or fill
    // If it has object-cover, it's safer to use fill if the parent has relative/overflow-hidden.
    // Wait, let's just make it <Image width={1200} height={1200} ... > to be safe if fill requires parent relative.
    
    // We already handled the parallax `img` in Service files. Let's handle the rest by adding width/height.
    if (!match.includes('width=') && !match.includes('fill')) {
        return `<Image width={1200} height={1200} ${attrs}${selfClose ? '/' : ''}>`;
    }
    return match;
  });

  if (content !== fs.readFileSync(file, 'utf8')) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
    replacedCount++;
  }
}

console.log('Done, modified', replacedCount, 'files.');
