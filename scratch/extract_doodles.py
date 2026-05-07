import cv2
import numpy as np
import os
from PIL import Image

def extract_elements(image_path, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    # Load image
    img = cv2.imread(image_path)
    if img is None:
        print(f"Error: Could not load image {image_path}")
        return

    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Thresholding: doodles are dark on light background
    # Using Otsu's thresholding
    _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
    
    # Optional: Dilate a bit to connect nearby parts of the same doodle
    kernel = np.ones((3,3), np.uint8)
    thresh = cv2.dilate(thresh, kernel, iterations=1)
    
    # Find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    count = 0
    for i, cnt in enumerate(contours):
        x, y, w, h = cv2.boundingRect(cnt)
        
        # Filter small noise (adjust area as needed)
        if w < 20 or h < 20:
            continue
            
        # Crop with some padding
        padding = 10
        x1 = max(0, x - padding)
        y1 = max(0, y - padding)
        x2 = min(img.shape[1], x + w + padding)
        y2 = min(img.shape[0], y + h + padding)
        
        crop = img[y1:y2, x1:x2]
        
        # Convert to transparent background if possible
        # Or just save as is for now. 
        # To make it transparent: doodles are black, background is white.
        # We can use the mask.
        
        crop_gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
        _, mask = cv2.threshold(crop_gray, 240, 255, cv2.THRESH_BINARY)
        
        # Invert mask: background is 0, doodle is 255
        alpha = cv2.bitwise_not(mask)
        
        # Merge channels
        b, g, r = cv2.split(crop)
        rgba = cv2.merge([b, g, r, alpha])
        
        output_path = os.path.join(output_folder, f"element_{count}.png")
        cv2.imwrite(output_path, rgba)
        count += 1
        
    print(f"Extracted {count} elements to {output_folder}")

if __name__ == "__main__":
    extract_elements("src/assets/yakshagana1.png", "src/assets/yakshagana_elements")
