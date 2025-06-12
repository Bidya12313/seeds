import os
from werkzeug.utils import secure_filename
from flask import current_app

def save_images(files):
    urls = []
    upload_folder = os.path.join(current_app.root_path, 'static', 'images', 'products')
    os.makedirs(upload_folder, exist_ok=True)

    for file in files:
        if file and file.filename:
            filename = secure_filename(file.filename)
            filepath = os.path.join(upload_folder, filename)
            file.save(filepath)
            urls.append(filename)
    return urls
