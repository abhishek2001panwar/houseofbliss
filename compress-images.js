#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const publicDir = path.join(__dirname, 'public');
const supportedFormats = ['.png', '.jpg', '.jpeg'];
let processed = 0;
let skipped = 0;
let errors = 0;

function getImageFiles(dir) {
  const files = [];
  
  function walk(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (supportedFormats.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }
  
  walk(dir);
  return files;
}

function compressImage(imagePath) {
  const ext = path.extname(imagePath).toLowerCase();
  const dir = path.dirname(imagePath);
  const basename = path.basename(imagePath, ext);
  const webpPath = path.join(dir, `${basename}.webp`);
  
  // Skip if WebP version already exists
  if (fs.existsSync(webpPath)) {
    console.log(`⏭️  Skipped (WebP exists): ${path.relative(publicDir, imagePath)}`);
    skipped++;
    return;
  }
  
  const stats = fs.statSync(imagePath);
  const originalSize = (stats.size / 1024 / 1024).toFixed(2);
  
  try {
    // Use ImageMagick's convert command if available, otherwise fall back to native handling
    try {
      // Try ImageMagick
      execSync(`convert "${imagePath}" -quality 80 -strip "${webpPath}"`, { stdio: 'pipe' });
    } catch (e) {
      // If ImageMagick not available, try cwebp
      try {
        execSync(`cwebp -q 80 "${imagePath}" -o "${webpPath}"`, { stdio: 'pipe' });
      } catch (e2) {
        console.log(`⚠️  Skipped (no converter): ${path.relative(publicDir, imagePath)}`);
        skipped++;
        return;
      }
    }
    
    const webpStats = fs.statSync(webpPath);
    const compressedSize = (webpStats.size / 1024 / 1024).toFixed(2);
    const reduction = (((stats.size - webpStats.size) / stats.size) * 100).toFixed(1);
    
    console.log(`✅ Compressed: ${path.relative(publicDir, imagePath)}`);
    console.log(`   ${originalSize}MB → ${compressedSize}MB (${reduction}% reduction)`);
    
    processed++;
  } catch (error) {
    console.log(`❌ Error: ${path.relative(publicDir, imagePath)} - ${error.message.split('\n')[0]}`);
    errors++;
  }
}

console.log('🖼️  Image Compression Tool');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`Scanning: ${publicDir}\n`);

const imageFiles = getImageFiles(publicDir);

if (imageFiles.length === 0) {
  console.log('No images found.');
  process.exit(0);
}

console.log(`Found ${imageFiles.length} images to process:\n`);

for (const imagePath of imageFiles) {
  compressImage(imagePath);
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`Summary:`);
console.log(`✅ Processed: ${processed}`);
console.log(`⏭️  Skipped: ${skipped}`);
console.log(`❌ Errors: ${errors}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (processed > 0) {
  console.log('💡 Next steps:');
  console.log('1. Replace <Image> components to use .webp in Next.js');
  console.log('2. Update next.config.ts to specify WebP format first');
  console.log('3. Optional: Delete original PNG/JPEG files once WebP verified\n');
}
