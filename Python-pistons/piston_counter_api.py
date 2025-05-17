from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import cv2
import numpy as np
import pytesseract
from typing import Dict

app = FastAPI()

def count_pistons(image_bytes: bytes) -> Dict[str, int]:
    # Load image from bytes
    np_img = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Optional: Enhance image
    gray = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

    # OCR config to help detect P1, P2 etc.
    config = "--psm 6"

    # Run OCR
    text = pytesseract.image_to_string(gray, config=config)

    # Count piston labels
    counts = {"P1": 0, "P2": 0, "P3": 0, "P4": 0}
    for line in text.split():
        for label in counts:
            if label in line.upper():
                counts[label] += 1

    return counts

@app.post("/count_pistons/")
async def count_pistons_endpoint(file: UploadFile = File(...)):
    image_bytes = await file.read()
    counts = count_pistons(image_bytes)
    return JSONResponse(content=counts)
