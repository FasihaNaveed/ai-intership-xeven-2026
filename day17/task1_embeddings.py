from sentence_transformers import SentenceTransformer
import numpy as np


model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


sentences = [
    "I love my dog",
    "I have a puppy",
    "The car is fast",
    "Machine learning is interesting"
]


def get_embedding(text):

    return model.encode(text)



def cosine_similarity(a,b):

    dot = np.dot(a,b)

    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)

    return dot/(norm_a*norm_b)



embeddings=[]


for sentence in sentences:

    vector=get_embedding(sentence)

    embeddings.append(vector)



print("Dog vs Puppy:")

print(
cosine_similarity(
    embeddings[0],
    embeddings[1]
)
)


print("\nDog vs Car:")

print(
cosine_similarity(
    embeddings[0],
    embeddings[2]
)
)

import matplotlib.pyplot as plt
import seaborn as sns


similarity_matrix = []


for i in range(len(embeddings)):

    row=[]

    for j in range(len(embeddings)):

        score = cosine_similarity(
            embeddings[i],
            embeddings[j]
        )

        row.append(score)


    similarity_matrix.append(row)




plt.figure(figsize=(8,6))


sns.heatmap(
    similarity_matrix,
    annot=True,
    cmap="coolwarm"
)


plt.title(
    "Sentence Similarity Matrix"
)


plt.show()