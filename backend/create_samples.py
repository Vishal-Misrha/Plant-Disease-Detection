import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

def create_sample_images():
    output_dir_backend = os.path.join(os.path.dirname(__file__), "sample_images")
    output_dir_public = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public", "samples")
    os.makedirs(output_dir_backend, exist_ok=True)
    os.makedirs(output_dir_public, exist_ok=True)

    # 1. Healthy Tomato Leaf
    img1 = Image.new("RGB", (600, 600), (245, 247, 244))
    draw1 = ImageDraw.Draw(img1)
    # Draw leaf blade shape
    # Central stem
    draw1.line([(300, 560), (300, 150)], fill=(75, 125, 45), width=8)
    # Draw leaflets
    leaflet_coords = [
        # Center terminal leaflet
        [(300, 100), (240, 220), (270, 310), (300, 320), (330, 310), (360, 220)],
        # Left upper leaflet
        [(170, 220), (220, 240), (280, 290), (240, 320), (160, 290), (130, 240)],
        # Right upper leaflet
        [(430, 220), (470, 240), (440, 290), (360, 320), (320, 290), (380, 240)],
        # Left lower leaflet
        [(150, 360), (210, 370), (270, 420), (230, 450), (150, 420), (110, 370)],
        # Right lower leaflet
        [(450, 360), (490, 370), (450, 420), (370, 450), (330, 420), (390, 370)],
    ]
    for coords in leaflet_coords:
        draw1.polygon(coords, fill=(46, 139, 87)) # SeaGreen
    # Leaf veins
    for i in range(160, 500, 40):
        draw1.line([(300, i), (210, i - 40)], fill=(85, 160, 65), width=3)
        draw1.line([(300, i), (390, i - 40)], fill=(85, 160, 65), width=3)
    img1 = img1.filter(ImageFilter.GaussianBlur(1.2))

    # 2. Tomato Early Blight (Target spots, concentric rings, chlorotic yellow halos)
    img2 = Image.new("RGB", (600, 600), (245, 247, 244))
    draw2 = ImageDraw.Draw(img2)
    draw2.line([(300, 560), (300, 150)], fill=(90, 120, 50), width=8)
    for coords in leaflet_coords:
        draw2.polygon(coords, fill=(60, 140, 70))
    # Veins
    for i in range(160, 500, 40):
        draw2.line([(300, i), (210, i - 40)], fill=(95, 150, 60), width=3)
        draw2.line([(300, i), (390, i - 40)], fill=(95, 150, 60), width=3)
    # Add yellow halos and concentric brown early blight spots
    spots = [
        (260, 230, 45), (330, 270, 38), (190, 270, 32),
        (380, 260, 40), (210, 390, 35), (410, 380, 48), (280, 370, 30)
    ]
    for x, y, r in spots:
        # Yellow chlorotic halo
        draw2.ellipse([(x - r - 15, y - r - 15), (x + r + 15, y + r + 15)], fill=(210, 195, 45))
        # Concentric brown rings
        draw2.ellipse([(x - r, y - r), (x + r, y + r)], fill=(95, 55, 25))
        draw2.ellipse([(x - r*0.7, y - r*0.7), (x + r*0.7, y + r*0.7)], fill=(125, 75, 35))
        draw2.ellipse([(x - r*0.4, y - r*0.4), (x + r*0.4, y + r*0.4)], fill=(65, 35, 15))
        draw2.ellipse([(x - r*0.15, y - r*0.15), (x + r*0.15, y + r*0.15)], fill=(35, 20, 10))
    img2 = img2.filter(ImageFilter.GaussianBlur(1.0))

    # 3. Potato Late Blight (Water-soaked dark lesions, edge browning)
    img3 = Image.new("RGB", (600, 600), (245, 247, 244))
    draw3 = ImageDraw.Draw(img3)
    # Large ovate potato leaflet
    draw3.polygon([(300, 90), (180, 210), (160, 360), (230, 490), (300, 520), (370, 490), (440, 360), (420, 210)], fill=(50, 120, 60))
    draw3.line([(300, 560), (300, 100)], fill=(80, 130, 55), width=7)
    for i in range(160, 480, 35):
        draw3.line([(300, i), (200, i - 35)], fill=(90, 150, 70), width=3)
        draw3.line([(300, i), (400, i - 35)], fill=(90, 150, 70), width=3)
    # Late blight dark water-soaked patches
    draw3.ellipse([(140, 200), (240, 340)], fill=(45, 35, 30))
    draw3.ellipse([(350, 320), (455, 450)], fill=(40, 30, 25))
    draw3.ellipse([(220, 410), (330, 500)], fill=(55, 40, 30))
    # Delicate mold ring
    draw3.arc([(135, 195), (245, 345)], 45, 240, fill=(210, 215, 205), width=4)
    draw3.arc([(345, 315), (460, 455)], 120, 310, fill=(215, 220, 210), width=4)
    img3 = img3.filter(ImageFilter.GaussianBlur(1.2))

    # 4. Apple Scab (Olive-green to velvety dark brown crusty lesions)
    img4 = Image.new("RGB", (600, 600), (245, 247, 244))
    draw4 = ImageDraw.Draw(img4)
    # Elliptical apple leaf with serrated edge
    draw4.polygon([(300, 80), (200, 180), (170, 310), (220, 440), (300, 520), (380, 440), (430, 310), (400, 180)], fill=(65, 135, 55))
    draw4.line([(300, 560), (300, 90)], fill=(95, 145, 60), width=6)
    for i in range(140, 480, 30):
        draw4.line([(300, i), (210, i - 30)], fill=(110, 160, 75), width=2)
        draw4.line([(300, i), (390, i - 30)], fill=(110, 160, 75), width=2)
    # Apple scab velvety lesions
    scabs = [
        (250, 210, 28), (340, 240, 32), (230, 330, 40),
        (350, 360, 36), (280, 420, 24), (320, 160, 22)
    ]
    for x, y, r in scabs:
        draw4.ellipse([(x - r, y - r), (x + r, y + r)], fill=(55, 60, 40)) # olive-drab
        draw4.ellipse([(x - r*0.7, y - r*0.7), (x + r*0.7, y + r*0.7)], fill=(40, 45, 30))
    img4 = img4.filter(ImageFilter.GaussianBlur(1.0))

    files = [
        ("healthy_tomato.jpg", img1),
        ("tomato_early_blight.jpg", img2),
        ("potato_late_blight.jpg", img3),
        ("apple_scab.jpg", img4),
    ]

    for filename, img in files:
        b_path = os.path.join(output_dir_backend, filename)
        p_path = os.path.join(output_dir_public, filename)
        img.save(b_path, "JPEG", quality=92)
        img.save(p_path, "JPEG", quality=92)
        print(f"Created: {b_path} and {p_path}")

if __name__ == "__main__":
    create_sample_images()
