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

    # Simplify the ONNX model using onnxsim
    model_onnx, check = simplify(onnx_model_path)
    onnx_model_simplified_path = 'model/facenet_simplified.onnx'
    onnx.save(model_onnx, onnx_model_simplified_path)
    return onnx_model_simplified_path

def preprocess_image(image_path):
    img = cv2.imread(image_path)
    img = cv2.resize(img, (160, 160))
    img = img.astype('float32') / 255.0
    img = np.transpose(img, (2, 0, 1))
    img = np.expand_dims(img, axis=0)
    return img

def generate_embeddings(onnx_model_path, image_dir):
    session = ort.InferenceSession(onnx_model_path)
    embedding_list = []

    for filename in os.listdir(image_dir):
        if filename.endswith('.jpg') or filename.endswith('.png'):
            image_path = os.path.join(image_dir, filename)
            img = preprocess_image(image_path)
            input_name = session.get_inputs()[0].name
            result = session.run(None, {input_name: img})
            embedding = result[0][0]
            name = os.path.splitext(filename)[0]
            embedding_list.append({"name": name, "embedding": embedding.tolist()})

    embedding_data = {"embeddings": embedding_list}
    with open('model/pre_existing_embedding.json', 'w') as f:
        json.dump(embedding_data, f)

def main():
    os.makedirs('model', exist_ok=True)
    onnx_model_path = convert_to_onnx()
    image_dir = 'known_faces'  # Path to your folder containing face images
    generate_embeddings(onnx_model_path, image_dir)

if __name__ == "__main__":
    main()
