# rag_build_model.py

import json
import numpy as np
import faiss
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle

# -------- STEP 1: Load Metadata --------
with open("video_metadata_numbered.json") as f:
    metadata = json.load(f)

texts = [
    f"{entry['description']} {' '.join(entry['tags'])}"
    for entry in metadata
]
print(f"📄 Loaded {len(texts)} video entries.")

# -------- STEP 2: Generate TF-IDF Embeddings --------
print("🧠 Generating TF-IDF matrix...")
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(texts).toarray().astype('float32')

# -------- STEP 3: Build FAISS Index --------
dimension = tfidf_matrix.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(tfidf_matrix)

# -------- STEP 4: Save Files --------
faiss.write_index(index, "video_index.faiss")
with open("embedding_texts.json", "w") as f:
    json.dump(texts, f)
with open("tfidf_vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

print("✅ Saved: video_index.faiss, embedding_texts.json, tfidf_vectorizer.pkl")
