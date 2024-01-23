from PIL import Image
import os

input_folder = 'public/images'
output_folder = 'temp'

for filename in os.listdir(input_folder):
    if filename.endswith('.png'):
        image_path = os.path.join(input_folder, filename)
        with Image.open(image_path) as img:
            rgb_im = img.convert('RGB')
            output_path = os.path.join(output_folder, filename.replace('.png', '.jpg'))
            rgb_im.save(output_path, quality=85)