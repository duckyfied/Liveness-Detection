import torch
import torch.onnx
import onnx
from facenet_pytorch import InceptionResnetV1
import onnxruntime as ort
from onnxsim import simplify
import os
import cv2
import numpy as np
import json

def convert_to_onnx():
    model = InceptionResnetV1(pretrained='vggface2').eval()
    dummy_input = torch.randn(1, 3, 160, 160)
    onnx_model_path = 'model/facenet.onnx'
    
    torch.onnx.export(
        model,
        dummy_input,
        onnx_model_path,
        export_params=True,
        opset_version=11,
        do_constant_folding=True,
        input_names=['input'],
        output_names=['output'],
        dynamic_axes={'input': {0: 'batch_size'}, 'output': {0: 'batch_size'}}
    )

    model_onnx, check = simplify(onnx_model_path)
    onnx_model_simplified_path = 'model/facenet_simplified.onnx'
    onnx.save(model_onnx, onnx_model_simplified_path)
    return onnx_model_simplified_path

def preprocess_image(image_path):
    print(f"Processing image: {image_path}")
    img = cv2.imread(image_path)
    if img is None:
        print(f"Failed to load image: {image_path}")
        return None
    img = cv2.resize(img, (160, 160))
    img = img.astype('float32') / 255.0
    img = np.transpose(img, (2, 0, 1))
    img = np.expand_dims(img, axis=0)
    print(f"Image shape after preprocessing: {img.shape}")
    return img

def generate_embeddings(onnx_model_path, image_dir):
    session = ort.InferenceSession(onnx_model_path)
    
    for subdir in os.listdir(image_dir):
        subdir_path = os.path.join(image_dir, subdir)
        if os.path.isdir(subdir_path):
            inner_dirs = [d for d in os.listdir(subdir_path) if os.path.isdir(os.path.join(subdir_path, d))]
            if not inner_dirs:
                continue 
            inner_dir = inner_dirs[0]
            inner_dir_path = os.path.join(subdir_path, inner_dir)

            print(f"Processing folder: {inner_dir}")
            embedding_list = []
            for filename in os.listdir(inner_dir_path):
                if filename.endswith('.jpg'):
                    image_path = os.path.join(inner_dir_path, filename)
                    img = preprocess_image(image_path)
                    if img is None:
                        continue
                    input_name = session.get_inputs()[0].name
                    print(f"Generating embedding for: {filename}")
                    try:
                        result = session.run(None, {input_name: img})
                        embedding = result[0][0]
                        print(f"Generated embedding for {filename}: {embedding[:5]}...")  # Show first 5 values for brevity
                        name = os.path.splitext(filename)[0]
                        embedding_list.append({"name": name, "embedding": embedding.tolist()})
                    except Exception as e:
                        print(f"Error generating embedding for {filename}: {e}")
            output_dir = os.path.join('model/face_encodings', subdir)
            os.makedirs(output_dir, exist_ok=True)
            output_file = os.path.join(output_dir, 'encodings.json')
            print(f"Writing encodings to: {output_file}")
            with open(output_file, 'w') as f:
                json.dump({"embeddings": embedding_list}, f, indent=4)

def main():
    os.makedirs('model', exist_ok=True)
    onnx_model_path = convert_to_onnx()
    image_dir = 'known_faces'
    generate_embeddings(onnx_model_path, image_dir)

if __name__ == "__main__":
    main()
