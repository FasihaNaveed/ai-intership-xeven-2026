from sentence_transformers import SentenceTransformer
import numpy as np


# Load embedding model
model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)



# Sample documents

documents=[

"Artificial intelligence is changing technology",

"AI is transforming the future",

"Machine learning is part of artificial intelligence",

"Deep learning uses neural networks",

"Python is used for programming",

"Java is also a programming language",

"Healthy food improves human health",

"Cooking recipes are easy to prepare",

"AI technology is growing rapidly",

"Artificial intelligence is changing technology"

]



# Generate embeddings

def get_embedding(text):

    return model.encode(text)



# Cosine similarity

def cosine_similarity(a,b):

    dot = np.dot(a,b)

    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)

    return dot/(norm_a*norm_b)



# Store document vectors

embeddings=[]


for doc in documents:

    embeddings.append(
        get_embedding(doc)
    )



# Compare documents

for i in range(len(documents)):

    for j in range(i+1, len(documents)):


        score = cosine_similarity(
            embeddings[i],
            embeddings[j]
        )


        print("\nDocument", i+1, "vs Document", j+1)

        print("Similarity:",
              round(score,3)
        )


        if score > 0.95:

            print(
            "Duplicate / Very Similar Document Found!"
            )

import matplotlib.pyplot as plt
import seaborn as sns



matrix=[]


for i in range(len(embeddings)):

    row=[]

    for j in range(len(embeddings)):

        row.append(
            cosine_similarity(
                embeddings[i],
                embeddings[j]
            )
        )

    matrix.append(row)




plt.figure(figsize=(10,8))


sns.heatmap(
    matrix,
    annot=False,
    cmap="coolwarm"
)


plt.title(
"Document Similarity Heatmap"
)


plt.show()