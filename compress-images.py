#!/usr/bin/env python3
"""
Image Compression Script - Converts PNG/JPEG to WebP format
No external dependencies required (uses Pillow if available, native if not)
"""

import os
import sys
from pathlib import Path

try:
    from PIL import Image
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False
    print("[WARNING] Install Pillow for compression: pip install Pillow")

public_dir = Path(__file__).parent / 'public'
supported_formats = {'.png', '.jpg', '.jpeg'}
processed = 0
skipped = 0
errors = 0

def compress_image_pillow(image_path):
    """Compress using Pillow library"""
    try:
        webp_path = image_path.with_suffix('.webp')
        
        # Skip if already compressed
        if webp_path.exists():
            return None, "exists"
        
        # Get original size
        original_size = image_path.stat().st_size / 1024 / 1024
        
        # Open and convert
        img = Image.open(image_path)
        
        # Convert RGBA to RGB for JPEG sources
        if img.mode in ('RGBA', 'LA', 'P'):
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = rgb_img
        
        # Save as WebP with quality 80
        img.save(webp_path, 'WEBP', quality=80, method=6)
        
        # Get compressed size
        compressed_size = webp_path.stat().st_size / 1024 / 1024
        reduction = ((original_size - compressed_size) / original_size * 100)
        
        return (compressed_size, reduction), None
        
    except Exception as e:
        return None, str(e)

def get_image_files():
    """Recursively find all images in public directory"""
    images = []
    for root, dirs, files in os.walk(public_dir):
        for file in files:
            if Path(file).suffix.lower() in supported_formats:
                images.append(Path(root) / file)
    return sorted(images)

def main():
    global processed, skipped, errors
    
    print('[IMAGE] Image Compression Tool (Python)')
    print('=' * 50)
    print(f'Scanning: {public_dir}\n')
    
    if not PIL_AVAILABLE:
        print('[ERROR] Pillow not installed!')
        print('Install with: pip install Pillow\n')
        return 1
    
    image_files = get_image_files()
    
    if not image_files:
        print('No images found.')
        return 0
    
    print(f'Found {len(image_files)} images to process:\n')
    
    total_original = 0
    total_compressed = 0
    
    for image_path in image_files:
        rel_path = image_path.relative_to(public_dir)
        original_size = image_path.stat().st_size / 1024 / 1024
        total_original += original_size
        
        result, error = compress_image_pillow(image_path)
        
        if error == "exists":
            print(f"[OK] Skipped (WebP exists): {rel_path}")
            skipped += 1
        elif result:
            compressed_size, reduction = result
            total_compressed += compressed_size
            print(f"[OK] Compressed: {rel_path}")
            print(f"     {original_size:.2f}MB -> {compressed_size:.2f}MB ({reduction:.1f}% smaller)\n")
            processed += 1
        else:
            print(f"[ERROR] {rel_path} - {error}")
            errors += 1
    
    print('=' * 50)
    print(f'Summary:')
    print(f'[OK] Processed:  {processed}')
    print(f'[OK] Skipped:    {skipped}')
    print(f'[ERROR] Errors:     {errors}')
    print('=' * 50)
    
    if processed > 0:
        savings = total_original - total_compressed
        savings_pct = (savings / total_original * 100) if total_original > 0 else 0
        print(f'\n[SAVED] Total saved: {savings:.1f}MB ({savings_pct:.1f}% reduction)')
        print(f'        Before: {total_original:.1f}MB')
        print(f'        After:  {total_compressed:.1f}MB\n')
        print('[NEXT] Update image paths to use .webp files\n')
    
    return 0

if __name__ == '__main__':
    sys.exit(main())
