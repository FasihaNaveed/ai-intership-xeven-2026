from sentence_transformers import SentenceTransformer
import numpy as np


model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


knowledge_base=[

"Machine learning algorithms learn from data",
"Deep learning uses neural networks",
"Artificial intelligence helps computers think",
"Python is a programming language",
"Java is used for software development",
"Data science analyzes information",
"Neural networks are used in AI",
"Natural language processing handles text",
"Computer vision understands images",
"Robotics uses artificial intelligence",

"Healthy food improves human health",
"Fruits contain vitamins",
"Vegetables are good for the body",
"Exercise keeps the body active",
"Water is important for health",
"Balanced diet improves energy",

"Cars use engines for movement",
"Electric cars use batteries",
"Vehicles need fuel or power",
"Transportation connects cities",

"Cloud computing provides online services",
"Servers store data",
"Databases organize information",
"Cyber security protects systems",
"Networks connect computers",

"Programming solves problems",
"Python supports machine learning",
"C++ is a programming language",
"JavaScript is used for web development",

"AI models learn patterns",
"Machine learning finds relationships",
"Data is important for AI",
"Algorithms process information",

"Books contain knowledge",
"Education improves skills",
"Students learn new concepts",

"Music creates emotions",
"Movies tell stories",
"Art expresses creativity",

"Weather changes daily",
"Climate studies environment",
"Nature contains ecosystems",

"Mobile phones use software",
"Applications run on devices",
"Technology changes quickly",

"Search engines find information",
"Semantic search understands meaning",
"Vector databases store embeddings"

]


def get_embedding(text):

    return model.encode(text)



def cosine_similarity(a,b):

    dot = np.dot(a,b)

    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)

    return dot/(norm_a*norm_b)



# Store embeddings

embeddings=[]


for text in knowledge_base:

    embeddings.append(
        get_embedding(text)
    )



def search(query):

    query_vector = get_embedding(query)

    results=[]


    for text,vector in zip(
        knowledge_base,
        embeddings
    ):

        score = cosine_similarity(
            query_vector,
            vector
        )

        results.append(
            (text,score)
        )


    results.sort(
        key=lambda x:x[1],
        reverse=True
    )


    return results[:3]




query=input(
"Enter your search query: "
)


results=search(query)



print("\nTop Results:\n")


for text,score in results:

    print(text)

    print(
    "Similarity:",
    round(score,3)
    )

    print()