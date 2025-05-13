import json
import numpy as np
import faiss
import pickle
from sklearn.metrics.pairwise import cosine_similarity

# -------- STEP 1: Load Saved Data --------
print("📥 Loading index and texts...")
index = faiss.read_index("video_index.faiss")
with open("embedding_texts.json") as f:
    texts = json.load(f)
with open("video_metadata_numbered.json") as f:
    metadata = json.load(f)
with open("tfidf_vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

# -------- STEP 2: RAG Retrieval --------
def retrieve(query, k=3):
    query_vec = vectorizer.transform([query]).toarray().astype('float32')
    _, indices = index.search(query_vec, k)
    docs = [texts[i] for i in indices[0]]
    filenames = [metadata[i]['filename'] for i in indices[0]]
    return docs, filenames

def answer_with_rag(query, k=3):
    docs, files = retrieve(query, k)
    context = "\n".join(docs)
    return f"📘 Context retrieved:\n{context}\n\n(This is a keyword match using TF-IDF)", files

# -------- CLI --------
if __name__ == "__main__":
    print("\n🤖 RAG with TF-IDF + FAISS Ready!\n")
    while True:
        q = input("Ask a question (or type 'exit'): ")
        if q.strip().lower() == "exit":
            break
        answer, filenames = answer_with_rag(q)
        print("\n📦 Relevant Videos:", filenames)
        print("💬 Answer:\n", answer)
