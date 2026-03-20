import os
import re

files_to_check = [
    "app/about/page.tsx",
    "app/blogs/page.tsx",
    "app/components/about.tsx",
    "app/components/gallery.tsx",
    "app/components/service1.tsx",
    "app/photography/page.tsx",
    "app/photography/[id]/page.tsx",
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
]

def fix_file(filepath):
    if not os.path.exists(filepath):
        return
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if '<img' not in content:
        return
        
    original_content = content
    
    # 1. Add import Image from "next/image"
    if 'next/image' not in content:
        if 'import React' in content:
            content = re.sub(r'(import React.*?)\n', r'\1\nimport Image from "next/image";\n', content, count=1)
        elif 'import { ' in content:
            content = 'import Image from "next/image";\n' + content
        else:
            content = 'import Image from "next/image";\n' + content

    # Replace specific parallax <img> in service*/page.tsx
    content = re.sub(
        r'<img\s+src=\{src\}\s+alt=\{alt\}\s+style=\{\{(.*?)\}\}\s*\/>',
        r'<Image src={src} alt={alt} width={1200} height={1600} style={{\1}} />',
        content,
        flags=re.DOTALL
    )

    # Replace other <img ... /> generic instances by adding width and height to be safe
    # Using a simple logic: if <img doesn't have width= or <Image it gets replaced to Image width height
    def sub_img(match):
        attrs = match.group(1)
        if 'width=' in attrs or 'fill' in attrs:
            if match.group(0).startswith('<img'):
                return f'<Image {attrs}>'
            return match.group(0)
        
        # Determine some reasonable defaults
        return f'<Image width={{1600}} height={{1600}} {attrs}>'

    content = re.sub(r'<img\s+([^>]+)>', sub_img, content, flags=re.DOTALL)
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for f in files_to_check:
    fix_file(f)

